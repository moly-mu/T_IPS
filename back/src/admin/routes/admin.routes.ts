// src/admin/routes/admin.routes.ts
import { Router } from "express";
import {
  createSpecialty,
  getSpecialties,
  getSpecialtyById,
  updateSpecialty,
  deleteSpecialty,
  checkSpecialtyByName,
} from "../controller/admin.controller";

const router = Router();

router.post("/specialty", createSpecialty); // Crear especialidad
router.get("/specialty", getSpecialties); // Obtener especialidades
router.get("/specialty/check", checkSpecialtyByName); // Obtener especialidades por nombre
router.get("/specialty/:id", getSpecialtyById); // Obtener especialidades por ID
router.put("/specialty/:id", updateSpecialty); // Actualizar una especialidad
router.delete("/specialty/:id", deleteSpecialty); // Eliminar una especialidad

export default router;

