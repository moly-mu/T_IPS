// src/admin/specialties/routes/specialty.routes.ts

import { Router } from "express";
import { getAllSpecialtiesController } from "../controllers/listSpecialties.controller"

const router = Router();

router.get('/', getAllSpecialtiesController);

export default router;