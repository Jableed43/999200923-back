import { createProductService, deleteProductService, getAllProductService, updateProductService } from "../services/productService.js"
import { handleError } from "../utils/errorHandler.js"
import { getAllCategories } from "./categoryController.js"

// Vistas
export const createProductView = async (req, res) => {
    try {
        const categories = await getAllCategories()
        console.log({categories})
        res.render("product/createProduct", {
            title: "Formulario de creacion de producto",
            categories
        })

    } catch (error) {
        res.render("product/createProduct", {
            title: "Formulario de creacion de producto",
            categories: [],
            message: "Error al cargar categorias"
        })
    }
}

export const getAllProductView = async (req, res) => {
    try {
        const products = await getAllProductService()

        res.render("product/getAllProduct", {
            title: "Listado de productos",
            products
        })
    } catch (error) {
        res.render("product/getAllProduct", {
            title: "Listado de productos",
            products: [],
            message: "Hubo un error en recuperar los productos"
        })
    }
}


// Acciones
export const createProduct = async (req, res) => {
    try {
        console.log(req.body)
        if(req.body.category === "null" || req.body.category === ""){
            req.body.category = null
        }

        req.body.highlighted = !!req.body.highlighted

        // manejamos la creacion del producto
        await createProductService(req.body)
        
        req.session.message = "Producto creado exitosamente"
        req.session.success = true

        res.redirect("/")

    } catch (error) {
            req.session.message = error.message || "Error al crear producto"
            res.redirect("/")
    }
}

export const getAllProduct = async (req, res) => {
    try {
        const products = await getAllProductService()
        res.status(200).json(products)
    } catch (error) {
        handleError(error, res)
    }
}

export const updateProduct = async (req, res) => {
    try {
        // req.params -> Parametro de ruta, es informacion que se envia desde en endpoint para filtrar
        // o identificar algo unico
        const { id } = req.params
        const productData = req.body

        const updatedProduct = await updateProductService(id, productData)
        // Cod 201 -> Registro creado / actualizado
        res.status(201).json(updatedProduct)

    } catch (error) {
        handleError(error, res)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params
        const result = await deleteProductService(id)
        res.status(201).json(result)
    } catch (error) {
        handleError(error, res)
    }
}