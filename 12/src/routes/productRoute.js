import express from 'express'
import { createProduct, deleteProduct, getAllProduct, updateProduct, getProductById } from '../controllers/productController.js'

const productRoute = express.Router()

// Creamos los endpoints
productRoute.post("/", createProduct)
productRoute.get("/", getAllProduct)
productRoute.get("/:id", getProductById) // Nuevo endpoint individual para el Detalle en React

// Tanto put como patch se comportan igual con mongoose
productRoute.patch("/:id", updateProduct)
productRoute.put("/:id", updateProduct)
productRoute.delete("/:id", deleteProduct)

export default productRoute