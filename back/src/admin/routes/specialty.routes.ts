// src/admin/routes/specialty.routes.ts
import { Router } from "express";
import {
  createSpecialty,
  getSpecialties,
  getSpecialtyById,
  updateSpecialty,
  deleteSpecialty,
  checkSpecialtyByName,
} from "../controller/specialty.controller";
import { validateSpecialty } from "../middleware/validateSpecialty";

const router = Router();

router.post("/", validateSpecialty, createSpecialty);        // POST con middleware
router.get("/check", checkSpecialtyByName);                 
router.get("/", getSpecialties);                           
router.get("/:id", getSpecialtyById);                      
router.put("/:id", updateSpecialty);                       
router.delete("/:id", deleteSpecialty);                    

export default router;

