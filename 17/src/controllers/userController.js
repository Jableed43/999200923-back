import * as userService from "../services/userService.js"

// --- VISTAS (GET) ---

export const getAllUserView = async (req, res) => {
    try {
        const users = await userService.getAllUsers()
        res.render("user/getAllUser", { title: "Lista de Usuarios", users })
    } catch (error) {
        req.session.message = "Error al cargar los usuarios"
        res.redirect("/")
    }
}

export const createUserView = (req, res) => {
    res.render("user/createUser", { title: "Registrar usuario" })
}

export const updateUserView = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userService.getUserById(id)
        res.render("user/updateUser", { title: "Editar usuario", user })
    } catch (error) {
        req.session.message = error.message || "Usuario no encontrado"
        res.redirect("/user")
    }
}

export const loginView = (req, res) => {
    res.render("user/login", { 
        title: "Iniciar Sesión",
        layout: "simple" 
    })
}


// --- ACCIONES (POST, PATCH, DELETE) ---

export const createUser = async (req, res) => {
    try {
        await userService.createUser(req.body)
        req.session.message = "Usuario creado con éxito"
        req.session.success = true
        res.redirect("/user")
    } catch (error) {
        req.session.message = "Error al crear usuario: " + error.message
        res.redirect("/user/create")
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        await userService.updateUser(id, req.body)
        req.session.message = "Usuario actualizado correctamente"
        req.session.success = true
        res.redirect("/user")
    } catch (error) {
        req.session.message = error.message || "Error al actualizar usuario"
        res.redirect("/user")
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        await userService.deleteUser(id)
        req.session.message = "Usuario eliminado con éxito"
        req.session.success = true
    } catch (error) {
        req.session.message = error.message || "Error al eliminar el usuario"
    }
    res.redirect("/user")
}

export const validateUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await userService.loginUser(email, password)
        
        // Guardamos en sesión
        req.session.token = result.token
        req.session.userId = result.userId
        req.session.userEmail = result.userEmail
        req.session.userRole = result.userRole
        req.session.message = `¡Bienvenido/a ${result.userEmail}!`

        req.session.success = true
        
        res.redirect("/")
    } catch (error) {
        req.session.message = error.message
        res.redirect("/user/login")
    }
}

export const logout = (req, res) => {
    if (!req.session) return res.redirect("/user/login")

    req.session.destroy((err) => {
        if (err) console.error("Error al cerrar sesión:", err)
        res.clearCookie("connect.sid")
        res.redirect("/")
    })
}