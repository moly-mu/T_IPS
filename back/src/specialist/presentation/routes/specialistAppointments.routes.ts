import express from "express";
import {
  getAppointments,
  getScheduledAppointments,
  confirmAppointment,
  rescheduleAppointment,
  cancelAppointment,
  createAppointment,
  getAppointmentDetails
} from "../controllers/appointments";
import {validateToken} from "../../middleware/authMiddleware";
import { listSpecialistRequests } from "../controllers/request/listSpecialist.Request.controller";
import { getProfile } from "../controllers/profile/listproSpecialist.controller";
import { updateProfile} from "../controllers/profile/editproSpecialist.controller";

const router = express.Router();

// Rutas existentes
router.get("/getAppointments", validateToken, getAppointments);
router.get("/listSpecialist", validateToken, listSpecialistRequests);
router.get("/getProfile", validateToken, getProfile);
router.put("/editProfile", validateToken, updateProfile);

// Nuevas rutas para citas programadas
router.get("/scheduled", validateToken, getScheduledAppointments);
router.get("/details/:appointmentId", validateToken, getAppointmentDetails);
router.post("/create", validateToken, createAppointment);
router.put("/confirm/:appointmentId", validateToken, confirmAppointment);
router.put("/reschedule/:appointmentId", validateToken, rescheduleAppointment);
router.put("/cancel/:appointmentId", validateToken, cancelAppointment);

export default router;