import Category from "../models/categoryModel.js"

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