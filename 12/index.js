import express from "express"
import { PORT } from "./src/config/config.js"
import { connectDB } from "./src/config/db.js"
import productRoute from "./src/routes/productRoute.js"
import categoryRoute from "./src/routes/categoryRoute.js"
import userRoute from "./src/routes/userRoute.js"

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: true}))

connectDB()

// Rutas
// Agrupador de rutas de productos
app.use("/api/product", productRoute)
app.use("/api/category", categoryRoute)
app.use("/api/user", userRoute)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})