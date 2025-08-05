import { Router } from 'express';
import {
  createMedicalOrder,
  getMedicalOrdersByPatient,
  getMedicalOrdersBySpecialist,
  getMedicalOrderById,
  updateMedicalOrder,
  updateMedicalOrderStatus,
  deleteMedicalOrder,
  getMedicalOrderStats
} from '../../controllers/clinicalHistory/medicalOrders.controller';

const router = Router();

// Rutas para órdenes médicas
router.post('/', createMedicalOrder);
router.get('/patient/:patientId', getMedicalOrdersByPatient);
router.get('/specialist/:specialistId', getMedicalOrdersBySpecialist);
router.get('/stats', getMedicalOrderStats);
router.get('/:id', getMedicalOrderById);
router.put('/:id', updateMedicalOrder);
router.patch('/:id/status', updateMedicalOrderStatus);
router.delete('/:id', deleteMedicalOrder);

export default router;
