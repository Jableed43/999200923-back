import express from 'express'
import { createProduct, createProductView, deleteProduct, getAllProduct, getAllProductView, updateProduct } from '../controllers/productController.js'

const productRoute = express.Router()

// Creamos los endpoints
productRoute.post("/", createProduct)
// productRoute.get("/", getAllProduct)
// Tanto put como patch se comportan igual con mongoose
productRoute.patch("/:id", updateProduct)
productRoute.put("/:id", updateProduct)
productRoute.delete("/:id", deleteProduct)

// vistas
productRoute.get("/create", createProductView)
productRoute.get("/", getAllProductView)

export default productRoute