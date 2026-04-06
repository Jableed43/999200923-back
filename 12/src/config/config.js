import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3001
export const MONGODB_URI = process.env.MONGODB_URI
export const SECRET=process.env.SECRET
export const API_KEY= process.env.API_KEY
export const AUTH_DOMAIN= process.env.AUTH_DOMAIN
export const PROJECT_ID= process.env.PROJECT_ID
export const STORAGE_BUCKET= process.env.STORAGE_BUCKET
export const MESSAGING_SENDER_ID= process.env.MESSAGING_SENDER_ID
export const APP_ID= process.env.APP_ID
export const SUPABASE_URL = process.env.SUPABASE_URL
export const SUPABASE_KEY = process.env.SUPABASE_KEY