# E-Commerce Backend API

Este proyecto es una API construida con **Node.js** y **Express** para gestionar un sistema de comercio electrónico. Incluye funcionalidades completas para la gestión de productos, usuarios, categorías y órdenes de compra, integrando autenticación por **JWT** y documentación interactiva con **Swagger**.

## 🛠 Tecnologías usadas

* **Runtime:** Node.js v24
* **Framework:** Express.js
* **Base de Datos:** MongoDB & Mongoose
* **Seguridad:** JSON Web Token (JWT) & Bcrypt
* **Servicios & Herramientas:** Firebase, Cors, Dotenv
* **Testing:** Jest & Supertest

---

## 🚀 Funcionalidades principales

### 1. Gestión de usuarios
* Registro e inicio de sesión.
* Control de acceso mediante roles de usuario.
* CRUD completo de usuarios para administración.

### 2. Catálogo de productos
* Listado público de productos.
* Búsqueda detallada por ID.
* Gestión administrativa (Crear, Editar, Borrar).

### 3. Categorías
* Clasificación organizada de productos.
* Gestión dinámica de categorías.
* Filtrado de productos por categoría.

### 4. Compras (Purchases)
* Flujo de creación de órdenes de compra.
* Gestión de carrito de compras.
* Historial de compras por usuario.

### 5. Documentación interactiva
* Panel visual con **Swagger UI** para probar todos los endpoints de forma directa.

---

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/Jableed43/999200923-back.git
cd 12
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Variables de entorno
Crea un archivo `.env` en la raíz del proyecto basado en el archivo `.env.example`:

```env
PORT=...
MONGODB_URI=...
SECRET=...
API_KEY=...
AUTH_DOMAIN=...
PROJECT_ID=...
STORAGE_BUCKET=...
MESSAGING_SENDER_ID=...
APP_ID=...
```

### 4. Iniciar el servidor
```bash
# Modo desarrollo
npm run dev
```

---

## 📜 Scripts disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run test` | Ejecuta la suite de pruebas unitarias y de integración. |
| `npm run start` | Inicia el servidor en entorno de producción. |
| `npm run dev` | Lanza el servidor en modo desarrollo con recarga automática. |

---

## 📂 Estructura del proyecto

```text
├── src/
│   ├── config/       # Configuraciones (DB, Swagger, Variables)
│   ├── controllers/  # Lógica de negocio de los endpoints
│   ├── middlewares/  # Validaciones y Seguridad (Auth, Roles)
│   ├── models/       # Esquemas de datos (Mongoose)
│   ├── routes/       # Definición de rutas y documentación Swagger
│   ├── services/     # Comunicaciones con DB y servicios externos
│   └── utils/        # Funciones de utilidad
├── index.js          # Punto de entrada de la aplicación
├── package.json      # Dependencias y scripts
└── README.md         # Documentación del proyecto
```

---

## 📑 Ejemplos de peticiones (Mocks)

### 👤 Registro de usuario
**Endpoint:** `POST /api/user/register`
```json
{
  "name": "Juan Perez",
  "email": "juan@gmail.com",
  "password": "Qwerty123"
}
```

### 🍟 Crear Categoría (Admin)
**Endpoint:** `POST /api/category`
```json
{
  "name": "Tecnología"
}
```

### 💻 Crear Producto (Admin)
**Endpoint:** `POST /api/product`
```json
{
  "name": "Teclado Mecánico",
  "price": 85.50,
  "description": "Teclado RGB con switches blue.",
  "category": "ID_DE_LA_CATEGORIA"
}
```

### 🛒 Realizar Compra
**Endpoint:** `POST /api/purchase`
```json
{
  "products": [
    { "productId": "ID_DEL_PRODUCTO_1", "quantity": 2 },
    { "productId": "ID_DEL_PRODUCTO_2", "quantity": 1 }
  ]
}
```

---
> *Desarrollado como parte del programa de formación técnica UTN.*
