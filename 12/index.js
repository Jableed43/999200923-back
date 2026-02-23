import express from "express"
import { PORT } from "./config/config.js"
import { connectDB } from "./config/db.js"
import productRoute from "./routes/productRoute.js"
import categoryRoute from "./routes/categoryRoute.js"

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: true}))

connectDB()

// Rutas
// Agrupador de rutas de productos
app.use("/api/product", productRoute)
app.use("/api/category", categoryRoute)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})