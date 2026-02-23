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

export const getAllProductService = async () => {
    // Traer todos los productos, es igual al "select *"
    const products = await Product.find()

    return products
}

export const updateProductService = async (id, productData) => {
    const productExist = await Product.findOne({ _id: id })
    if(!productExist){
        const error = new Error("Product not found")
        // El cliente paso un campo y un dato para la busqueda y ese registro no se encuentra
        error.statusCode = 404
        throw error
    }

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
    const productExist = await Product.findById(id)
    // await Product.findOne({_id: id})
    if(!productExist){
        const error = new Error("Product not found")
        // El cliente paso un campo y un dato para la busqueda y ese registro no se encuentra
        error.statusCode = 404
        throw error
    }

    const response = await Product.findByIdAndDelete(id)

    return { message: "Product deleted successfully", data: response }
}