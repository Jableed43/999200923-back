import express from 'express'
import { createUser, deleteUser, getUser, updateUser } from '../controllers/userController.js'

const userRoute = express.Router()

userRoute.post("/", createUser)
userRoute.get("/", getUser)
userRoute.patch("/:id", updateUser)
userRoute.delete("/:id", deleteUser)

export default userRoute