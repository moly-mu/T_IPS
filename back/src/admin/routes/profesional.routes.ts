import { Router } from "express";
import {
  getAllProfessionals,
  getProfessionalById,
  getProfessionalsBySpecialty,
  getProfessionalRating,
  updateProfessionalStatus,
  deleteProfessional
} from "../controller/profesional.controller";

const router = Router();

// Rutas específicas primero
router.get("/especialidad/:specialtyId", getProfessionalsBySpecialty);
router.get("/:id/rating", getProfessionalRating);

// Rutas generales
router.get("/", getAllProfessionals);
router.get("/:id", getProfessionalById);

router.put("/:id/status", updateProfessionalStatus);
router.delete("/:id", deleteProfessional);

export default router;
