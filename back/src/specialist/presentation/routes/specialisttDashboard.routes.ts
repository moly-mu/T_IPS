import { Router } from "express";
import { getDashboardMetrics } from "../controllers/dashboard/dashboard.controller";
import { validateToken } from "../../middleware/authMiddleware";

const router = Router();

router.get("/metricas",validateToken, getDashboardMetrics);

export default router;