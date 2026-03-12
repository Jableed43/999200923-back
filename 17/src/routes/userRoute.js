import express from 'express'
import * as userController from '../controllers/userController.js'
import { isAuthenticated, isGuest, hasRole } from '../middlewares/authMiddleware.js'

const userRoute = express.Router()

// --- VISTAS ---
userRoute.get("/", isAuthenticated, hasRole(['administrador']), userController.getAllUserView)
userRoute.get("/create", isGuest, userController.createUserView)
userRoute.get("/update/:id", isAuthenticated, hasRole(['administrador']), userController.updateUserView)
userRoute.get("/login", isGuest, userController.loginView)

// --- ACCIONES ---
userRoute.post("/", isGuest, userController.createUser) // Registro es público (para invitados)
userRoute.patch("/:id", isAuthenticated, hasRole(['administrador']), userController.updateUser)
userRoute.delete("/:id", isAuthenticated, hasRole(['administrador']), userController.deleteUser)
userRoute.post("/login", isGuest, userController.validateUser)
userRoute.post("/logout", isAuthenticated, userController.logout)

export default userRoute
