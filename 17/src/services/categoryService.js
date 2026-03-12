import Category from "../models/categoryModel.js"
import Product from "../models/productModel.js"

export const getAllCategories = async () => {
    return await Category.find()
}

export const getCategoryById = async (id) => {
    const category = await Category.findById(id)
    if (!category) throw { message: "Categoría no encontrada", statusCode: 404 }
    return category
}

export const createCategory = async (name) => {
    const exists = await Category.findOne({ name: name.toLowerCase() })
    if (exists) throw { message: "La categoría ya existe", statusCode: 400 }
    
    const newCategory = new Category({ name })
    return await newCategory.save()
}

export const updateCategory = async (id, name) => {
    const category = await Category.findById(id)
    if (!category) throw { message: "Categoría no encontrada", statusCode: 404 }
    
    category.name = name
    return await category.save()
}

export const deleteCategory = async (id) => {
    const category = await Category.findById(id)
    if (!category) throw { message: "Categoría no encontrada", statusCode: 404 }

    await Category.findByIdAndDelete(id)

    // Cascade: set category to null in products
    await Product.updateMany(
        { category: id },
        { $set: { category: null } }
    )

    return true
}