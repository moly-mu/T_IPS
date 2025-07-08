// src/routes/admin/patient.routes.ts
import { Router } from "express";
import {
  getAllPacientes,
  getPacienteById,
  getPacienteRating,
  createPaciente,
  updatePaciente,
  deletePaciente,
} from "../controller/patient.controller";

import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

// Aplica el middleware a todas las rutas
// router.use(verifyToken)

router.get("/", getAllPacientes);
router.get("/:id", getPacienteById);
router.get("/:id/rating", getPacienteRating);
router.post("/", createPaciente);
router.put("/:id", updatePaciente);
router.delete("/:id", deletePaciente);

export default router;
