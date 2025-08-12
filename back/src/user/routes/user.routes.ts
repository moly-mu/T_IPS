import {validateToken } from "../middleware/validateToken";
import {registerUser} from "../controllers/Registro/post.Register.controller";
import {loginUser} from "../controllers/Acceso/auth.Login.controller";
import {UserProfile} from "../controllers/Perfil/get.UserProfile.controller";
import {updateUserProfile } from '../controllers/Perfil/put.UserProfileEdit.controller';
import { getMedicalConsultations } from "../controllers/HistorialDeConsultas/getMedicalHistory.controller";
import {UserScheduleAppointment} from "../controllers/Citas/get.UserScheduleAppointment.controller";
import {UserScheduleAppointmentCreate} from "../controllers/Citas/Post.UserScheduleAppointment.controller";
import { getUserAppointments } from "../controllers/Citas/get.UserAppointments.controller";
import { getUserReviews } from "../controllers/Encuentas/getUserReviews.controller";
import { createUserReview} from "../controllers/Encuentas/postCreateUserReview.controller";
import express from "express";

const router = express.Router();

// *Ruta de registrarse  
router.post("/register", registerUser);
// *Ruta iniciar sesión del usuario
router.post("/login", loginUser);
// *Ruta para obtener el perfil del usuario
router.get("/User/Profile", validateToken,UserProfile);
//* Ruta para actualizar el perfil del usuario
router.put('/User/Profile', validateToken,updateUserProfile);
// *Ruta para obtener el historial médico del paciente
router.get("/User/Medicalhistory", validateToken,getMedicalConsultations);
//* Ruta para agendar una cita
router.get("/User/scheduleAppointment", validateToken, UserScheduleAppointment);
//* Ruta para crear una cita
router.post("/User/scheduleAppointment", validateToken, UserScheduleAppointmentCreate);
//* Ruta para obtener las citas del usuario
router.get("/User/appointments", validateToken, getUserAppointments);
// *Ruta para obtener las reseñas del usuario
router.get("/User/Reviews", validateToken, getUserReviews);
// *Ruta para crear una reseña del usuario
router.post("/User/Reviews", validateToken, createUserReview);
export default router;
