import { checkModelExist } from "../helpers/checkExist.js"
import Product from "../models/productModel.js"

export const createProductService = async (productData) => {
    // Deberiamos validar que el producto es unico
    const {name} = productData
    await checkModelExist(Product, {name}, false, 400, `Product ${name}, already exist`)

    const newProduct = new Product(productData)

    const savedProduct = await newProduct.save()

    return savedProduct
}

export const getAllProductService = async (query) => {
    let filters = {};

    // 1. Filtrado por categoría exacta
    if (query.category) {
        filters.category = query.category;
    }
    
    // 2. Busqueda parcial en texto (nombre o descripcion)
    if (query.search) {
        filters.$or = [
            { name: { $regex: query.search, $options: 'i' } },
            { description: { $regex: query.search, $options: 'i' } }
        ];
    }
    
    // 3. Traer solo destacados (para la vista de Home)
    if (query.highlighted) {
        filters.highlighted = query.highlighted === 'true';
    }

    // Traer todos los productos aplicando los filtros o todos si no hay ninguno
    const products = await Product.find(filters).populate("category")

    return products
}

export const getProductByIdService = async (id) => {
    // Verificamos si existe el ID previamente
    await checkModelExist(Product, { _id: id }, true, 404, "Product not found")
    
    // Devolvemos el producto con su categoría anidada
    const product = await Product.findById(id).populate("category")
    return product
}

export const updateProductService = async (id, productData) => {
    await checkModelExist(Product, { _id: id }, true, 404, "Product not found")

    // findOneAndUpdate tiene 3 parametros:
    // 1. Es un identificador unico con el cual buscamos el registro
    // 2. Es la informacion con la que vamos a editar el registro
    // 3. Retorna el registro editado, muestra el actualizado no el anterior
    const updateProduct = await Product.findOneAndUpdate(
        {_id: id},
        productData,
        { returnDocument: 'after' }
    )
    return updateProduct
}

export const deleteProductService = async (id) => {
    await checkModelExist(Product, { _id: id }, true, 404, "Product not found")

    const response = await Product.findByIdAndDelete(id)

    return { message: "Product deleted successfully", data: response }
}