import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { MONGODB_URI } from '../config/config.js';
import Administrativo from '../models/Administrativo.js';
import Profesional from '../models/Profesional.js';
import Paciente from '../models/Paciente.js';

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Conectado a MongoDB para seeding...");

        const defaultPassword = await bcrypt.hash('Password123', 10);

        // 1. Procesar Administrativos
        const admins = await Administrativo.find();
        if (admins.length === 0) {
            await Administrativo.create({
                nombre: 'Admin',
                apellido: 'General',
                sector: 'Dirección',
                email: 'admin.general@seprise.com',
                password: defaultPassword,
                role: 'administrativo'
            });
            console.log("Administrativo de prueba creado.");
        } else {
            for (let admin of admins) {
                const email = `${admin.nombre.toLowerCase()}.${admin.apellido.toLowerCase()}@seprise.com`.replace(/\s+/g, '');
                await Administrativo.findByIdAndUpdate(admin._id, { email, password: defaultPassword, role: 'administrativo' });
            }
            console.log(`${admins.length} administrativos actualizados.`);
        }

        // 2. Procesar Profesionales
        const profs = await Profesional.find();
        if (profs.length === 0) {
            await Profesional.create({
                nombre: 'Juan',
                apellido: 'Perez',
                matricula: 'MP12345',
                especialidad: 'Psicología Adultos',
                email: 'juan.perez@seprise.com',
                password: defaultPassword,
                role: 'profesional',
                disponibilidad: [{ dia: 'Lunes', slots: ['09:00', '10:00'], activa: true }]
            });
            console.log("Profesional de prueba creado.");
        } else {
            for (let prof of profs) {
                const email = `${prof.nombre.toLowerCase()}.${prof.apellido.toLowerCase()}@seprise.com`.replace(/\s+/g, '');
                await Profesional.findByIdAndUpdate(prof._id, { email, password: defaultPassword, role: 'profesional' });
            }
            console.log(`${profs.length} profesionales actualizados.`);
        }

        // 3. Procesar Pacientes
        const pacs = await Paciente.find();
        if (pacs.length === 0) {
            await Paciente.create({
                nombre: 'Maria',
                apellido: 'Lopez',
                email: 'maria.lopez@seprise.com',
                password: defaultPassword,
                role: 'paciente'
            });
            console.log("Paciente de prueba creado.");
        } else {
            for (let pac of pacs) {
                const email = `${pac.nombre.toLowerCase()}.${pac.apellido.toLowerCase()}@seprise.com`.replace(/\s+/g, '');
                await Paciente.findByIdAndUpdate(pac._id, { email, password: defaultPassword, role: 'paciente' });
            }
            console.log(`${pacs.length} pacientes actualizados.`);
        }

        console.log("Seeding completado con éxito.");
        process.exit(0);
    } catch (error) {
        console.error("Error en seeding:", error);
        process.exit(1);
    }
};

seed();
