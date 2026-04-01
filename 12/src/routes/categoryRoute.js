import express from 'express'
import { createCategory, deleteCategory, getAllCategories, updateCategory } from '../controllers/categoryController.js'
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware.js'
import { verifyRoleMiddleware } from '../middlewares/verifyRoleMiddleware.js'
import { roleEnum } from '../models/userModel.js'

const categoryRoute = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Endpoints para gestionar las categorías de productos
 */ 

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorias obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */ 
categoryRoute.get("/", getAllCategories)

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Categoría creada
 */
categoryRoute.post("/", verifyTokenMiddleware, verifyRoleMiddleware([roleEnum[1], roleEnum[2]]), createCategory)

/**
 * @swagger
 * /api/category/{id}:
 *   patch:
 *     summary: Actualizar una categoría
 *     tags: [Categories]
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
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Categoría actualizada
 */
categoryRoute.patch("/:id", verifyTokenMiddleware, verifyRoleMiddleware([roleEnum[1], roleEnum[2]]), updateCategory)

/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Categories]
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
 *         description: Categoría eliminada
 */
categoryRoute.delete("/:id", verifyTokenMiddleware, deleteCategory)

export default categoryRoute