import express from 'express'
import { createPurchase, getAllPurchases, getPurchaseById, getPurchasesByUser } from '../controllers/purchaseController.js'
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware.js'

const purchaseRoute = express.Router()

/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: Endpoints para gestionar las órdenes de compra
 */

/**
 * @swagger
 * /api/purchase:
 *   post:
 *     summary: Crear una nueva orden de compra
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - products
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       201:
 *         description: Compra realizada con éxito
 */
purchaseRoute.post("/", verifyTokenMiddleware, createPurchase)

/**
 * @swagger
 * /api/purchase:
 *   get:
 *     summary: Obtener todas las compras (solo administradores)
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de compras obtenida
 */
purchaseRoute.get("/", verifyTokenMiddleware, getAllPurchases)

/**
 * @swagger
 * /api/purchase/user/{id}:
 *   get:
 *     summary: Obtener las compras de un usuario específico
 *     tags: [Purchases]
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
 *         description: Lista de compras del usuario
 */
purchaseRoute.get("/user/:id", verifyTokenMiddleware, getPurchasesByUser)

/**
 * @swagger
 * /api/purchase/{id}:
 *   get:
 *     summary: Obtener el detalle de una compra por ID
 *     tags: [Purchases]
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
 *         description: Detalle de la compra
 */
purchaseRoute.get("/:id", verifyTokenMiddleware, getPurchaseById)

export default purchaseRoute