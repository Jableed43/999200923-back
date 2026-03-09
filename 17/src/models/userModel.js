import mongoose from 'mongoose'
import { isGoodPassword } from '../utils/validators.js'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxLength: [40, 'Por favor el nombre debe tener menos de 40 caracteres'],
        minLength: [2, 'Por favor el nombre debe tener mas de 4 caracteres'],
        trim: true,
        lowercase: true
    },
    lastName:{
        type: String,
        required: true,
        maxLength: [30, 'Por favor el apellido debe tener menos de 40 caracteres'],
        minLength: [2, 'Por favor el apellido debe tener mas de 4 caracteres'],
        trim: true,
        lowercase: true
    },
    email:{
        type: String,
        required: true,
        maxLength: [40, 'Por favor el email debe tener menos de 40 caracteres'],
        minLength: [4, 'Por favor el email debe tener mas de 4 caracteres'],
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor, ingresa un correo electrónico válido']
    },

    password:{
        type: String,
        required: true,
        validate: {
            validator: function (valor) {
                return isGoodPassword(valor)
            },
            message: "La contraseña debe tener entre 6 y 12 caracteres, un digito numerico, una letra minuscula, una letra mayuscula"
        }

    }
}, { timestamps: true })

// Se encuentra entre la recepcion de los datos para crear un nuevo registro
// y el guardado del nuevo registro
userSchema.pre("save", async function () {
    // Solo hashear la contraseña si ha sido modificada o es nueva
    if (!this.isModified("password")) {
        return;
    }
    
    // Encriptamos la password antes de guardarla
    this.password = bcrypt.hashSync(this.password, 10);
});

export default mongoose.model("user", userSchema) 