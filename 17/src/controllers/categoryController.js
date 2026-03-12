import * as categoryService from "../services/categoryService.js"

// --- VISTAS (GET) ---

export const getAllCategoryView = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories()
        res.render("category/getAllCategory", { title: "Categorías", categories })
    } catch (error) {
        req.session.message = "Error al cargar categorías"
        res.redirect("/")
    }
}

export const createCategoryView = (req, res) => {
    res.render("category/createCategory", { title: "Nueva Categoría" })
}

export const updateCategoryView = async (req, res) => {
    try {
        const { id } = req.params
        const category = await categoryService.getCategoryById(id)
        res.render("category/updateCategory", { title: "Editar Categoría", category })
    } catch (error) {
        req.session.message = error.message || "Categoría no encontrada"
        res.redirect("/category")
    }
}

// --- ACCIONES ---

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        await categoryService.createCategory(name)
        req.session.message = "Categoría creada con éxito"
        req.session.success = true
        res.redirect("/category")
    } catch (error) {
        req.session.message = error.message
        res.redirect("/category/create")
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body
        await categoryService.updateCategory(id, name)
        req.session.message = "Categoría actualizada correctamente"
        req.session.success = true
        res.redirect("/category")
    } catch (error) {
        req.session.message = error.message
        res.redirect("/category")
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params
        await categoryService.deleteCategory(id)
        req.session.message = "Categoría eliminada con éxito"
        req.session.success = true
    } catch (error) {
        req.session.message = error.message
    }
    res.redirect("/category")
}

// Soporte para otros controladores (interno)
export const getAllCategories = async () => {
    return await categoryService.getAllCategories()
}