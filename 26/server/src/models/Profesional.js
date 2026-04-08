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
    especialidad: {
        type: String,
        required: true
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
