# Análisis y Documentación del Proyecto Express

Este documento proporciona un resumen detallado de las funcionalidades, arquitectura y endpoints (rutas) del proyecto backend de comercio electrónico (E-commerce) desarrollado en Node.js con Express y MongoDB.

## 1. Descripción General del Proyecto

El proyecto consiste en una API RESTful que permite administrar una plataforma de e-commerce basándose en una arquitectura **MVC** (Models, Views/Routes, Controllers) subdividida por responsabilidades (añadiendo capas de *Services* y *Middlewares*).
El sistema gestiona:
- **Usuarios (Users)**: Autenticación, validación de credenciales mediante login y manejo de cuentas.
- **Productos (Products)**: Inventario de artículos, precios, cálculo de márgenes y categorización.
- **Categorías (Categories)**: Clasificación de productos en la tienda.
- **Compras (Purchases)**: Registro de transacciones de comercio (órdenes de compra realizadas por los usuarios).

## 2. Tecnologías y Dependencias

Las principales bibliotecas y frameworks utilizados en el proyecto (según definido en `package.json`):

- **Express.js (`express`)**: Framework core del servidor HTTP y enrutamiento.
- **Mongoose (`mongoose`)**: ODM para interactuar, modelar y validar esquemas de datos en MongoDB.
- **Bcrypt (`bcrypt`)**: Herramienta utilizada para el hashing (encriptación) de contraseñas de manera segura antes de guardarlas en la base de datos (se aplica automáticamente mediante un hook `pre("save")` en el modelo).
- **JSON Web Token (`jsonwebtoken`)**: Generación y comprobación de tokens para autorizaciones seguras y enrutamiento basado en roles o sesión.
- **Express Session (`express-session`)**: Middleware auxiliar implementado para un rudimentario manejo de sesiones temporales.
- **Dotenv (`dotenv`)**: Para la gestión de variables de entorno (como `PORT`, `SECRET`, base de datos).
- **Firebase (`firebase`)**: Aparentemente contemplado para integración (probablemente subida y guardado de imágenes/storage o autenticación de terceros).
- **Módulo ES (`type: "module"`)**: El proyecto utiliza la sintaxis moderna de "Imports/Exports" de ES6 en todos los componentes en lugar de CommonJS (`require`).

## 3. Arquitectura y Estructura de Directorios

El código principal reside íntegramente en la carpeta central `src/`, asegurando una separación estructural limpia:

- **/config**: Archivos de configuración general y de conexión a la base de datos (`db.js`, `config.js`).
- **/controllers**: Centralizan y definen la lógica que atiende el tráfico entre el "Req" (Petición) y el "Res" (Respuesta HTTP). Reciben los datos crudos desde la vista (router) y delegan su ejecución o manipulación a los servicios (`productController.js`, `userController.js`, etc.).
- **/services**: Capa intermedia con la lógica de negocios y la interacción directa con los Modelos (Base de Datos). Reduce la carga funcional en el rest del controlador, garantizando su aislamiento.
- **/models**: Esquemas de persistencia a MongoDB construidos usando mongoose.Schema (`userModel.js`, `productModel.js`, `categoryModel.js`). Imprimen validaciones de los datos bastante robustas (RegEx, Enums, longitudes minimas/maximas).
- **/routes**: Definición pura de los paths expuestos al exterior, mapeando URLs con métodos HTTP (CRUD) hacia los controladores (`userRoute.js`, etc.).
- **/middlewares**: Funciones que toman, leen y reaccionan de manera precoz a la petición web antes de llegar al controlador y si fallaran se interrumpe y aborta dicho request. P. ej. `verifyTokenMiddleware.js` valora la autenticidad usando *Bearer tokens* provistos en el Header de Autorización.
- **/utils**: Herramientas globales de infraestructura (Manejo de Errores centralizado, validadores de seguridad y string formatting, etc.).

## 4. Funcionalidades Transversales y Reglas de Negocio

- **Manejo Dinámico de Precios para Inventarios**:
  - Cuenta con un precio principal (`price`) y una tasa de ganancia (`profitRate`, estándar en 1.21 o 21%).
  - Posee un dato "Virtual" dinámico (que los clientes verán pero MongoDb no almacena ni redunda inútilmente): el `finalPrice`. Mongoose lo calcula "al vuelo" multiplicando el precio base por la tasa de ganancia.
- **Control Restrictivo y Validaciones de Seguridad**:
  - Exige contraseñas robustas verificadas con Regex desde el utils validator (rango 6-12 de caracteres, incluye mayúsculas, minúsculas y números).
  - Categorías y Productos bloquean la duplicación de nombres mediante `unique: true` y limpian los textos con `trim` automáticamente.
