import express from 'express'
import { createCategory, deleteCategory, getAllCategories, updateCategory } from '../controllers/categoryController.js'
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware.js'
import { verifyRoleMiddleware } from '../middlewares/verifyRoleMiddleware.js'
import { roleEnum } from '../models/userModel.js'

const categoryRoute = express.Router()

categoryRoute.get("/", getAllCategories)
categoryRoute.post("/", verifyTokenMiddleware, verifyRoleMiddleware([roleEnum[1], roleEnum[2]]), createCategory)
categoryRoute.patch("/:id", verifyTokenMiddleware, verifyTokenMiddleware, verifyRoleMiddleware([roleEnum[1], roleEnum[2]]), updateCategory)
categoryRoute.delete("/:id", verifyTokenMiddleware, verifyTokenMiddleware, verifyRoleMiddleware([roleEnum[1], roleEnum[2]]), deleteCategory)

export default categoryRoute