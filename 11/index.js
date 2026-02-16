import express from 'express'
import { PORT } from './config/config.js'
import { testConnection } from './config/db.js'
import estudiantesRoutes from "./routes/estudianteRoutes.js"

const app = express()

// Middleware
// app.use -> configuraciones, funcionalidades que utilizamos
// express.json -> permite parsear el body cuando viene como JSON
app.use(express.json())

// Parsea el body cuando viene como form-urlencoded
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    res.json({
        message: "Bienvenidos a la API de estudiantes",
        endpoints: {
            "GET /estudiantes": "Obtener todos los estudiantes"
        }
    })
})

// Rutas
//Rutas de estudiantes
app.use("/api/estudiantes", estudiantesRoutes)


// Este codigo debe ir siempre al final
app.listen(PORT, async () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)

    // Probar la conexion a la base de datos
    await testConnection()
})