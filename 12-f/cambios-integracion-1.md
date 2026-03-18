Roles de usuario
Panel de administrador

Backend
- Aplicar en el modelo Roles: "Administrador", "Vendedor", "Consumidor"
- Verificar los roles en algun middleware (controlar rutas y acciones)
- Añadir rol en el payload de session / token
- Que la creacion del usuario contemple los roles
- Aplicar middlewares en las rutas

Frontend
- Configuracion de rutas (permitir el paso del admin solo a ciertas rutas)
- Contexto de roles de usuarios
- Modificar AuthProvider
- Colocar opciones en navBar (navegacion del admin)
- Panel de administrador (tabla de usuarios -> borrar)
- Form de creacion de usuarios x rol (admin?)
- Hooks -> usuarios admin, hook de autenticacion, hook de registro