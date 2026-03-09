import express from 'express'
import { createUser, createUserView, deleteUser, getAllUserView, updateUser, validateUser } from '../controllers/userController.js'
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware.js'

const userRoute = express.Router()

// Rutas de acciones
userRoute.post("/", createUser)
userRoute.patch("/:id", verifyTokenMiddleware, updateUser)
userRoute.delete("/:id", verifyTokenMiddleware, deleteUser)
userRoute.post("/login", validateUser)

// Rutas de vistas
userRoute.get("/create", createUserView)
userRoute.get("/", getAllUserView)

export default userRoute