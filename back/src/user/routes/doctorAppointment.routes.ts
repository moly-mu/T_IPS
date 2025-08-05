import { Router } from 'express';
import { validateToken } from '../middleware/validateToken';
import {
  getAppointmentDetails,
  startConsultation,
  endConsultation,
  getUpcomingAppointments,
  getAllAppointments
} from '../controllers/appointments/doctorAppointment.controller';

const router = Router();

// Middleware de autenticación para todas las rutas
router.use(validateToken);

// Obtener todas las citas (para debugging)
router.get('/debug/all', getAllAppointments);

// Obtener próximas citas (DEBE IR ANTES que /:appointmentId)
router.get('/upcoming/list', getUpcomingAppointments);

// Obtener detalles de una cita específica
router.get('/:appointmentId', getAppointmentDetails);

// Iniciar consulta
router.patch('/:appointmentId/start', startConsultation);

// Finalizar consulta
router.patch('/:appointmentId/end', endConsultation);

export default router;
