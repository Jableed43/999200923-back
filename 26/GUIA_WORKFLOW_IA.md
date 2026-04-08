# 🗺️ Guía de Workflow: Construyendo con IA de 0 a 100

Este es el plan de trabajo "infalible" para desarrollar cualquier mini-producto en 3 horas. Úsalo como guía para promptear de forma ordenada y evitar el "caos de bugs".

---

## 🏁 Fase 0: El Mindset (15 min)
*Antes de escribir código, definimos las reglas de juego.*
- **Prompt Inicial:** "IA, actúa como un Senior Fullstack Developer. Vamos a construir [PRODUCTO]. Nuestro stack es Node.js/Express en el backend y HTML/CSS/JS vainilla en el frontend. ¿Entiendes el rol?"
- **Resultado:** La IA confirma el stack y se prepara para darnos código compatible con lo que sabemos.

## 🏗️ Fase 1: Arquitectura y Especificación (30 min)
*Le pedimos a la IA que sea nuestro arquitecto.*
1. **Prompt de Estructura:** "Propón la estructura de carpetas para este proyecto siguiendo el patrón MVC simplificado."
2. **Prompt de Modelos:** "Define qué campos de datos vamos a necesitar y cómo se verían en un JSON."
3. **Checkpoint:** Crear manualmente las carpetas que la IA sugirió.

## 🦴 Fase 2: El Esqueleto (The Foundation) (45 min)
*Generamos la base funcional.*
1. **Prompt de Boilerplate:** "Dame el código del `package.json` con las dependencias necesarias y el archivo `index.js` inicial que levante un servidor básico."
2. **Prompt de Endpoints:** "Crea una ruta GET para probar el servidor y una ruta POST vacía donde irá nuestra lógica principal."
3. **Checkpoint:** `npm install` y verificar que el servidor corre (`npm run dev`).

## 🧠 Fase 3: La Lógica Core (Iterativa) (60 min)
*Aquí ocurre el "milagro" del producto.*
1. **Prompt de Lógica:** "Escribe la función del controlador que se encargue de [LÓGICA PRINCIPAL DEL PRODUCTO]."
2. **Ciclo de Refinamiento:** Si el código es muy largo, pídelo por partes: "Primero la validación, luego el procesamiento."
3. **Debug en vivo:** Si hay un error, copia el error de la terminal y dile: *"Me sale este error, ¿qué parte del código debo corregir?"*.

## 🎨 Fase 4: Frontend y Estética (30 min)
*Hacemos que el producto se vea "Premium".*
1. **Prompt de UI:** "Genera un HTML moderno y un archivo CSS con estética Dark Mode, usando Flexbox/Grid. Que sea totalmente responsive."
2. **Micro-interacciones:** "Agrega una transición suave (hover) a los botones y un spinner de carga."

---

## 🛠️ Tips de Oro para Promptear en Clase:

1. **"Dámelo paso a paso"**: Nunca pidas todo el proyecto de golpe. La IA suele cometer más errores en respuestas largas.
2. **"Explícame el porqué"**: Pide siempre: *"Dáme el código y comenta las 3 líneas más críticas para que yo se las explique a mis alumnos"*. 
3. **Variables de Entorno**: No dejes que la IA te ponga claves harcodeadas. Dile: *"Usa variables de entorno para las configuraciones sensibles"*.
4. **El "Freno de Mano"**: Si el código que te da la IA parece demasiado complejo para el nivel de la clase, dile: *"Simplifica el código anterior para que sea fácil de explicar a principiantes"*.
