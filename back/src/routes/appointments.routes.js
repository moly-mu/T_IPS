// src/routes/citas.routes.js
import { Router } from 'express';
import { agendarCita, listarCitas } from '../controllers/auth.controller.js';

const router = Router();

router.post('/citas', agendarCita);         // Agendar cita
router.get('/citas', listarCitas);          // Listar citas

/**
 * ! Probar endpoints antes

*/
export default router;
