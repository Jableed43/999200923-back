import express from "express"
import { PORT } from "./config/config.js"
import { connectDB } from "./config/db.js"

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: true}))

connectDB()

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})