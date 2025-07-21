import { Router } from "express";
import { getDashboardStats } from "../controller/stats.controller";

const router = Router();

router.get("/", getDashboardStats)

export default router;