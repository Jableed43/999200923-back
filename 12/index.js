import express from "express"
import { PORT, SECRET } from "./src/config/config.js"
import { connectDB } from "./src/config/db.js"
import productRoute from "./src/routes/productRoute.js"
import categoryRoute from "./src/routes/categoryRoute.js"
import userRoute from "./src/routes/userRoute.js"
import session from "express-session"

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: true}))
// Paso 1 para habilitar sesion:
app.use(session({
    secret: SECRET,
    resave: false, // Evita que la sesion se vuelva a guardar si no hay datos
    saveUninitialized: false, // Evita que la sesion se guarde si no esta inicializada
}))

connectDB()

// Rutas
// Agrupador de rutas de productos
app.use("/api/product", productRoute)
app.use("/api/category", categoryRoute)
app.use("/api/user", userRoute)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})