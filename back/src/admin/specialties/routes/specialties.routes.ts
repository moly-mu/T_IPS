// src/admin/specialties/routes/specialty.routes.ts

import { Router } from "express";
import { getAllSpecialties } from "../controllers/listSpecialties.controller"

const router = Router();

router.get('/', getAllSpecialties);

export default router;