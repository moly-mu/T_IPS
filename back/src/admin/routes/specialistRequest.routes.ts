import express from 'express';
import {
  getAllSpecialistRequests,
  getSpecialistRequestById,
  updateSpecialistRequestStatus
} from '../controller/specialistRequest.controller'; // Asegúrate que la ruta sea correcta

const router = express.Router();

// Rutas
router.get('/', getAllSpecialistRequests);
router.get('/:id', getSpecialistRequestById);
router.patch('/:id/status', updateSpecialistRequestStatus);

export default router;