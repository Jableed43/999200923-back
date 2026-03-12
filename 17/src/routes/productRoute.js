import express from 'express'
import * as productController from '../controllers/productController.js'
import { isAuthenticated, hasRole } from '../middlewares/authMiddleware.js'

const productRoute = express.Router()

// --- VISTAS ---
productRoute.get("/", isAuthenticated, productController.getAllProductView)
productRoute.get("/create", isAuthenticated, hasRole(['administrador', 'vendedor']), productController.createProductView)
productRoute.get("/update/:id", isAuthenticated, hasRole(['administrador', 'vendedor']), productController.updateProductView)

// --- ACCIONES ---
productRoute.post("/", isAuthenticated, hasRole(['administrador', 'vendedor']), productController.createProduct)
productRoute.patch("/:id", isAuthenticated, hasRole(['administrador', 'vendedor']), productController.updateProduct)
productRoute.delete("/:id", isAuthenticated, hasRole(['administrador', 'vendedor']), productController.deleteProduct)

export default productRoute
