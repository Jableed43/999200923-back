import express from 'express'
import { createProduct, deleteProduct, getAllProduct, updateProduct, getProductById } from '../controllers/productController.js'
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware.js'
import { verifyRoleMiddleware } from '../middlewares/verifyRoleMiddleware.js'
import { roleEnum } from '../models/userModel.js'
import upload from '../middlewares/multerMiddleware.js'

const productRoute = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         profitRate:
 *           type: number
 *         description:
 *           type: string
 *         quantity:
 *           type: number
 *         status:
 *           type: string
 *           enum: [AVAILABLE, NOT_AVAILABLE, DISCONTINUED]
 *         category:
 *           type: string
 *         highlighted:
 *           type: boolean
 *         finalPrice:
 *           type: number
 */

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Endpoints para gestionar productos del catálogo
 */

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       401:
 *         description: No autorizado
 */
productRoute.post("/", verifyTokenMiddleware, verifyRoleMiddleware([roleEnum[1], roleEnum[2]]), upload.single('image'), createProduct)

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
productRoute.get("/", getAllProduct)

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */
productRoute.get("/:id", getProductById)

/**
 * @swagger
 * /api/product/{id}:
 *   patch:
 *     summary: Actualizar un producto (parcial)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado
 */
productRoute.patch("/:id", verifyTokenMiddleware, verifyRoleMiddleware([roleEnum[1], roleEnum[2]]), updateProduct)

/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Actualizar un producto (completo)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado
 */
productRoute.put("/:id", verifyTokenMiddleware, verifyRoleMiddleware([roleEnum[1], roleEnum[2]]), updateProduct)

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado
 */
productRoute.delete("/:id", verifyTokenMiddleware, verifyRoleMiddleware([roleEnum[1], roleEnum[2]]), deleteProduct)

export default productRoute