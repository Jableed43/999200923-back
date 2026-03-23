import { roleEnum } from "../models/userModel.js"
import { createPurchaseService, getAllPurchasesService, getPurchaseByIdService, getPurchasesByUserService } from "../services/purchaseService.js"
import { handleError } from "../utils/errorHandler.js"

export const createPurchase = async (req, res) => {
    try {
        const purchase = await createPurchaseService(req.body)
        return res.status(201).json({
            message: "Purchase created successfully",
            data: purchase
        })
    } catch (error) {
        handleError(error, res)
    }
}

export const getAllPurchases = async (req, res) => {
    try {
        const purchases = await getAllPurchasesService()
        return res.status(200).json(purchases)
    } catch (error) {
        handleError(error, res)
    }
}

export const getPurchasesByUser = async (req, res) => {
    try {
        const {id} = req.params
        // El usuario solo puede ver sus propias compras, a menos que sea ADMIN o SELLER
        if(req.user.userId !== id && req.user.role === roleEnum[0]){
            return res.status(403).json({ message: "No autorizado para ver compras de otros usuarios" })
        }
        const purchases = await getPurchasesByUserService(id)
        return res.status(200).json(purchases)
    } catch (error) {
        handleError(error, res)
    }
}

export const getPurchaseById = async (req, res) => {
    try {
        const {id} = req.params
        const purchase = await getPurchaseByIdService(id)
        return res.status(200).json(purchase)
    } catch (error) {
        handleError(error, res)
    }
}