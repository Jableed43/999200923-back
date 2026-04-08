import { fetchDisponibles } from '../services/turnos.service.js';
import Turno from '../models/Turno.js';
import Profesional from '../models/Profesional.js';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe('Turnos Service Unit Tests', () => {
    let profesionalId;

    beforeEach(async () => {
        await Turno.deleteMany({});
        await Profesional.deleteMany({});

        const prof = await Profesional.create({
            nombre: "Dr.",
            apellido: "Test",
            matricula: "UNIT-1",
            especialidad: "Test",
            disponibilidad: [
                { dia: "Lunes", slots: ["08:00", "09:00", "10:00"], activa: true },
                { dia: "Martes", slots: ["15:00"], activa: false }
            ]
        });
        profesionalId = prof._id;
    });

    test('fetchDisponibles should return all slots if no turns exist', async () => {
        const result = await fetchDisponibles(profesionalId, "2026-04-13"); // Es lunes
        expect(result.slots).toHaveLength(3);
        expect(result.slots).toEqual(["08:00", "09:00", "10:00"]);
    });

    test('fetchDisponibles should filter out occupied slots', async () => {
        // Crear un turno ocupado
        await Turno.create({
            fecha: new Date("2026-04-13T10:00:00Z"),
            hora: "09:00",
            profesional: profesionalId,
            paciente: new mongoose.Types.ObjectId(),
            creadoPor: new mongoose.Types.ObjectId(),
            onModel: 'Paciente',
            estado: 'reservado'
        });

        const result = await fetchDisponibles(profesionalId, "2026-04-13");
        expect(result.slots).toHaveLength(2);
        expect(result.slots).not.toContain("09:00");
        expect(result.slots).toContain("08:00");
        expect(result.slots).toContain("10:00");
    });

    test('fetchDisponibles should return empty if day is not active', async () => {
        const result = await fetchDisponibles(profesionalId, "2026-04-14"); // Es martes (activa: false)
        expect(result).toEqual([]);
    });

    test('fetchDisponibles should show slot again if turn is cancelled', async () => {
        const turno = await Turno.create({
            fecha: new Date("2026-04-13T10:00:00Z"),
            hora: "09:00",
            profesional: profesionalId,
            paciente: new mongoose.Types.ObjectId(),
            creadoPor: new mongoose.Types.ObjectId(),
            onModel: 'Paciente',
            estado: 'reservado'
        });

        let res = await fetchDisponibles(profesionalId, "2026-04-13");
        expect(res.slots).not.toContain("09:00");

        // Cancelar
        turno.estado = 'cancelado';
        await turno.save();

        res = await fetchDisponibles(profesionalId, "2026-04-13");
        expect(res.slots).toContain("09:00");
    });
});
