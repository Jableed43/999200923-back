import express from 'express';
import { 
    handleCreatePaciente, 
    handleGetPaciente, 
    handleGetPacientes,
    handleAddHistoria 
} from '../controllers/pacienteController.js';

const pacienteRoute = express.Router();

pacienteRoute.post("/", handleCreatePaciente);
pacienteRoute.get("/", handleGetPacientes);
pacienteRoute.get("/:id", handleGetPaciente);
pacienteRoute.post("/:id/historia", handleAddHistoria);

export default pacienteRoute;
