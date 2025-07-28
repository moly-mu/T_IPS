import { Router } from "express";
import { loginSpecialistController } from "../controllers/auth/loginSpecialist.controller";

const router = Router();

router.post("/login", loginSpecialistController);

export default router;