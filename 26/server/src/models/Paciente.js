import mongoose from 'mongoose';

const pacienteSchema = new mongoose.Schema({
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
    historiaClinica: [{
        fecha: {
            type: Date,
            default: Date.now
        },
        profesionalId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profesional'
        },
        notas: String,
        diagnostico: String
    }]
}, {
    timestamps: true
});

const Paciente = mongoose.model('Paciente', pacienteSchema);
export default Paciente;
