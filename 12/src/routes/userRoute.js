import express from 'express'
import { createUser, deleteUser, getUser, updateUser, validateUser } from '../controllers/userController.js'
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware.js'

const userRoute = express.Router()

userRoute.post("/", createUser)
userRoute.get("/", getUser)
userRoute.patch("/:id", verifyTokenMiddleware, updateUser)
userRoute.delete("/:id", verifyTokenMiddleware, deleteUser)
userRoute.post("/login", validateUser)

export default userRoute