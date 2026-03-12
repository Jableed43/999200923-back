// Middleware para verificar si el usuario está autenticado
export const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    }
    req.session.message = "Debes iniciar sesión para acceder a esta sección";
    res.redirect("/user/login");
};

// Middleware para verificar si el usuario NO está autenticado (para Login/Registro)
export const isGuest = (req, res, next) => {
    if (!req.session || !req.session.userId) {
        return next();
    }
    res.redirect("/"); // Redirige al inicio si ya está logueado
};

// Middleware para verificar roles (RBAC)
export const hasRole = (roles) => {
    return (req, res, next) => {
        if (!req.session || !req.session.userId) {
            req.session.message = "No tienes permiso para acceder";
            return res.redirect("/user/login");
        }

        if (roles.includes(req.session.userRole)) {
            return next();
        }

        req.session.message = "No tienes los permisos necesarios (Rol: " + req.session.userRole + ")";
        res.redirect("/");
    };
};
