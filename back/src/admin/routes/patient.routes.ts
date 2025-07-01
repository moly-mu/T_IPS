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

const router = Router();

router.get("/", getAllPacientes);
router.get("/:id", getPacienteById);
router.get("/:id/rating", getPacienteRating);
router.post("/", createPaciente);
router.put("/:id", updatePaciente);
router.delete("/:id", deletePaciente);

export default router;
