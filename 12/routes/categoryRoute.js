import express from 'express'
import { createCategory, getAllCategories } from '../controllers/categoryController.js'

const categoryRoute = express.Router()

categoryRoute.get("/", getAllCategories)
categoryRoute.post("/", createCategory)

export default categoryRoute