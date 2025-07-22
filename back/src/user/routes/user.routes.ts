import {registerUser} from "../controllers/auth.Register.controller";
import {loginUser} from "../controllers/auth.Login.controller";
import {UserProfile} from "../controllers/auth.UserProfile.controller";
import { updateUserProfile } from '../controllers/auth.UserProfileEdit.controller';
import {validateToken} from "../../specialist/middleware/authMiddleware";
import {getUserProfileByToken} from "../controllers/getId.UserProfile.controller"; 
import {UserScheduleAppointment} from "../controllers/getld.UserScheduleAppointment.controller";
import express from "express";

const router = express.Router();

// *Rutas de registrarse y de iniciar sesión del usuario
router.post("/register", registerUser);
router.post("/login", loginUser);
// *Ruta para obtener el perfil del usuario
router.get("/User/:id", UserProfile);
//* Ruta para actualizar el perfil del usuario
router.put('/User/:id', updateUserProfile);
//* Ruta para agendar una cita
router.get("/User/:id/scheduleAppointment", UserScheduleAppointment);
//* Ruta protegida para obtener el id del usuario
router.get("/getUser/me",validateToken, getUserProfileByToken);

export default router;
