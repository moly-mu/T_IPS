import {validateToken } from "../middleware/validateToken";
import {registerUser} from "../controllers/Registro/post.Register.controller";
import {loginUser} from "../controllers/Acceso/auth.Login.controller";
import {UserProfile} from "../controllers/Perfil/getld.UserProfile.controller";
import {createPatientData } from "../controllers/Perfil/post.createPacienteData.controller";
import {updateUserProfile } from '../controllers/Perfil/put.UserProfileEdit.controller';
import {UserScheduleAppointment} from "../controllers/Citas/getld.UserScheduleAppointment.controller";
import express from "express";

const router = express.Router();

// *Ruta de registrarse  
router.post("/register", registerUser);
// *Ruta iniciar sesión del usuario
router.post("/login", loginUser);
// *Ruta para obtener el perfil del usuario
router.get("/User/Profile", validateToken,UserProfile);
// *Ruta para crear datos del paciente que no existen
router.post("/User/CreatePacienteData", validateToken, createPatientData);
//* Ruta para actualizar el perfil del usuario
router.put('/User/Profile', validateToken,updateUserProfile);
//* Ruta para agendar una cita
router.get("/User/scheduleAppointment", validateToken, UserScheduleAppointment);

export default router;
