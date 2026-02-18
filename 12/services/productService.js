import Product from "../models/productModel.js"

export const createProductService = async (productData) => {
    // Deberiamos validar que el producto es unico
    const {name} = productData

    const productExist = await Product.findOne({name})

    if(productExist){
        const error = new Error(`Product ${name}, already exist`)
        error.statusCode = 400
        throw error
    }

    const newProduct = new Product(productData)

    const savedProduct = await newProduct.save()

    return savedProduct
}