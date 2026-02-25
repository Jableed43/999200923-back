import User from '../models/userModel.js'

export const createUserService = async (userData) => {
    const {email} = userData
    const userExist = await User.findOne({email})
    if(userExist){
        const error = new Error(`User with email ${email} already exist`)
        error.statusCode = 400
        throw error
    }
    const newUser = new User(userData)
    const savedUser = await newUser.save()
    return savedUser
    // luego quitar contraseña
}