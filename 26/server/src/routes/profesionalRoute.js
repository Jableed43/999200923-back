import express from 'express';
import { upload } from '../config/multer.js';
import { 
    handleCreateProfesional, 
    handleGetProfesionales, 
    handleGetProfesionalDetail, 
    handleUpdateDisponibilidad,
    handleUpdateProfesional
} from '../controllers/profesionalController.js';

import { verifyToken, checkRole } from '../middlewares/authMiddleware.js';

const profesionalRoute = express.Router();

profesionalRoute.post("/", verifyToken, checkRole(['administrativo']), upload.single('imagen'), handleCreateProfesional);
profesionalRoute.get("/", handleGetProfesionales);
profesionalRoute.get("/:id", handleGetProfesionalDetail);
profesionalRoute.put("/:id", verifyToken, checkRole(['administrativo']), upload.single('imagen'), handleUpdateProfesional);
profesionalRoute.patch("/:id/disponibilidad", verifyToken, checkRole(['administrativo']), handleUpdateDisponibilidad);

export default profesionalRoute;
