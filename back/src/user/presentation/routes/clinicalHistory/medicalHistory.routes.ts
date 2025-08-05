import { Router } from 'express';
import {
  createMedicalHistory,
  getMedicalHistoryByPatient,
  updateMedicalHistory,
  deleteMedicalHistory
} from '../../controllers/clinicalHistory/medicalHistory.controller';

const router = Router();

// Rutas para Historia Clínica
router.post('/', createMedicalHistory);
router.get('/patient/:patientId', getMedicalHistoryByPatient);
router.put('/:id', updateMedicalHistory);
router.delete('/:id', deleteMedicalHistory);

export default router;
