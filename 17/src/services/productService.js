import Product from "../models/productModel.js"

export const getAllProducts = async () => {
    return await Product.find().populate("category")
}

export const getProductById = async (id) => {
    const product = await Product.findById(id).populate("category")
    if (!product) throw { message: "Producto no encontrado", statusCode: 404 }
    return product
}

export const createProduct = async (productData) => {
    // Validamos que el nombre sea único si el modelo no lo maneja solo
    const exists = await Product.findOne({ name: productData.name.toLowerCase() })
    if (exists) throw { message: "El producto ya existe", statusCode: 400 }

    const newProduct = new Product(productData)
    return await newProduct.save()
}

export const updateProduct = async (id, productData) => {
    const product = await Product.findById(id)
    if (!product) throw { message: "Producto no encontrado", statusCode: 404 }

    Object.assign(product, productData)
    return await product.save()
}

export const deleteProduct = async (id) => {
    const result = await Product.deleteOne({ _id: id })
    if (result.deletedCount === 0) throw { message: "Producto no encontrado", statusCode: 404 }
    return true
}