import Category from "../models/categoryModel.js"
import Product from "../models/productModel.js"

export const getAllCategoryService = async () => {
    const categories = await Category.find()
    return categories
}

export const createCategoryService = async (name) => {
    const categoryExist = await Category.findOne({name})
    if(categoryExist){
        const error = new Error("Category already exists")
        error.statusCode = 400
        throw error
    }
    const newCategory = new Category({name})
    const response = await newCategory.save()
    return response
}

export const updateCategoryService = async (id, name) => {
    // Primero validamos que exista, por lo tanto lo buscamos por nombre que es unico
    const categoryExist = await Category.findOne({_id: id})
    // Si no existe lanzamos un error
    if(!categoryExist){
        const error = new Error("Category not found")
        error.statusCode = 400
        throw error
    }
    // usamos findOneAndUpdate para encontrar el registro y actualizarlo
    // este usa 3 parametros
    // 1. Es el identificador, que usamos el _id
    // 2. Es el dato a editar
    // 3. returnDocument after, retorna el documento luego de ser editado
    const updatedCategory = await Category.findOneAndUpdate(
        {_id: id},
        name,
        { returnDocument: 'after' }
    )
    return updatedCategory
}

export const deleteCategoryService = async (id) => {
    // Primero validamos que exista, por lo tanto lo buscamos por nombre que es unico
    const categoryExist = await Category.findOne({_id: id})
    // Si no existe lanzamos un error
    if(!categoryExist){
        const error = new Error("Category not found")
        error.statusCode = 400
        throw error
    }

    const deletedCategory = await Category.findByIdAndDelete(id)

    // Funciona como cascade, en caso de borrar una categoria, pasa a null la category en los productos que la poseen
    // Si hay productos con la categoria eliminada pasa el campo category a null

    await Product.updateMany(
        { category: id },
        { $set: {category: null} }
    )

    return deletedCategory

}