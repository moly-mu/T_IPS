import { Router } from "express";
import {
	getAllProfessionals,
	getProfessionalById,
	getProfessionalsBySpecialty,
	createProfessional,
	updateProfessionalStatus,
	deleteProfessional,
	getProfessionalRating,
} from "../controller/profesional.controller";

const router = Router();

// Rutas específicas primero
router.get("/especialidad/:specialtyId", getProfessionalsBySpecialty);
router.get("/:id/rating", getProfessionalRating);

// Rutas generales
router.get("/", getAllProfessionals);
router.get("/:id", getProfessionalById);

router.post("/", createProfessional);
router.put("/:id", updateProfessionalStatus);
router.delete("/:id", deleteProfessional);

export default router;
