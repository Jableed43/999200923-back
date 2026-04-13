import mongoose from 'mongoose';

const profesionalSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    antiguedad: {
        type: Number,
        default: 0
    },
    matricula: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'profesional'
    },
    especialidad: {
        type: String,
        required: true
    },
    trayectoria: {
        type: String,
        default: ""
    },
    imagen: {
        type: String,
        default: null
    },
    disponibilidad: [{
        dia: {
            type: String,
            enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
            required: true
        },
        slots: [String], // Ej: ["09:00", "09:30"]
        activa: {
            type: Boolean,
            default: true
        }
    }]
}, {
    timestamps: true
});

const Profesional = mongoose.model('Profesional', profesionalSchema);
export default Profesional;
