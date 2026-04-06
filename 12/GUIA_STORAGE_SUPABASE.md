# Guía Maestra: Integración de Supabase Storage y Multer (Subida de Imágenes)

Esta guía detalla los pasos para integrar la subida de imágenes en tu API utilizando **Multer** para el manejo de archivos en Node.js y **Supabase Storage** para el almacenamiento en la nube.

---

## 1. Configuración de Supabase (Dashboard)

1.  **Crear Proyecto**: Regístrate en [Supabase](https://supabase.com/) y crea un "New Project".
2.  **Organización**: Ponle nombre, selecciona tipo **Personal**, plan **Free** y región **Americas**.
3.  **Seguridad**: Asegúrate de tener activado **Enable Data API**.
4.  **Ubicar Credenciales**:
    *   Ve a **Project Settings** -> **Integrations** -> **Data API**.
    *   Copia la **API URL** (será tu `SUPABASE_URL`).
    *   Ve a **Project Settings** -> **API keys**.
    *   **IMPORTANTE**: Copia la **service_role key** (clave secreta) para el backend.
5.  **Crear el Bucket**:
    *   Ve al menú **Storage** lateral.
    *   Crea un nuevo **Bucket** llamado `imagenes`.
    *   **¡CLAVE!**: Activa la opción **Public bucket** para que las imágenes se vean en el navegador directamente.

---

## 2. Configuración del Servidor (Backend)

### Instalación de Dependencias
```bash
npm install @supabase/supabase-js multer jsonwebtoken
```

### Variables de Entorno (`.env`)
```env
SUPABASE_URL=https://xyz.supabase.co
SUPABASE_KEY=tu_service_role_key_secreta
```

---

## 3. Lógica de Almacenamiento

### Conexión (`src/config/supabase.js`)
```javascript
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from "./config.js";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
```

### Middleware de Multer (`src/middlewares/multerMiddleware.js`)
```javascript
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

export default upload;
```

---

## 4. El "Otro Lado" (Frontend): ¿Cómo enviamos la imagen?

Para enviar una imagen desde React al backend, no podemos enviar un objeto JSON tradicional. Debemos usar la API nativa de **`FormData`**.

### El Input de Archivo
En tu formulario, necesitas un input especial. No uses `value`, usa `onChange`.
```jsx
<input 
  type="file" 
  accept="image/*" 
  onChange={(e) => setImage(e.target.files[0])} 
/>
```

### Preparando el Envío (El Hook)
Debes "empaquetar" todos tus datos (textos y archivos) en el contenedor `FormData`.

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  
  // 1. Creamos el contenedor
  const data = new FormData();
  
  // 2. Agregamos los campos de texto
  data.append('name', 'Producto de Ejemplo');
  data.append('price', 1500);
  
  // 3. ¡Agregamos el archivo! 
  // El nombre 'image' debe coincidir con upload.single('image') del backend
  if (imageFile) {
    data.append('image', imageFile);
  }

  // 4. Enviamos el 'data' directamente al fetch (sin JSON.stringify)
  onSubmit(data);
};
```

### El Gran Secreto: ¡Sin Content-Type!
Cuando usas `FormData`, **NUNCA** debes ponerle el header `'Content-Type': 'application/json'` a tu petición `fetch`.

*   **¿Por qué?**: El navegador necesita generar un código de seguridad único (*boundary*) para separar los textos de la imagen binaria. Si tú fuerzas el Content-Type a JSON, el backend no podrá interpretar la imagen.

---

## 5. Integración en Rutas y Controladores

### Las Rutas (`src/routes/productRoute.js`)
```javascript
import upload from '../middlewares/multerMiddleware.js';
router.post("/", upload.single('image'), createProduct);
```

### El Controlador Robusto (`src/controllers/productController.js`)
```javascript
export const createProduct = async (req, res) => {
    try {
        let productData = { ...(req.body || {}) };

        if (req.file) {
            const imageUrl = await uploadImageToSupabase(req.file, "imagenes");
            productData.image = imageUrl;
        }

        const savedProduct = await createProductService(productData);
        res.status(201).json(savedProduct);
    } catch (error) {
        handleError(error, res);
    }
};
```

---

## 6. Resolución de Problemas (Troubleshooting)

1.  **req.body vacío**: Si `req.body` llega vacío, revisa que no estés enviando el header `application/json` desde el frontend.
2.  **req.file is undefined**: Revisa que el nombre en `data.append('image', ...)` sea igual al de `upload.single('image')`.
3.  **Error de comparación de IDs**: Siempre usa `String(id1) === String(id2)` al validar dueños de perfil.
4.  **JWT desactualizado**: Asegúrate de guardar el nuevo token que devuelve el backend tras actualizar el perfil para que el avatar cambie en el header.

---
> [!IMPORTANT]
> **CONSEJO PARA VERCEL**: Si usas Multer, pon siempre los campos de texto del formulario **ANTES** que el archivo en tu código de Frontend (`data.append`). Esto asegura una lectura correcta de los datos.
