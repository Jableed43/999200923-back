// Va a verificar si el token recibido es valido

import { verifyToken } from "../utils/verifyToken.js"

export const verifyTokenMiddleware = (req, res, next) => {
    try {
        // Primero del cliente obtenemos el token (que nosotros le brindamos anteriormente)
        const authHeader = req.headers.authorization

        console.log({authHeader})
        // Si no hay token o este no comienza con bearer, lanzamos error
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(400).json({message: "Access token is invalid"})
        }
       // Separamos bearer del token, y nos quedamos solo con el token
        const token = authHeader.split(" ")[1]

        const decoded = verifyToken(token)

        console.log({decoded})

        // guardamos en el request el usuario
        req.user = decoded

        next()

    } catch (error) {
        return res.status(400).json({message: "Invalid access token", error})
    }
}