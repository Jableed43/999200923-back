import { createEstudianteService, getAllEstudiantesService } from "../services/estudianteService.js"

export const getAllEstudiantes = async (req, res) => {
    try {
        const estudiantes = await getAllEstudiantesService()

        res.status(200).json({
            success: true,
            data: estudiantes,
            total: estudiantes.length
        })

    } catch (error) {
        console.error("error al obtener estudiantes", error)
        res.status(500).json({
            success: false,
            error: "Error al obtener estudiantes",
            message: error.message
        })
    }
}

export const createEstudiante = async (req, res) => {
    try {
        const { nombre, apellido, email, fechaNacimiento } = req.body
        console.log(req.body)
        // Validacion
        if(!nombre || !apellido || !email || !fechaNacimiento){
            return res.status(400).json({
                success: false,
                error: "Faltan campos requeridos",
                required: [ "nombre", "apellido", "email", "fechaNacimiento" ]
            })
        }

        const nuevoEstudiante = await createEstudianteService({
            nombre, apellido, email, fechaNacimiento
        })

        res.status(201).json({
            success: true,
            message: "Estudiante creado correctamente",
            data: nuevoEstudiante
        })

    } catch (error) {
        console.error("Error al crear estudiante", error)
        
        res.status(500).json({
            success: false,
            error: "Error al crear estudiante",
            message: error.message
        })
    }
}