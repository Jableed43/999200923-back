import mongoose from 'mongoose';

const administrativoSchema = new mongoose.Schema({
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
    sector: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Administrativo = mongoose.model('Administrativo', administrativoSchema);
export default Administrativo;
