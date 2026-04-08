import mongoose from 'mongoose';

const turnoSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true
    },
    hora: {
        type: String, // Formato HH:mm
        required: true
    },
    motivo: {
        type: String,
        default: ''
    },
    estado: {
        type: String,
        enum: ['disponible', 'reservado', 'cancelado'],
        default: 'reservado'
    },
    // Referencias
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    profesional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profesional',
        required: true
    },
    // Auditoría Dinámica (Quién creó el turno)
    creadoPor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Paciente', 'Administrativo']
    }
}, {
    timestamps: true
});

const Turno = mongoose.model('Turno', turnoSchema);
export default Turno;
