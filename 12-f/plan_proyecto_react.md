# Plan de Desarrollo: React (Vite) + Integración Backend (E-commerce)

Este plan detalla la estructura y requerimientos para crear un Frontend moderno en React (inicializado con Vite) que consuma perfectamente la API de Express (Proyecto 12), así como las modificaciones necesarias del lado del servidor.

## 1. Arquitectura del Frontend (React + Vite)

### 1.1 Configuración Inicial
- **Framework**: Vite con React (`npm create vite@latest . -- --template react`).
- **Enrutamiento**: `react-router-dom` para el manejo de rutas.
- **Estilos**: Modular CSS, CSS-in-JS o Tailwind CSS (a elección, orientado a la eficiencia).
- **Manejo de asincronía**: Fetch API nativo (o Axios) encapsulado en Custom Hooks.

### 1.2 Maquetación y Uso de Layout
- **Container Principal (`src/layout/MainLayout.jsx`)**: 
  - Todo el contenido de la web estará envuelto en este componente.
  - **Header**: Barra de navegación que incluirá acceso rápido al Home, categorías, panel de Login/Registro y el **Icono del Carrito (con badge numérico)**.
  - **Outlet**: El punto central donde `react-router-dom` renderizará el componente de la página actual.
  - **Footer**: Pie de página estático con info predeterminada.
- **Componentes Modulares Reutilizables (`src/components/`)**:
  - `ProductCard.jsx`: Ficha del producto base.
  - `Button.jsx`, `Input.jsx`: Controles de UI consistentes.
  - `Loader.jsx` / `Spinner.jsx`: Feedback visual al cargar peticiones.

### 1.3 Rutas con React Router DOM
**Rutas Estáticas:**
- `/` - **Home**: Muestra productos destacados (`highlighted: true`) o listado general.
- `/products` - **Catálogo**: Lista completa de artículos disponibles y barra de búsqueda.
- `/cart` - **Carrito/Checkout**: Resumen de los productos agregados listos para comprar.
- `/login` & `/register` - **Autenticación**: Vistas de sesión para obtener el `Bearer Token`.

**Rutas Dinámicas:**
- `/product/:id` - **Detalle del Producto**: Ficha completa y visualización individual al hacer clic, con la opción de elegir cantidad y comprar.
- `/category/:categoryId` - **Filtro**: Renderiza los artículos que coinciden con una categoría en particular.

---

## 2. Lógica del Frontend y Custom Hooks

Se crearán **Custom Hooks** que centralizarán la lógica de llamadas HTTP hacia la API, garantizando limpieza en los componentes y un fácil manejo de estados `loading`, `error` y `data`.

### 2.1 Hooks para Productos y Categorías
- `useGetProducts()`: Realiza el `GET /api/product` para listar todo el inventario.
- `useGetProductById(id)`: Llama a un endpoint (a crear en el back si hace falta) para traer los detalles pormenorizados.
- `useGetCategories()`: Consulta el `GET /api/category` para armar los menús de navegación.

### 2.2 Hooks para Autenticación
- `useLogin()`: Maneja `POST /api/user/login`. Recibe y guarda el Token en `sessionStorage` o Cookies.
- `useRegisterUser()`: Para el alta llamando a `POST /api/user/`.

### 2.3 Hooks para Carrito/Compras
- `useCreatePurchase()`: Dispara `POST /api/purchase` enviando la carga del carrito al servidor usando el `Bearer Token` autorizado del usuario activo.

### 2.4 Estado Global del Carrito (Context API / Zustand)
- Es imperativo un estado global capaz de ser leído desde el botón flotante del header y modificado desde `ProductCard`.
- **Estructura base del Carrito**:
  - Estado: `cartItems` = Array de `{product, quantity}`.
  - Funciones: `addToCart(item)`, `removeFromCart(id)`, `updateQuantity(id, mount)`, `clearCart()`.
- **Persistencia**: Efecto (useEffect) para guardar y leer los datos no finalizados del carrito contra `sessionStorage`.

---

## 3. Modificaciones en el Backend (Carpeta 12)

Para poder integrar el esquema del carrito del Frontend a la perfección, debemos hacer ajustes en el back:

### 3.1 Modelo de Compra (`purchaseModel.js`)
- Asegurarse de que el esquema contemple agrupar varios productos. Ejemplo de estructura a recibir:
  ```javascript
  items: [{ 
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' }, 
    quantity: Number,
    priceAtPurchase: Number // Para congelar el precio pagado
  }],
  totalAmount: Number
  ```

### 3.2 Lógica en el Servicio de Compra (`purchaseService.js`)
Cuando llega un `POST /api/purchase`:
1. El Controller lo delega al servicio y este recibe el `Array` de productos escogidos.
2. **Validación de Stock**: Se cruzan los montos pedidos con el campo `quantity` actual del modelo `productModel.js`. Si uno está agotado o es insuficiente, la API detendrá el proceso (`throw Error` -> 400 Bad Request) alertando al Frontend.
3. **Restar Stock Automáticamente**: Al guardar fehacientemente la compra, el código ejecutara de manera asincrónica un update sobre los productos:
   Por cada artículo comprado se despacha al modelo un decaimiento del stock:
   ```javascript
   await productModel.updateOne(
     { _id: item.productId }, 
     { $inc: { quantity: -item.quantity } }
   );
   ```

### 3.3 Endpoint para Obtener Producto Individual (Opcional si no existe)
- En `productRoute.js` definir un `GET /:id` y enlazarlo con su Controlador/Servicio asociado (mediante un `findById()`) para poder respaldar correctamente la **Ruta Dinámica** de React `(/product/:id)`.
