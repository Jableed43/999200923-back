import express from 'express'
import * as categoryController from '../controllers/categoryController.js'
import { isAuthenticated, hasRole } from '../middlewares/authMiddleware.js'

const categoryRoute = express.Router()

// --- VISTAS ---
categoryRoute.get("/", isAuthenticated, hasRole(['administrador', 'vendedor']), categoryController.getAllCategoryView)
categoryRoute.get("/create", isAuthenticated, hasRole(['administrador', 'vendedor']), categoryController.createCategoryView)
categoryRoute.get("/update/:id", isAuthenticated, hasRole(['administrador', 'vendedor']), categoryController.updateCategoryView)

// --- ACCIONES ---
categoryRoute.post("/", isAuthenticated, hasRole(['administrador', 'vendedor']), categoryController.createCategory)
categoryRoute.patch("/:id", isAuthenticated, hasRole(['administrador', 'vendedor']), categoryController.updateCategory)
categoryRoute.delete("/:id", isAuthenticated, hasRole(['administrador', 'vendedor']), categoryController.deleteCategory)

export default categoryRoute
