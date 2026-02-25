import { checkModelExist } from '../helpers/checkExist.js'
import User from '../models/userModel.js'

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