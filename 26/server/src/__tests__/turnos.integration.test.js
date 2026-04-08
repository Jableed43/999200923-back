import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';
import Profesional from '../models/Profesional.js';
import Paciente from '../models/Paciente.js';
import Turno from '../models/Turno.js';

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe('Turnos Integration Tests', () => {
    let profesionalId;
    let pacienteId;

    beforeEach(async () => {
        await Turno.deleteMany({});
        await Profesional.deleteMany({});
        await Paciente.deleteMany({});

        // Seed data
        const prof = await Profesional.create({
            nombre: "Test",
            apellido: "Medico",
            matricula: "TEST-123",
            especialidad: "Psicología",
            disponibilidad: [
                { dia: "Lunes", slots: ["09:00", "10:00"], activa: true }
            ]
        });
        profesionalId = prof._id.toString();

        const pac = await Paciente.create({
            nombre: "Test",
            apellido: "Paciente"
        });
        pacienteId = pac._id.toString();
    });

    test('POST /api/turnos/reservar should create a turn', async () => {
        const res = await request(app)
            .post('/api/turnos/reservar')
            .send({
                fecha: "2026-04-13", // Es un lunes
                hora: "09:00",
                pacienteId,
                profesionalId,
                motivo: "Consulta test",
                creadoPor: pacienteId,
                onModel: "Paciente"
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.turno.estado).toBe('reservado');
    });

    test('POST /api/turnos/reservar should fail if slot is already booked', async () => {
        // Reservar primero
        await request(app)
            .post('/api/turnos/reservar')
            .send({
                fecha: "2026-04-13",
                hora: "09:00",
                pacienteId,
                profesionalId,
                creadoPor: pacienteId,
                onModel: "Paciente"
            });

        // Intentar reservar el mismo
        const res = await request(app)
            .post('/api/turnos/reservar')
            .send({
                fecha: "2026-04-13",
                hora: "09:00",
                pacienteId,
                profesionalId,
                creadoPor: pacienteId,
                onModel: "Paciente"
            });

        expect(res.statusCode).toEqual(409);
        expect(res.body.error).toMatch(/reservado/);
    });

    test('GET /api/turnos/disponibles should show available slots', async () => {
        const res = await request(app)
            .get(`/api/turnos/disponibles?profesionalId=${profesionalId}&fecha=2026-04-13`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.slots).toContain("09:00");
        expect(res.body.slots).toContain("10:00");
    });

    test('PATCH /api/turnos/:id/estado should update status', async () => {
        // Crear turno
        const reserved = await request(app)
            .post('/api/turnos/reservar')
            .send({
                fecha: "2026-04-13",
                hora: "09:00",
                pacienteId,
                profesionalId,
                creadoPor: pacienteId,
                onModel: "Paciente"
            });

        const turnoId = reserved.body.turno._id;

        const res = await request(app)
            .patch(`/api/turnos/${turnoId}/estado`)
            .send({ estado: "cancelado" });

        expect(res.statusCode).toEqual(200);
        expect(res.body.turno.estado).toBe("cancelado");

        // Verificar que el slot vuelve a estar disponible
        const disp = await request(app)
            .get(`/api/turnos/disponibles?profesionalId=${profesionalId}&fecha=2026-04-13`);
        expect(disp.body.slots).toContain("09:00");
    });
});
