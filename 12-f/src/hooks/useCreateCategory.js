import { useState } from "react"
import { fetchApi } from "../services/api"

export const useCreateCategory = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const createCategory = async(name) => {
        setLoading(true)
        setError(null)
        try {
            const data = await fetchApi("/category", {
                method: "POST",
                body: JSON.stringify({name})
            })
            return {success: true, data}
        } catch (error) {
            setError(error.message)
            return {success: false, error: error.message}
        } finally {
            setLoading(false)
        }
    }

    return {loading, createCategory, error}
}