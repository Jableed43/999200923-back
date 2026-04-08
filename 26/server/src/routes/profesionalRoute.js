import express from 'express';
import { 
    handleCreateProfesional, 
    handleGetProfesionales, 
    handleGetProfesionalDetail, 
    handleUpdateDisponibilidad 
} from '../controllers/profesionalController.js';

const profesionalRoute = express.Router();

profesionalRoute.post("/", handleCreateProfesional);
profesionalRoute.get("/", handleGetProfesionales);
profesionalRoute.get("/:id", handleGetProfesionalDetail);
profesionalRoute.patch("/:id/disponibilidad", handleUpdateDisponibilidad);

export default profesionalRoute;