- **Manejo de Errores Estandarizado**:
  - Toda acción "peligrosa" o asíncrona esta rodeada de un bloque `Try-Catch` derivando la respuesta `res` al helper genérico `handleError` para proporcionar una API resiliente.
- **Rastreo Temporal Automático**:
  - Absolutamente todos los Modelos tienen configurados `{timestamps: true}` dejando evidencia de momento de registro del dato  (createdAt) y la última vez que fueron alterados (updatedAt).

## 5. Documentación de Endpoints (Rutas)

La ruta base del servicio API se encuentra bajo el prefijo `/api` integrado directamente en el archivo `index.js`. Todo el sistema de URLs asume como base inicial `http://<host>:<port>/api/`.

### 🧍 Usuarios (`/api/user`)

Gestiones de Identity Manager: Perfil, alta, validación (login) y modificación segura.

| Método HTTP | Endpoint       | Descripción | Middlewares / Seguridad |
|-------------|----------------|-------------|-------------------------|
| `POST`      | `/`            | Crea y registra a un nuevo usuario aplicando las políticas seguras a su nueva clave. | Acceso Público |
| `POST`      | `/login`       | Validación de credenciales de un contribuyente/cliente registrado. En éxito devuelve un Token JWT validable en la app con firma digital. | Acceso Público |
| `GET`       | `/`            | Obtiene y lista todos los usuarios. | Acceso Público |
| `PATCH`     | `/:id`         | Actualiza parcialmente la data estructural (dirección, nombre de algún ID). | **Requiere:** `verifyTokenMiddleware` (Token válido provisto mediante "Bearer") |
| `DELETE`    | `/:id`         | Da de baja y destruye a un usuario filtrado por su ID. | **Requiere:** `verifyTokenMiddleware` (Token válido provisto mediante "Bearer") |

---

### 📦 Productos (`/api/product`)

ABM (Alta, Baja, Modificación) del stock principal de artículos.

| Método HTTP | Endpoint       | Descripción | Middlewares / Seguridad |
|-------------|----------------|-------------|-------------------------|
| `POST`      | `/`            | Agrega un nuevo producto a la base de datos asignándole sus especificaciones. | Acceso Público |
| `GET`       | `/`            | Retorna la galería, catálogo o inventario total. Pudiendo devolver la respuesta con los campos extendidos. | Acceso Público |
| `PATCH`     | `/:id`         | Actualiza y re-calcula las especificaciones parciales un producto alojado. | Acceso Público |
| `PUT`       | `/:id`         | Reemplaza completamente todos los valores o especificaciones de un producto. | Acceso Público |
| `DELETE`    | `/:id`         | Elimina física y permanentemente un producto. | Acceso Público |

---

### 🗂 Categorías (`/api/category`)

Clasificación de productos (EJ: Electrodomésticos, Bazar, Tecnología y Audio, etc).

| Método HTTP | Endpoint       | Descripción | Middlewares / Seguridad |
|-------------|----------------|-------------|-------------------------|
| `POST`      | `/`            | Permite añadir/inaugurar nuevas vías de categorías para indexar productos similares. | Acceso Público |
| `GET`       | `/`            | Lista todas las categorías en registro (Muy útil pre-renderizar los "Selects" del lado del cliente). | Acceso Público |
| `PATCH`     | `/:id`         | Re-titula (Renombra) a gusto una categoría identificada por su ID. | Acceso Público |
| `DELETE`    | `/:id`         | Borra y deshabilita una categoría por su ID. | Acceso Público |

---

### 🛒 Compras / Órdenes (`/api/purchase`)

Gestión y traacking de ordenes completadas o carritos liquidados (A facturación final).

| Método HTTP | Endpoint       | Descripción | Middlewares / Seguridad |
|-------------|----------------|-------------|-------------------------|
| `POST`      | `/`            | Toma una carga en el "Body" emulando el momento final de "Checkout" creando y registrando una nueva factura/compra en crudo. | Acceso Público |
| `GET`       | `/`            | Panel general para un admin: Devuelve el historial total de las compras emitidas en el servidor. | Acceso Público |
| `GET`       | `/user/:id`    | Genera o lee el reporte específico enfocado a todas las compras realizadas e hiladas por un único usuario (útil para la página de "Mi Histórico de Facturación"). | Acceso Público |
| `GET`       | `/:id`         | Trae todo el detalle y breakdown de los productos para una única compra especifica en concreto que comparte un mismo Identificador (Recibo Digital). | Acceso Público |
