import {registerUser} from "../controllers/auth.Register.controller";
import {loginUser} from "../controllers/auth.Login.controller";
import {requestSpecialist} from "../controllers/Specialist.Request.controller";
import { validateToken } from "../middleware/authMiddleware";
import express from "express";

const router = express.Router();
// *Rutas de registrarse y de iniciar sesión del usuario
router.post("/register", registerUser);
router.post("/login", loginUser);

// *Ruta usuario para solicitar ser especialista
router.post("/request-specialist", validateToken, requestSpecialist);

export default router;