import express from 'express'
import { createProduct, deleteProduct, getAllProduct, updateProduct, getProductById } from '../controllers/productController.js'
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware.js'
import { verifyRoleMiddleware } from '../middlewares/verifyRoleMiddleware.js'
import { roleEnum } from '../models/userModel.js'

const productRoute = express.Router()

// Creamos los endpoints
productRoute.post("/", verifyTokenMiddleware, verifyRoleMiddleware([roleEnum[1], roleEnum[2]]), createProduct)
productRoute.get("/", getAllProduct)
productRoute.get("/:id", getProductById) // Nuevo endpoint individual para el Detalle en React

// Tanto put como patch se comportan igual con mongoose
productRoute.patch("/:id", verifyTokenMiddleware, verifyRoleMiddleware([roleEnum[1], roleEnum[2]]), updateProduct)
productRoute.put("/:id", verifyTokenMiddleware, verifyRoleMiddleware([roleEnum[1], roleEnum[2]]), updateProduct)
productRoute.delete("/:id", verifyTokenMiddleware, verifyRoleMiddleware([roleEnum[1], roleEnum[2]]), deleteProduct)

export default productRoute