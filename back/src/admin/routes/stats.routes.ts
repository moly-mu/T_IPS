import { Router } from "express";
import { getDashboardStats, getIncomeBySpecialty } from "../controller/stats.controller";

const router = Router();

router.get("/", getDashboardStats)
router.get("/income", getIncomeBySpecialty);

export default router;