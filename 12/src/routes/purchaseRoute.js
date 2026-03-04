import express from 'express'
import { createPurchase, getAllPurchases, getPurchaseById, getPurchasesByUser } from '../controllers/purchaseController.js'

const purchaseRoute = express.Router()

purchaseRoute.post("/", createPurchase)
purchaseRoute.get("/", getAllPurchases)
purchaseRoute.get("/user/:id", getPurchasesByUser)
purchaseRoute.get("/:id", getPurchaseById)

export default purchaseRoute