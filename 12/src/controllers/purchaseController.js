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