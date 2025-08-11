import { Router } from "express";
import { loginAdmin, verifyToken } from "../controller/login.controller";
import { verifyToken as authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Ruta para login (no requiere autenticación)
router.post("/login", loginAdmin);

// Ruta para verificar token (requiere autenticación)
router.get("/verify", authMiddleware, verifyToken);

export default router;
