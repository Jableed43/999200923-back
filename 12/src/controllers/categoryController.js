import { createCategoryService, deleteCategoryService, getAllCategoryService, updateCategoryService } from "../services/categoryService.js"

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

export const updateCategory = async (req, res) => {
    try {
        const {id} = req.params
        const data = req.body

        const updatedCategory = await updateCategoryService(id, data)

        res.status(201).json(updatedCategory)

    } catch (error) {
         const statusCode = error.statusCode || 500
            res.status(statusCode).json({
            message: error.message || "Internal server error"
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const {id} = req.params

        const deletedCategory = await deleteCategoryService(id)

        res.status(201).json({ message: "Deleted Category", deletedCategory})

    } catch (error) {
         const statusCode = error.statusCode || 500
            res.status(statusCode).json({
            message: error.message || "Internal server error"
        })
    }
}