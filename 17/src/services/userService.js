import { SECRET } from '../config/config.js'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getAllUsers = async () => {
    return await User.find()
}

export const getUserById = async (id) => {
    const user = await User.findById(id)
    if (!user) throw { message: "Usuario no encontrado", statusCode: 404 }
    return user
}

export const createUser = async (userData) => {
    const newUser = new User(userData)
    return await newUser.save()
}

export const updateUser = async (id, userData) => {
    const user = await User.findById(id)
    if (!user) throw { message: "Usuario no encontrado", statusCode: 404 }

    // Actualizamos los campos
    Object.assign(user, userData)
    
    // Al usar .save() se dispara el middleware pre("save") para el hashing de la password
    return await user.save()
}

export const deleteUser = async (id) => {
    const result = await User.deleteOne({ _id: id })
    if (result.deletedCount === 0) {
        throw { message: "Usuario no encontrado", statusCode: 404 }
    }
    return true
}

export const loginUser = async (email, password) => {
    if (!email || !password) {
        throw new Error("Email y contraseña son requeridos")
    }

    const user = await User.findOne({ email })
    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new Error("Credenciales inválidas")
    }

    const token = jwt.sign(
        { userId: user._id, userEmail: user.email },
        SECRET,
        { expiresIn: "1h" }
    )

    return { token, userId: user._id, userEmail: user.email, userRole: user.role }
}
