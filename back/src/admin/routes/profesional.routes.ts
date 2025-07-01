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

// ✅ Obtener todos los profesionales (opcional para admin)
router.get("/", getAllProfessionals);

// ✅ Obtener profesionales por ID de especialidad (para mostrar en frontend)
router.get("/especialidad/:specialtyId", getProfessionalsBySpecialty);

// ✅ Obtener un profesional por su ID
router.get("/:id", getProfessionalById);

// ✅ Crear un nuevo profesional
router.post("/", createProfessional);

// ✅ Actualizar el estado del profesional (tabla USER)
router.put("/:id", updateProfessionalStatus);

// ✅ Eliminar un profesional
router.delete("/:id", deleteProfessional);

export default router;
