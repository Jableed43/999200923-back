# Sistema de Turnos - Backend

Backend del proyecto de Sistema de Turnos para la gestión de turnos médicos.

## Tecnologías utilizadas
- Node.js
- Express
- MongoDB / Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- multer
- cors
- morgan
- Swagger (`swagger-ui-express`, `swagger-jsdoc`)
- Jest
- Supertest
- mongodb-memory-server

## Características implementadas
- Autenticación de usuarios (`login`, `register`)
- Gestión de pacientes, profesionales y administrativos
- Reserva de turnos y consulta de turnos disponibles
- Validación de roles con middleware JWT
- Carga de imágenes para profesionales
- Documentación API con Swagger
- Tests unitarios de API con Jest y Supertest

## Estructura de carpetas
- `src/`
  - `app.js` - configuración de Express y rutas
  - `index.js` - arranque del servidor
  - `config/` - configuración de base de datos y variables de entorno
  - `controllers/` - lógica de controladores de rutas
  - `routes/` - definiciones de endpoints
  - `services/` - lógica de negocio y acceso a datos
  - `models/` - esquemas de MongoDB
  - `middlewares/` - autenticación y control de roles
  - `uploads/` - archivos estáticos subidos
  - `__tests__/` - tests de API existentes
  - `swagger.js` - documentación Swagger de la API

## Instalación y ejecución
1. Abrir la carpeta `26/server`.
2. Instalar dependencias:

```bash
npm install
```

3. Crear un archivo `.env` en la raíz de `26/server` con al menos:

```env
MONGODB_URI=mongodb://localhost:27017/seprise
JWT_SECRET=seprise_secret_key_2026
PORT=3000
```

4. Iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

5. Acceder a la API en:

```text
http://localhost:3000
```

6. Ver la documentación Swagger en:

```text
http://localhost:3000/api/docs
```

## Tests
- Ejecutar todos los tests:

```bash
npm test
```

- Ejecutar solo los tests unitarios/API:

```bash
npm run test:unit
```
