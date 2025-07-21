import {registerUser} from "../controllers/auth.Register.controller";
import {loginUser} from "../controllers/auth.Login.controller";
import {UserProfile} from "../controllers/auth.UserProfile.controller";
import {validateToken} from "../../specialist/middleware/authMiddleware";
import {getUserProfileByToken} from "../controllers/getId.UserProfile.controller"; 
import express from "express";

const router = express.Router();

// *Rutas de registrarse y de iniciar sesión del usuario
router.post("/register", registerUser);
router.post("/login", loginUser);
// *Ruta para obtener el perfil del usuario
router.get("/User/:id", UserProfile);
//* Ruta protegida para obtener el id del usuario
router.get("/getUser/me",validateToken, getUserProfileByToken);

export default router;
