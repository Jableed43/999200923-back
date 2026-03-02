import { SECRET } from '../config/config.js'
import { checkModelExist } from '../helpers/checkExist.js'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createUserService = async (userData) => {
    const {email} = userData
    await checkModelExist(User, {email}, false, 400, `User with email ${email} already exist`)

    const newUser = new User(userData)
    const savedUser = await newUser.save()
    return savedUser
    // luego quitar contraseña
}

export const getUserService = async () => {
    const users = await User.find()
    return users
}

export const updateUserService = async (id, userData) => {
    await checkModelExist(User, {_id: id}, true, 400, `User not found`)

    // En la edicion del usuario si modifican la password deberiamos encriptarla
    if(userData.password){
        userData.password = bcrypt.hashSync(userData.password, 10)
    }

    const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        userData,
        { returnDocument: 'after' }
    )

    return updatedUser
}

export const deleteUserService = async (id) => {
    await checkModelExist(User, {_id: id}, true, 400, `User not found`)

    const deletedUser = await User.findByIdAndDelete(id)

    return { message: "User deleted successfully", data: deletedUser }
}

export const validateUserService = async (userData) => {
    const {password, email} = userData

    if(!(password && email)){
        const error = new Error("There's a missing field")
        error.statusCode = 400
        throw error
    }

    const userFound = await checkModelExist(User, {email}, true, 400, `User or password is incorrect`)

    //comparamos la password que nos manda el cliente y la que tenemos almacenada en la base de datos
    if(!bcrypt.compareSync(password, userFound.password)){
        const error = new Error("User or password is incorrect")
        error.statusCode = 400
        throw error  
    }

    //JWT

    // Primero armamos el token
    // debe tener informacion del usuario
    // tanto _id como email son datos unicos
    const payload = {
        userId: userFound._id,
        userEmail: userFound.email
    }

    // Despues firmamos el token
    // la firma del token previene intentos de hackeo o replicar tokens
    // sign necesita: 1. payload, 2. "secret", 3. duración
    const token = jwt.sign(payload, SECRET, {expiresIn: "1h"})

    // Despues mandamos el token

    return {message: "Logged In", token}
    
}