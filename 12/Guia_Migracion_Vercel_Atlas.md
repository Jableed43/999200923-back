# Guía Maestra: Despliegue de Backend (Node/Express + MongoDB Atlas) en Vercel

Esta guía es un resumen de los pasos críticos realizados para migrar un proyecto local de Express a un entorno Serverless en Vercel, solucionando errores comunes de red y arquitectura.

---

## 1. El Problema de Conexión (DNS SRV)
**Error común**: `querySrv ECONNREFUSED`
*   **Por qué ocurre**: El protocolo `mongodb+srv://` (SRV) es bloqueado por muchos ISPs y firewalls. Vercel a veces tiene retardos resolviendo estos registros.
*   **Solución**: Cambiar a la **Standard Connection String** (la versión "larga" que especifica los nodos).
*   **Cómo obtenerla**: En Atlas, elige la versión de driver de Node.js "3.6 or later".
*   **Ejemplo de formato**: 
    `mongodb://user:pass@nodo0:27017,nodo1:27017,nodo2:27017/dbname?ssl=true&replicaSet=atlas-shard-0&authSource=admin`

---

## 2. Arquitectura de Sesiones (Stateless)
**El problema**: Vercel usa Serverless (Lambdas), lo que significa que el servidor se "apaga" cuando no hay tráfico. Las sesiones guardadas en memoria (`MemoryStore` de `express-session`) se pierden.
*   **Sugerencia**: Usar **JWT (Stateless)**. La información del usuario viaja en el Header `Authorization: Bearer <token>`.
*   **Acción**: Si el proyecto tiene `express-session` y ya usa JWT, desactivar/eliminar la sesión para evitar cookies innecesarias y fugas de memoria.

---

## 3. Estructura de Proyecto y Configuración (Vercel)
Vercel necesita que el servidor sea "descubrible". Tienes dos opciones para organizarlo:

### Opción A: Estructura en la Raíz (Uso de `vercel.json`)
Es la que usas si mantienes `index.js` en la carpeta principal. **NO necesitas crear una carpeta `/api`**. Solo necesitas el archivo `vercel.json` en la raíz para redirigir el tráfico:

```json
{
  "version": 2,
  "builds": [{ "src": "index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "index.js" }]
}
```

### Opción B: Estructura "Zero Config" (Carpeta `/api`)
Si mueves tu `index.js` a una carpeta llamada `/api` (es decir, `api/index.js`), Vercel lo detecta automáticamente como una Serverless Function y **no necesitas el archivo `vercel.json`**. 

---

## 4. Configuración del Frontend (React / Vite)
Para que el frontend funcione correctamente en Vercel (evitando errores 404 al refrescar páginas), debes crear un archivo `vercel.json` en la raíz de la carpeta del frontend (`12-f`):

### Archivo `vercel.json` (Frontend)
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 5. Checklist para el Despliegue Final
* [ ] **Whitelist en Atlas**: En "Network Access", agregar la IP `0.0.0.0/0`.
* [ ] **Variables de Entorno (Back)**: Configurar `MONGODB_URI` (la larga) y `SECRET`.
* [ ] **Variables de Entorno (Front)**: Configurar `VITE_BASE_URL` apuntando a la URL del backend.
* [ ] **Framework Preset**: 
    *   Para Backend: **Other** (si usas `vercel.json`).
    *   Para Frontend: **Vite**.

---

### Anexo: Cómo convertir una URI `+srv` a Estándar (DNS Manual)

Si tienes problemas de conexión (errores de DNS como `ECONNREFUSED`), puedes convertir tu URI de MongoDB Atlas manualmente siguiendo estos pasos:

1. **Instrucción para delegar a una IA (Prompt):**
> "Tengo una cadena de conexión `mongodb+srv://...` y tengo problemas de resolución DNS en Vercel. Por favor, realiza una consulta DNS de los registros **SRV** y los registros **TXT** para obtener los hosts y el `replicaSet`. Devuélveme la cadena de conexión expandida en formato `mongodb://user:pass@host1:27017...`."

2. **Ejemplo de Salida Exitosa:**
`mongodb://user:pass@nodo0:27017,nodo1:27017,nodo2:27017/dbname?ssl=true&replicaSet=atlas-shard-0&authSource=admin&retryWrites=true&w=majority`

---

**Nota para la IA**: "Aplica el patrón de despliegue stateless con Standard URI y vercel.json de ruta completa".