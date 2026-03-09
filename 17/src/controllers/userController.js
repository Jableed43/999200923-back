import { createUserService, deleteUserService, getUserService, updateUserService, validateUserService } from "../services/userService.js"
import { handleError } from "../utils/errorHandler.js"

// Vistas
export const createUserView = async (req, res) => {
    res.render("user/createUser", {
        title: "Registrar usuario"
    }    )
}

export const getAllUserView = async (req, res) => {
    const users = await getUserService();
    console.log(users)
    res.render("user/getAllUser", { title: "Lista de Usuarios", users });
};

// Acciones

export const createUser = async (req, res) => {
    try {
        const userData = req.body
        await createUserService(userData)
        req.session.message = "Usuario creado con exito"
        req.session.success = true
        res.redirect("/")
    } catch (error) {
        req.session.message = "Error al crear usuario ", error.message
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

export const validateUser = async (req, res) => {
    try {
        const userData = req.body
        const result = await validateUserService(userData)
        return res.status(200).json(result)

    } catch (error) {
        handleError(error, res)
    }
}