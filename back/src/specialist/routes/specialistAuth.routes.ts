import { Router } from "express";
import { loginSpecialist } from "../controllers/auth/loginSpecialist.controller";

const router = Router();

router.post("/login",loginSpecialist);

export default router;