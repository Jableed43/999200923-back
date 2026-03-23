import { roleEnum } from "../models/userModel.js"
import { createUserService, deleteUserService, getUserService, updateUserService, validateUserService } from "../services/userService.js"
import { handleError } from "../utils/errorHandler.js"

export const createUser = async (req, res) => {
    try {
        const userData = {...req.body, role: roleEnum[0]} // Obligamos que el auto-registro sea de consumidor
        const result = await createUserService(userData)
        res.status(201).json(result)

    } catch (error) {
        handleError(error, res)
    }
}

export const createUserAdmin = async (req, res) => {
    try {
        const result = await createUserService(req.body)
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
        if(req.user.userId !== id){
            return res.status(403).json({message: "No autorizado: un administrador no puede editar usuarios y los clientes solo pueden editar sus propios datos"})
        }
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
        // Deberiamos ver si es administrador
        if(req.user.userId !== id && req.user.role !== roleEnum[2]){
            return res.status(403).json({message: "No authorized"})
        }
        const deletedUser = await deleteUserService(id)
        res.status(200).json(deletedUser)
    } catch (error) {
         handleError(error, res)
    }
}

export const validateUser = async (req, res) => {
    try {
        const userData = req.body
        const result = await validateUserService(userData)
        return res.status(200).json(result)

    } catch (error) {
        handleError(error, res)
    }
}