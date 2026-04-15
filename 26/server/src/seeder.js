import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

// Importar los modelos
import Administrativo from './models/Administrativo.js';
import Paciente from './models/Paciente.js';
import Profesional from './models/Profesional.js';
import Turno from './models/Turno.js';

dotenv.config();

// Se asegura de tomar la variable de entorno, y en su defecto apunta a la red interna de docker (o localhost si se corre fuera)
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://admin:secret@database:27017/turnos-pro?authSource=admin';

const seedData = async () => {
    try {
        console.log('Conectando a MongoDB en:', MONGO_URI);
        await mongoose.connect(MONGO_URI);
        console.log('✅ Conexión exitosa. Iniciando purgado de colecciones...');

        // 1. Limpiar colecciones existentes para no duplicar datos
        await Administrativo.deleteMany({});
        await Paciente.deleteMany({});
        await Profesional.deleteMany({});
        await Turno.deleteMany({});
        
        console.log('✅ Colecciones limpiadas.');

        // 2. Crear contraseña hasheada base para todos los usuarios
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('contra1234', salt);

        // 3. Crear Administrativo
        const admin = await Administrativo.create({
            nombre: 'Super',
            apellido: 'Admin',
            antiguedad: 5,
            sector: 'Gerencia',
            email: 'admin@seprise.com',
            password: hashedPassword,
            role: 'administrativo'
        });

        // 4. Crear Profesionales
        const profesional1 = await Profesional.create({
            nombre: 'Dr. Roberto',
            apellido: 'Fernández',
            antiguedad: 10,
            matricula: 'MP-44556',
            email: 'roberto@seprise.com',
            password: hashedPassword,
            role: 'profesional',
            especialidad: 'Cardiología',
            trayectoria: 'Especialista en cardiología clínica y ecocardiogramas.',
            disponibilidad: [
                { dia: 'Lunes', slots: ['09:00', '09:30', '10:00', '10:30'], activa: true },
                { dia: 'Miércoles', slots: ['15:00', '15:30', '16:00'], activa: true }
            ]
        });

        const profesional2 = await Profesional.create({
            nombre: 'Dra. María',
            apellido: 'Gómez',
            antiguedad: 3,
            matricula: 'MP-88990',
            email: 'maria@seprise.com',
            password: hashedPassword,
            role: 'profesional',
            especialidad: 'Pediatría',
            trayectoria: 'Manejo integral pediátrico. Atención de primer nivel.',
            disponibilidad: [
                { dia: 'Martes', slots: ['08:00', '08:30', '09:00'], activa: true },
                { dia: 'Jueves', slots: ['10:00', '10:30', '11:00'], activa: true },
                { dia: 'Viernes', slots: ['10:00', '10:30'], activa: true }
            ]
        });

        // 5. Crear Pacientes
        const paciente1 = await Paciente.create({
            nombre: 'Juan',
            apellido: 'Pérez',
            antiguedad: 2,
            email: 'juan@test.com',
            password: hashedPassword,
            role: 'paciente'
        });

        const paciente2 = await Paciente.create({
            nombre: 'Ana',
            apellido: 'López',
            antiguedad: 1,
            email: 'ana@test.com',
            password: hashedPassword,
            role: 'paciente'
        });

        // 6. Crear un Turno de ejemplo para la cartelera
        // Calculamos una fecha futura a modo de ejemplo (próximo lunes)
        const hoy = new Date();
        const proximoLunes = new Date(hoy.setDate(hoy.getDate() + ((7 - hoy.getDay() + 1) % 7 || 7)));

        await Turno.create({
            fecha: proximoLunes,
            hora: '09:00',
            motivo: 'Control anual cardiovascular',
            estado: 'reservado',
            paciente: paciente1._id,
            profesional: profesional1._id,
            creadoPor: paciente1._id,
            onModel: 'Paciente'
        });

        console.log('✅ Datos de prueba insertados correctamente.');
        console.log('----------------------------------------------------');
        console.log('🔑 Credenciales de acceso (Contraseña para todos: contra1234)');
        console.log(`👤 Administrativo: ${admin.email}`);
        console.log(`🩺 Profesional 1: ${profesional1.email}`);
        console.log(`🩺 Profesional 2: ${profesional2.email}`);
        console.log(`🛌 Paciente 1: ${paciente1.email}`);
        console.log(`🛌 Paciente 2: ${paciente2.email}`);
        console.log('----------------------------------------------------');

        // Cerrar la conexión y salir del proceso exitosamente
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al insertar datos:', error);
        process.exit(1);
    }
};

seedData();
