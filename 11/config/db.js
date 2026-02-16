import mysql from "mysql2/promise"
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./config.js"

// Pool de conexiones
// Reutiliza las conexiones y mejora el rendimiento
export const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

// Funcion para probar la conexion
export const testConnection = async() => {
    try {
        const connection = await pool.getConnection()
        console.log("Conexion a MySQL establecida correctamente")
        connection.release()
        return true
    } catch (error) {
        console.error("Error al conectar a la base de datos", error.message)
        return false
    }
}