// src/admin/specialties/routes/specialty.routes.ts

import { Router } from "express";
import { ListAllSpecialtiesController } from "../controllers/listSpecialties.controller"

const router = Router();

router.get('/', ListAllSpecialtiesController);

export default router;