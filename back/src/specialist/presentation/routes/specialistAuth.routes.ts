import { Router } from "express";
import { loginSpecialistController } from "../controllers/auth/loginSpecialist.controller";
import { registerUser } from "../controllers/auth/registerSpecialist.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginSpecialistController);

export default router;