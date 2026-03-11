import { createUserService, deleteUserService, getUserByIdService, getUserService, updateUserService, validateUserService } from "../services/userService.js"
import { handleError } from "../utils/errorHandler.js"

// Vistas
export const createUserView = async (req, res) => {
    res.render("user/createUser", {
        title: "Registrar usuario"
    }    )
}

export const getAllUserView = async (req, res) => {
    const users = await getUserService();
    res.render("user/getAllUser", { title: "Lista de Usuarios", users });
};

export const updateUserView = async (req, res) => {
    try {
        const {id} = req.params
        const user = await getUserByIdService(id)
        if(!user){
            req.session.message = "Usuario no encontrado"
            return res.redirect("/user")
        }

        res.render("user/updateUser", {
            title: "Formulario de edicion de usuario",
            user
        })

    } catch (error) {
        req.session.message = "Error al cargar usuario"
        res.redirect("/user")
    }
}

export const loginView = async (req, res) => {
    res.render("user/login", {
        title: "Iniciar Sesión"
    })
}

// Acciones

export const createUser = async (req, res) => {
    try {
        const userData = req.body
        await createUserService(userData)
        req.session.message = "Usuario creado con exito"
        req.session.success = true
        res.redirect("/")
    } catch (error) {
        req.session.message = "Error al crear usuario ", error.message
    }
}



export const updateUser = async (req, res) => {
    try {
        const {id} = req.params
        const userData = req.body
        await updateUserService(id, userData)
        
        req.session.message = "Usuario actualizado correctamente"
        req.session.success = true
        res.redirect("/user")

    } catch (error) {
        if(error.statusCode === 404){
            req.session.message = "Usuario no encontrado"
        } else {
            req.session.message = "Error al eliminar el usuario"
        }
        res.redirect("/user")
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params
        console.log({id})
        const deletedUser = await deleteUserService(id)
        console.log({deletedUser})
        req.session.message = deletedUser && "Usuario eliminado con exito"
        req.session.success = true
        res.redirect("/user")
    } catch (error) {
        if(error.statusCode === 404){
            req.session.message = "Usuario no encontrado"
        } else {
            req.session.message = "Error al eliminar el usuario"
        }
        res.redirect("/user")
    }
}

export const validateUser = async (req, res) => {
    try {
        const userData = req.body
        const result = await validateUserService(userData)
        
        req.session.token = result.token ? result.token : null
        req.session.userId = result.userId ? result.userId : null
        req.session.userEmail = result.userEmail ? result.userEmail : null

        req.session.message = `¡Bienvenido/a ${result.userEmail}!`
        req.session.success = true
        res.redirect("/")
    } catch (error) {
        req.session.message = error.message
        res.redirect("/user/login")
    }
}

export const logout = (req, res) => {
    // Verificamos si existe la sesión
    if (req.session) {
        // Destruimos la sesión en el servidor (MongoStore)
        req.session.destroy((err) => {
            if (err) {
                console.error("Error al destruir la sesión:", err);
                return res.redirect("/"); // O maneja el error como prefieras
            }
            
            // Limpiamos la cookie en el cliente
            res.clearCookie("connect.sid");
            
            // Redirigimos al login o al inicio
            // Esto es vital para que Handlebars refresque la vista sin el usuario
            res.redirect("/"); 
        });
    } else {
        res.redirect("/user/login");
    }
};