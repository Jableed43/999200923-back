import express from 'express'
import * as userController from '../controllers/userController.js'

const userRoute = express.Router()

// --- VISTAS ---
userRoute.get("/", userController.getAllUserView)
userRoute.get("/create", userController.createUserView)
userRoute.get("/update/:id", userController.updateUserView)
userRoute.get("/login", userController.loginView)

// --- ACCIONES ---
userRoute.post("/", userController.createUser)
userRoute.patch("/:id", userController.updateUser)
userRoute.delete("/:id", userController.deleteUser)
userRoute.post("/login", userController.validateUser)
userRoute.post("/logout", userController.logout)

export default userRoute