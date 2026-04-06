import { createProductService, deleteProductService, getAllProductService, updateProductService, getProductByIdService } from "../services/productService.js"
import { handleError } from "../utils/errorHandler.js"
import { uploadImageToSupabase } from "../utils/supabaseStorage.js"

export const createProduct = async (req, res) => {
    try {
        // Aseguramos que productData nunca sea undefined antes de seguir
        let productData = req.body || {};

        console.log("--- DEBUG PRODUCT UPLOAD ---");
        console.log("REQ.BODY:", req.body);
        console.log("REQ.FILE:", req.file ? req.file.originalname : "Ninguno");

        // VALIDACIÓN PREVIA DE SEGURIDAD
        if (!req.body || Object.keys(req.body).length === 0) {
            // Si llega vacio, intentamos ver si el archivo existe
            if (!req.file) {
                 return res.status(400).json({ message: "No se recibió información en el formulario (body vacío)" });
            }
        }

        // Si el cliente envía un archivo (imagen), lo subimos a Supabase
        if (req.file) {
            const imageUrl = await uploadImageToSupabase(req.file, "imagenes");
            productData.image = imageUrl; // Guardamos la URL en el campo 'image'
        }

        // Si el cuerpo llega vacío por algún error de red/cors/vercel
        if (!productData || Object.keys(productData).length === 0) {
            throw new Error("No se ha recibido información del producto en el cuerpo de la petición");
        }

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
        // Obtenemos los parametros de consulta de la URL, si existen. (ej. req.query.category)
        const products = await getAllProductService(req.query)
        res.status(200).json(products)
    } catch (error) {
        handleError(error, res)
    }
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProductByIdService(id);
        res.status(200).json(product);
    } catch (error) {
        handleError(error, res);
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