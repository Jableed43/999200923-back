import express from 'express'
import { createUser, createUserView, deleteUser, getAllUserView, loginView, logout, updateUser, updateUserView, validateUser } from '../controllers/userController.js'

const userRoute = express.Router()

// Rutas de acciones
userRoute.post("/", createUser)
userRoute.patch("/:id", updateUser)
userRoute.delete("/:id", deleteUser)
userRoute.post("/login", validateUser)
userRoute.post("/logout", logout)

// Rutas de vistas
userRoute.get("/create", createUserView)
userRoute.get("/", getAllUserView)
userRoute.get("/update/:id", updateUserView)
userRoute.get("/login", loginView)

export default userRoute