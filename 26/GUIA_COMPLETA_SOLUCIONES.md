# Guía Maestra de Desarrollo: Backend, Docker y Buenas Prácticas

Esta guía resume las soluciones y aprendizajes clave aplicados en este proyecto. Está diseñada para ayudar a estudiantes a comprender no solo el *cómo*, sino también el *por qué* de cada decisión técnica.

---

## 1. Depuración y Aseguramiento de Calidad (Testing)

En un entorno backend real, los tests automatizados son la única garantía de que los cambios no rompan funcionalidades existentes.

### Lecciones Aprendidas:
*   **Errores de Sintaxis**: Un simple `;` o `}` faltante puede detener todo el suite de pruebas. Siempre revisa los logs de error de Jest.
*   **El Proceso de Registro (Hashing)**: Al probar rutas protegidas, no basta con insertar un usuario en la DB manualmente. Debe pasar por el proceso de **hashing de contraseñas** (Bcrypt) para que el Login funcione durante los tests.
*   **Encabezados de Autorización**: Si una ruta devuelve `403 Forbidden`, lo más probable es que falte el header `.set('Authorization', 'Bearer token')` en la petición del test.

---

## 2. Docker: De Contenedores Sueltos a Orquestación

Docker no es solo para "empaquetar", es para crear ecosistemas completos que funcionen en cualquier PC.

### Conceptos Clave:
*   **Docker Compose vs. Build**: No hagas `docker build` de cada cosa. Usa `docker-compose up --build`. Esto levanta la API, la DB y crea las redes internas automáticamente.
*   **Mapeo de Puertos (Externo vs. Interno)**: 
    *   Si tu PC ya tiene un MongoDB instalado en el puerto `27017`, tu contenedor de Docker chocará con él.
    *   **Solución**: Usamos `"27018:27017"`. Esto significa que desde tu PC (Compass) entras por el `27018`, pero los contenedores adentro se siguen hablando por el `27017`.
*   **Redes Internas**: La API se conecta a la base de datos usando el nombre del servicio (ej: `mongodb://database:27017`) en lugar de `localhost`.

---

## 3. Gestión de Datos: Seeders y Migraciones

Un sistema profesional debe ser reproducible. "En mi máquina funciona" no es una opción.

### Alternativas de Precarga:
1.  **Script Seeder (Node.js)**: Creamos un script que usa tus modelos de Mongoose. Es la mejor opción porque garantiza que los datos respeten todas tus reglas de negocio (como el hasheo de claves).
    *   *Comando:* `npm run seed`
2.  **Migración por Puente (Docker Bridge)**: Si tienes datos en una base local antigua y quieres pasarlos a Docker sin instalar herramientas en Windows:
    *   Usamos una imagen temporal de Mongo para extraer datos de Windows y enviarlos al contenedor en un solo flujo de datos (pipeline).

---

## 4. El Problema de las Fechas (Timezones UTC vs. Local)

Este es uno de los bugs más comunes en el desarrollo web.

*   **El Problema**: Las bases de datos suelen guardar las fechas en **UTC (00:00:00)**. En países como Argentina (UTC-3), el navegador convierte ese "Día 30 a las 00:00" en "Día 29 a las 21:00".
*   **La Solución**: Creamos una utilidad unificada `safeParseDate.js`. Esta función detecta el desfase horario del usuario y lo compensa antes de mostrarlo, asegurando que el día calendario sea siempre el mismo que se guardó.

---

## 5. Distribución y Colaboración (Docker Hub)

Una vez que tu sistema funciona, ¿cómo se lo das a un tercero?

### Flujo de Trabajo:
1.  **Taggear**: Le pones un nombre con tu usuario (`javiernehuen/26-api:v1`).
2.  **Push**: La subes a la nube.
3.  **Pull**: Un compañero solo necesita el archivo `docker-compose.yml` apuntando a tu imagen. No necesita descargar todo tu código fuente para ver la aplicación funcionando.

---

### Machete de Comandos Rápidos:

*   **Levantar proyecto:** `docker-compose up -d --build`
*   **Ver logs de la API:** `docker logs -f seprise_api`
*   **Cargar datos de prueba:** `npm run seed` (dentro de carpeta server)
*   **Correr tests:** `npm test`

---
**Consejo Final**: La clave de un buen desarrollador no es memorizar comandos, sino entender el flujo de datos: ¿Por dónde entra la petición? ¿Dónde se guarda? ¿Cómo se transforma?
