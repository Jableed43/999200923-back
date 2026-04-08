import express from 'express';
import { 
    handleCreateAdministrativo, 
    handleGetAdministrativos 
} from '../controllers/administrativoController.js';

const administrativoRoute = express.Router();

administrativoRoute.post("/", handleCreateAdministrativo);
administrativoRoute.get("/", handleGetAdministrativos);

export default administrativoRoute;
