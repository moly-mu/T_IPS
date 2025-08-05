import { Router } from 'express';
import {
  getPatientGeneralData,
  updatePatientGeneralData,
  createMedicalBackground,
  getMedicalBackgroundsByHistory,
  updateMedicalBackground,
  deleteMedicalBackground
} from '../../controllers/clinicalHistory/generalData.controller';

const router = Router();

// Rutas para datos generales del paciente
router.get('/patient/:patientId', getPatientGeneralData);
router.put('/patient/:patientId', updatePatientGeneralData);

// Rutas para antecedentes médicos
router.post('/backgrounds', createMedicalBackground);
router.get('/backgrounds/history/:medicalHistoryId', getMedicalBackgroundsByHistory);
router.put('/backgrounds/:id', updateMedicalBackground);
router.delete('/backgrounds/:id', deleteMedicalBackground);

export default router;
