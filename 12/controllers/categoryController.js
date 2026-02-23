import { createCategoryService, getAllCategoryService } from "../services/categoryService.js"

export const getAllCategories = async (req, res) => {
    try {
        const categories = await getAllCategoryService()
        res.status(200).json(categories)
    } catch (error) {
        const statusCode = error.statusCode || 500
        res.status(statusCode).json({
            message: error.message || "Internal server error"
        })
    }
}

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        const response = await createCategoryService(name)
        res.status(201).json(response)
    } catch (error) {
         const statusCode = error.statusCode || 500
            res.status(statusCode).json({
            message: error.message || "Internal server error"
        })
    }
}