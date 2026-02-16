import express from "express"
import { createEstudiante, getAllEstudiantes } from "../controllers/estudianteController.js"

const router = express.Router()

// Componentes de una ruta
// Metodo HTTP + url + controlador
// Dos rutas pueden compartir url si tienen distinto verbo/metodo http
router.get("/", getAllEstudiantes)
router.post("/", createEstudiante)

export default router