import { useState } from "react"
import { fetchApi } from "../services/api"

export const useDeleteCategory = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const deleteCategory = async (id) => {
        setLoading(true)
        setError(null)
        try {
            await fetchApi(`/category/${id}`, {
                method: "DELETE",
            })
            return {success: true}
        } catch (error) {
            setError(error.message)
            return {success: false, error: error.message}
        } finally {
            setLoading(false)
        }
    }
    return {deleteCategory, error, loading}
}