import express from "express";
import { auth } from "../middleware/auth.js";
import {createDepartamento, getAllDepartamentos, getDepartamentoByName, putDepartamentoById, deletDepartamentoById} from "../controllers/departamentos.controller.js";
import { upload } from '../config/multer.js';

// 2. configurar el router
export const departamentoRouter = express.Router();

// 3. definir las rutas
departamentoRouter.post("/crear",auth("admin"), upload.single("bandera"),createDepartamento);
departamentoRouter.get("/mostrar", getAllDepartamentos);
departamentoRouter.get("/mostrar/:name", getDepartamentoByName);
departamentoRouter.put("/actualizar/:id",auth("admin"), upload.single("bandera"),putDepartamentoById);
departamentoRouter.delete("/eliminar/:id",auth("admin"), deletDepartamentoById);

