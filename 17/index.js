import express from "express"
import { MONGODB_URI, PORT, SECRET } from "./src/config/config.js"
import { connectDB } from "./src/config/db.js"
import session from "express-session"
import { fileURLToPath } from 'url'
import path, { dirname } from "path"
import methodOverride from 'method-override'
import {engine} from 'express-handlebars'
import {registerHelpers} from './src/helpers/helpers.js'
import Handlebars from 'handlebars'
import { homeView } from "./src/controllers/generalController.js"
import productRoute from "./src/routes/productRoute.js"
import categoryRoute from "./src/routes/categoryRoute.js"
import userRoute from "./src/routes/userRoute.js"
import MongoStore from 'connect-mongo';

// Nombre y ubicacion de archivo estatico
const __filename = fileURLToPath(import.meta.url)
// Directorio del archivo estatico
const __dirname = dirname(__filename)

const app = express()
// Sirve para modificar los metodos nativos de los forms (GET POST)
app.use(methodOverride("_method"))

// Configurar handlebars como nuestro template engine
app.engine("handlebars", engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}))
// configurar handlebars como motor de vistas
app.set("view engine", "handlebars")
// carpeta donde guardaremos las vistas
app.set("views", "./src/views")

// registrar helpers
registerHelpers(Handlebars)

app.use(express.json())

app.use(express.urlencoded({extended: true}))
// Paso 1 para habilitar sesion:


app.use(session({
    secret: SECRET,
    resave: false, // Evita que la sesion se vuelva a guardar si no hay datos
    saveUninitialized: false, // Evita que la sesion se guarde si no esta inicializada
    store: MongoStore.create({
        mongoUrl: MONGODB_URI, // O usa tu variable de entorno process.env.MONGO_URI
        ttl: 14 * 24 * 60 * 60, // (Opcional) Tiempo de vida en segundos: 14 días
        autoRemove: 'native' 
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // La cookie durará 24 horas en el navegador
        httpOnly: true, // Seguridad extra: evita acceso desde JS del lado cliente
        secure: false // Cambia a true solo si usas HTTPS
    }
}));

// Sistema de mensajes para leer errores o mensajes
// Este middleware actúa como un preparador automático de datos para tus vistas: toma la información de la sesión (como el usuario logueado o mensajes de aviso) y la inyecta en res.locals, lo que permite que Handlebars la reconozca globalmente sin que tengas que pasarla manualmente en cada ruta. Además, al borrar (delete) los mensajes de la sesión inmediatamente después de asignarlos, implementa un sistema de mensajes flash, asegurando que las notificaciones de éxito o error se muestren una sola vez y desaparezcan al recargar la página.

app.use((req, res, next) => {
    // Solo pasamos los datos del usuario si existen
    res.locals.session = req.session
    res.locals.user = req.session.userId ? {
        id: req.session.userId,
        email: req.session.userEmail,
        token: req.session.token
    } : null;

    // Manejo de mensajes flash
    res.locals.message = req.session.message || null;
    res.locals.success = req.session.success || false;

    // Limpieza de mensajes para que no se repitan al recargar
    delete req.session.message;
    delete req.session.success;
    
    next();
});

app.use(express.static(path.join(__dirname, "src", "public")))

connectDB()

app.use("/product", productRoute)
app.use("/category", categoryRoute)
app.use("/user", userRoute)

app.get("/", homeView)

app.use((req, res) => {
    res.status(404).render("404", {
        title: "Pagina no encontrada",
        message: "La pagina que buscas no existe"
    })
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})