import express from "express";
import cors from "cors";
import { PORT, SECRET } from "./src/config/config.js";
import { connectDB } from "./src/config/db.js";
import productRoute from "./src/routes/productRoute.js";
import categoryRoute from "./src/routes/categoryRoute.js";
import userRoute from "./src/routes/userRoute.js";
import purchaseRoute from "./src/routes/purchaseRoute.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger.js";


const app = express();

if (process.env.NODE_ENV === "development") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

// Habilitar CORS para permitir peticiones desde el frontend (Vite) de forma segura
app.use(
  cors({
    origin: "*", // Puerto en el que corre React
    credentials: true, // Permite envío de cookies/headers de sesión autorizada
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Si el ambiente de desarrollo es distinto de test, entonces corremos la base de datos
// de lo contrario, si es test, no corre la base de datos. Esto es porque la db corre en memoria.
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

// Rutas
// Agrupador de rutas de productos
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/user", userRoute);
app.use("/api/purchase", purchaseRoute);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}

export default app;
