import express from 'express'
import { createCategory, deleteCategory, getAllCategories, updateCategory } from '../controllers/categoryController.js'

const categoryRoute = express.Router()

categoryRoute.get("/", getAllCategories)
categoryRoute.post("/", createCategory)
categoryRoute.patch("/:id", updateCategory)
categoryRoute.delete("/:id", deleteCategory)

export default categoryRoute