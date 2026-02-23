import { createUserService } from "../services/userService.js"

export const createUser = async (req, res) => {
    try {
        const userData = req.body
        const result = await createUserService(userData)
        res.status(201).json(result)

    } catch (error) {
        const statusCode = error.statusCode || 500
        res.status(statusCode).json({
            error: error.message || "Internal server error"
        })
    }


}