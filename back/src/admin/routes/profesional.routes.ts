import { Router } from "express";
import {
  getAllProfessionals,
  getProfessionalById,
  getProfessionalsBySpecialty,
  createProfessional,
  updateProfessionalStatus,
  deleteProfessional,
} from "../controller/profesional.controller";

const router = Router();


router.get("/especialidad/:specialtyId", getProfessionalsBySpecialty); // Obtener por ID de especialidad
router.get("/", getAllProfessionals); // Obtener todos los profesionales
router.post("/", createProfessional); // Crear un profesional
router.put("/:id", updateProfessionalStatus); // Actualizar estado
router.delete("/:id", deleteProfessional); // Eliminar profesional


router.get("/:id", getProfessionalById); // Obtener por ID

export default router;
