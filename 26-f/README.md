# Sistema de Turnos - Frontend

Frontend del proyecto de Sistema de Turnos con React y Vite.

## Tecnologías utilizadas
- React 19
- Vite
- React Router Dom
- Axios
- Bootstrap 5
- Material UI
- SweetAlert2
- date-fns
- react-easy-crop

## Funcionalidades implementadas
- Autenticación de pacientes
- Registro de pacientes
- Visualización de profesionales
- Reserva de turnos
- Gestión de turnos para paciente y profesional
- Protected routes con token JWT
- Subida de imágenes de profesionales
- Consumo de API REST

## Estructura de carpetas
- `src/`
  - `App.jsx` - componente principal
  - `main.jsx` - entrada de la aplicación
  - `components/` - componentes reutilizables
  - `pages/` - vistas principales de la aplicación
  - `services/` - configuración de Axios y llamadas al backend
  - `hooks/` - hooks personalizados
  - `context/` - contexto de autenticación
  - `assets/` - imágenes y recursos estáticos
  - `styles/` - estilos globales y componentes
  - `utils/` - utilidades auxiliares

## Configuración
El frontend consume la API desde:

```js
http://localhost:3000/api
```

Este valor está configurado en `src/services/api.js`.

## Instrucciones para descargar y correr
1. Abrir la carpeta `26-f`.
2. Instalar dependencias:

```bash
npm install
```

3. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

4. Abrir el navegador en la URL indicada por Vite, normalmente:

```text
http://localhost:5173
```

## Build y preview
- Generar build de producción:

```bash
npm run build
```

- Probar la versión de producción localmente:

```bash
npm run preview
```
