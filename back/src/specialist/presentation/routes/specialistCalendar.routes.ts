import express from 'express';
import { validateToken } from "../../middleware/authMiddleware";
import {
  getCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
  getSpecialistAvailability
} from "../controllers/calendar/calendarEvents.controller";

const router = express.Router();

// Rutas para el calendario
router.get("/events", validateToken, getCalendarEvents);
router.post("/events", validateToken, createCalendarEvent);
router.put("/events/:id", validateToken, updateCalendarEvent);
router.delete("/events/:id", validateToken, deleteCalendarEvent);
router.get("/availability", validateToken, getSpecialistAvailability);

export default router;
