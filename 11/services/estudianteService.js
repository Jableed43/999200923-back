import { pool } from "../config/db.js"

export const getAllEstudiantesService = async () => {
    const query = "SELECT * FROM estudiante ORDER BY idestudiante ASC"
    const [estudiantes] = await pool.query(query)
    return estudiantes

    // El retorno de pool.query trae un array con dos arrays dentro.
    // El primero es el listado de registros de la consulta
    // El segundo es el schema de la db de los registros que trajo
}

export const createEstudianteService = async (estudianteData) => {

    const { nombre, apellido, email, fechaNacimiento } = estudianteData

    const query = "INSERT INTO estudiante (nombre, apellido, email, fechaNacimiento) VALUES (?, ?, ?, ?)"

    const [result] = await pool.query(query, [ nombre, apellido, email, fechaNacimiento ])

    return {
        id: result.insertId,
        nombre,
        apellido,
        email,
        fechaNacimiento
    }
}

export const getEstudianteById = async (id) => {
    const query = "SELECT * FROM estudiante WHERE idestudiante = ?"
    // pool.query necesita como primer parametro la query
    // como segundo parametro los valores a utilizar, son los que se reemplazaran por los signos de interrogacion "?"
    const [estudiantes] = await pool.query(query, [id])

    if(estudiantes.length === 0){
        return null
    }

    return estudiantes[0]
}

export const estudianteExists = async (id) => {
    const estudiante = await getEstudianteById(id)
    // retorna un booleano, true si existe, false si no existe
    return estudiante !== null
}

export const patchEstudianteService = async (id, estudianteData) => {
    const estudianteActual = await getEstudianteById(id)

    if(!estudianteActual){
        return null
    }

    // Combinar datos actuales con los nuevos
    const datosActualizados = {
        // ?? -> Este tipo de condicional solo tiene dos opciones
        // Si me mandaron datos para actualizar usamos esos
        // Si no me mandaron datos para actualizar usamos los datos actuales
        // Estoy priorizando los datos nuevos si existen
        nombre: estudianteData.nombre ?? estudianteActual.nombre,
        apellido: estudianteData.apellido ?? estudianteActual.apellido,
        email: estudianteData.email ?? estudianteActual.email,
        fechaNacimiento: estudianteData.fechaNacimiento ?? estudianteActual.fechaNacimiento
    }


    const query = "UPDATE estudiante SET nombre = ?, apellido = ?, email = ?, fechaNacimiento = ? where idestudiante = ? "
    
    await pool.query(query, [
        datosActualizados.nombre,
        datosActualizados.apellido,
        datosActualizados.email,
        datosActualizados.fechaNacimiento,
        id
    ])

    return {
        id,
        ...datosActualizados
    }
}

export const deleteEstudianteService = async (id) => {
    const query = "DELETE FROM estudiante WHERE idestudiante = ?"
    await pool.query(query, [id])
    return true
}