import { Router } from 'express';
import {
  createPrescription,
  getPrescriptionsByHistory,
  getPrescriptionById,
  updatePrescription,
  deletePrescription,
  getPrescriptionsByPatient,
  searchPrescriptionsByMedicine,
  getMedicationStats
} from '../../controllers/clinicalHistory/prescriptions.controller';

const router = Router();

// Rutas para recetas médicas
router.post('/', createPrescription);
router.get('/history/:medicalHistoryId', getPrescriptionsByHistory);
router.get('/patient/:patientId', getPrescriptionsByPatient);
router.get('/search', searchPrescriptionsByMedicine);
router.get('/stats', getMedicationStats);
router.get('/:id', getPrescriptionById);
router.put('/:id', updatePrescription);
router.delete('/:id', deletePrescription);

export default router;
