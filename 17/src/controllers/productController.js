import { createProductService, deleteProductService, getAllProductService, updateProductService } from "../services/productService.js"
import { handleError } from "../utils/errorHandler.js"

export const createProduct = async (req, res) => {
    try {
        // recibimos del cliente la informacion
        const productData = req.body
        // manejamos la creacion del producto
        const savedProduct = await createProductService(productData)
        // respondemos al cliente con el producto creado
        res.status(201).json(savedProduct)
    } catch (error) {
        // Si tenemos un 400 u otro mensaje de error lo usamos
        // sino sera un 500
        handleError(error, res)
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