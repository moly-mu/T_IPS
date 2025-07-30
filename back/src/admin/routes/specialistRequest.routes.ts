// src/admin/routes/specialistRequest.routes.ts

import { Router } from "express";
import { getAllSpecialistRequests } from "../controller/specialistRequest.controller";
import { updateSpecialistRequestStatus } from "../controller/specialistRequest.controller";

const router = Router();

router.get("/", getAllSpecialistRequests);
router.put("/:id", updateSpecialistRequestStatus);

export default router;