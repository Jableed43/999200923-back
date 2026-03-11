import { SECRET } from '../config/config.js'
import { checkModelExist } from '../helpers/checkExist.js'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createUserService = async (userData) => {
    const newUser = new User(userData)
    const savedUser = await newUser.save()
    return savedUser
}

export const getUserService = async () => {
    const users = await User.find()
    return users
}

export const getUserByIdService = async (id) => {
   const user = await User.findById(id)
    return user
}

export const updateUserService = async (id, userData) => {

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
    const result = await User.deleteOne({_id: id})
    // Si se eliminó retorna true, de lo contrario retorna false
    console.log({result})
    if(result){
        return true
    } else {
        return false
    }
}

export const validateUserService = async (userData) => {
    const {password, email} = userData

    if(!(password && email)){
        return { message: "There's a missing field"}
    }

    const userFound =  await User.findOne({email})

    if(!userFound){
        return {message: "User or password is incorrect"}
    }

    //comparamos la password que nos manda el cliente y la que tenemos almacenada en la base de datos
    if(!bcrypt.compareSync(password, userFound.password)){
        return {message: "User or password is incorrect"}
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

    return {message: "Logged In", token, userId: userFound._id, userEmail: userFound.email}
    
}