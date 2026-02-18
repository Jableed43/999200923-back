import express from "express"
import { createEstudiante, deleteEstudiante, getAllEstudiantes, patchEstudiante } from "../controllers/estudianteController.js"

const router = express.Router()

// Componentes de una ruta
// Metodo HTTP + url + controlador
// Dos rutas pueden compartir url si tienen distinto verbo/metodo http
router.get("/", getAllEstudiantes)
router.post("/", createEstudiante)
router.patch("/:id", patchEstudiante)
router.delete("/:id", deleteEstudiante)

export default router