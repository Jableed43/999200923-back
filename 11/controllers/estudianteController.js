import { createEstudianteService, deleteEstudianteService, estudianteExists, getAllEstudiantesService, patchEstudianteService } from "../services/estudianteService.js"

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

export const patchEstudiante = async (req, res) => {
    try {
        const { id } = req.params

        const { nombre, apellido, email, fechaNacimiento } = req.body

        // Validar los campos, que al menos uno llegue
        if(!nombre && !apellido && !email && !fechaNacimiento){
            return res.status(400).json({
                success: false,
                error: "Debe enviar al menos un campo para actualizar",
                allowFields: ["nombre", "apellido", "email", "fechaNacimiento"]
            })
        }

        const exists = await estudianteExists(id)
        if(!exists){
            return res.status(400).json({
                success: false,
                error: "Estudiante no encontrado"
            })
        }

        // construir un objeto solo con los campos enviados
        const datosParciales = {}
        if(nombre !== undefined) {datosParciales.nombre = nombre}
        if(email !== undefined) {datosParciales.email = email}
        if(apellido !== undefined) {datosParciales.apellido = apellido}
        if(fechaNacimiento !== undefined) {datosParciales.fechaNacimiento = fechaNacimiento}

        const estudianteActualizado = await patchEstudianteService(id, datosParciales)

        if(!estudianteActualizado){
            return res.status(404).json({
                success: false,
                error: "Estudiante no encontrado"
            })
        }

        res.json({
            success: true,
            message: "Estudiante actualizado correctamente",
            data: estudianteActualizado
        })

    } catch (error) {
        console.error("Error al actualizar el estudiante", error)

        res.status(500).json({
            success: false,
            error: "Error al actualizar el estudiante",
            message: error.message
        })
    }
}

export const deleteEstudiante = async (req, res) => {
    try {
        const {id} = req.params

        const exists = await estudianteExists(id)
        if(!exists){
            return res.status(404).json({
                success: false,
                error: "Estudiante no encontrado"
            })
        }

        await deleteEstudianteService(id)

        res.json({
            success: true,
            message: "Estudiante eliminado correctamente",
            data: {
                id
            }
        })

    } catch (error) {
        console.error("Error al eliminar estudiante", error)
        res.status(500).json({
            success: false,
            error: "Error al eliminar estudiante",
            message: error.message
        })
    }
}