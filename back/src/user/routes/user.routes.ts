import {registerUser} from "../controllers/auth.Register.controller";
import {loginUser} from "../controllers/auth.Login.controller";
import express from "express";

const router = express.Router();

// *Rutas de registrarse y de iniciar sesión del usuario
router.post("/register", registerUser);
router.post("/login", loginUser);


export default router;
