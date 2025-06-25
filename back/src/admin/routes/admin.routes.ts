// src/admin/routes/admin.routes.ts
import { Router } from "express";
import {
  createSpecialty,
  getSpecialties,
  getSpecialtyById,
  updateSpecialty,
  deleteSpecialty
} from "../controller/admin.controller";
 // 👈 Importa todo como objeto

const router = Router();

router.post("/specialty", createSpecialty);
router.get("/specialty", getSpecialties);
router.get("/specialty/:id", getSpecialtyById);
router.put("/specialty/:id", updateSpecialty);
router.delete("/specialty/:id", deleteSpecialty);

export default router;

