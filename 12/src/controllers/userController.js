import { createUserService, deleteUserService, getUserService, updateUserService } from "../services/userService.js"
import { handleError } from "../utils/errorHandler.js"

export const createUser = async (req, res) => {
    try {
        const userData = req.body
        const result = await createUserService(userData)
        res.status(201).json(result)

    } catch (error) {
        handleError(error, res)
    }
}

export const getUser = async (req, res) => {
    try {
        const users = await getUserService()
        res.status(200).json(users)
    } catch (error) {
        handleError(error, res)
    }
}

export const updateUser = async (req, res) => {
    try {
        const {id} = req.params
        const userData = req.body
        const updatedUser = await updateUserService(id, userData)
        res.status(201).json(updatedUser)

    } catch (error) {
        handleError(error, res)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params
        const deletedUser = await deleteUserService(id)
        res.status(201).json(deletedUser)
    } catch (error) {
         handleError(error, res)
    }
}
