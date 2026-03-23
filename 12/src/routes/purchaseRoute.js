import express from 'express'
import { createPurchase, getAllPurchases, getPurchaseById, getPurchasesByUser } from '../controllers/purchaseController.js'
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware.js'

const purchaseRoute = express.Router()

purchaseRoute.post("/", verifyTokenMiddleware, createPurchase)
purchaseRoute.get("/", verifyTokenMiddleware, getAllPurchases)
purchaseRoute.get("/user/:id", verifyTokenMiddleware, getPurchasesByUser)
purchaseRoute.get("/:id", verifyTokenMiddleware, getPurchaseById)

export default purchaseRoute