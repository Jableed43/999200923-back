import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3001

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


// Este codigo debe ir siempre al final
app.listen(PORT, async () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})