import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3001

export const DB_HOST = process.env.MYSQL_HOST
export const DB_USER = process.env.MYSQL_USER
export const DB_PASSWORD = process.env.MYSQL_PASSWORD
export const DB_NAME = process.env.MYSQL_DB_NAME
export const DB_PORT = process.env.MYSQL_PORT
