import {registerUser} from "../controllers/auth.Register.controller";
import {loginUser} from "../controllers/auth.Login.controller";
import {UserProfile} from "../controllers/auth.UserProfile.controller";
import express from "express";

const router = express.Router();

// *Rutas de registrarse y de iniciar sesión del usuario
router.post("/register", registerUser);
router.post("/login", loginUser);
// *Ruta para obtener el perfil del usuario
router.get("/User/:id", UserProfile);

export default router;
