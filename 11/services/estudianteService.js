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