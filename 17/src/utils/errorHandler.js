// Util -> Es una herramienta generica que no depende de ningun servicio especifico, se puede usar casi en cualquier lugar

export const handleError = (error, res) => {
    const statusCode = error.statusCode || 500
    const message = error.message || "Internal server error"

        res.status(statusCode).json({
            message: message
        })
}
