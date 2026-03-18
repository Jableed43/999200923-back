export const verifyRoleMiddleware = (rolesPermitidos) => {
    return (req, res, next) => {
        try {
            if(!req.user){
                return res.status(401).json({message: "User data was not found in the request"})
            }

            // Permite el acceso al rol desde otros lugares
            const userRole = req.user.role

            if(!rolesPermitidos.includes(userRole)){
                return res.status(403).json({message: `Denied access insufficient permissions. Role required: ${rolesPermitidos.join(" o ")}`})
            }

            next()
        } catch (error) {
            return res.status(500).json({message: "Error verifying roles", error: error.message})
        }
    }
}