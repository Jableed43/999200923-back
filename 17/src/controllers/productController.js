import * as productService from "../services/productService.js"
import * as categoryService from "../services/categoryService.js"

// --- VISTAS (GET) ---

export const getAllProductView = async (req, res) => {
    try {
        const products = await productService.getAllProducts()
        res.render("product/getAllProduct", { title: "Listado de productos", products })
    } catch (error) {
        req.session.message = "Error al cargar los productos"
        res.redirect("/")
    }
}

export const createProductView = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories()
        res.render("product/createProduct", { title: "Nuevo producto", categories })
    } catch (error) {
        req.session.message = "Error al cargar categorías"
        res.redirect("/product")
    }
}

export const updateProductView = async (req, res) => {
    try {
        const { id } = req.params
        const product = await productService.getProductById(id)
        const categories = await categoryService.getAllCategories()
        res.render("product/updateProduct", { title: "Editar producto", product, categories })
    } catch (error) {
        req.session.message = error.message || "Error al cargar producto"
        res.redirect("/product")
    }
}

// --- ACCIONES (POST, PATCH, DELETE) ---

export const createProduct = async (req, res) => {
    try {
        const productData = req.body
        // Adaptamos datos booleanos y nulos
        productData.highlighted = !!productData.highlighted
        if (productData.category === "" || productData.category === "null") productData.category = null

        await productService.createProduct(productData)
        req.session.message = "Producto creado con éxito"
        req.session.success = true
        res.redirect("/product")
    } catch (error) {
        req.session.message = "Error al crear producto: " + error.message
        res.redirect("/product/create")
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const productData = req.body
        productData.highlighted = !!productData.highlighted
        if (productData.category === "" || productData.category === "null") productData.category = null

        await productService.updateProduct(id, productData)
        req.session.message = "Producto actualizado correctamente"
        req.session.success = true
        res.redirect("/product")
    } catch (error) {
        req.session.message = error.message || "Error al actualizar producto"
        res.redirect("/product")
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        await productService.deleteProduct(id)
        req.session.message = "Producto eliminado con éxito"
        req.session.success = true
    } catch (error) {
        req.session.message = error.message || "Error al eliminar producto"
    }
    res.redirect("/product")
}

// API de soporte (si se necesita por JSON)
export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}