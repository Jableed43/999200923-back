import jwt from 'jsonwebtoken'
import { SECRET } from '../config/config.js';

//junto con el secreto valida si el token que nos brinda el cliente es correcto
export function verifyToken(token){
    try {
        const decoded = jwt.verify(token, SECRET)
        return decoded
    } catch (error) {
        throw new Error("Invalid Token");
    }
}