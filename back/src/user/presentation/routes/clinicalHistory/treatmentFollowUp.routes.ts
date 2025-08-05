import { Router } from 'express';
import {
  // Consultas médicas
  createMedicalConsultation,
  getMedicalConsultationsByHistory,
  updateMedicalConsultation,
  deleteMedicalConsultation,
  // Diagnósticos
  createDiagnosis,
  getDiagnosesByHistory,
  updateDiagnosis,
  deleteDiagnosis,
  // Archivos diagnósticos
  createDiagnosticFile,
  getDiagnosticFilesByHistory,
  downloadDiagnosticFile,
  deleteDiagnosticFile
} from '../../controllers/clinicalHistory/treatmentFollowUp.controller';

const router = Router();

// ==================== CONSULTAS MÉDICAS ====================
router.post('/consultations', createMedicalConsultation);
router.get('/consultations/history/:medicalHistoryId', getMedicalConsultationsByHistory);
router.put('/consultations/:id', updateMedicalConsultation);
router.delete('/consultations/:id', deleteMedicalConsultation);

// ==================== DIAGNÓSTICOS ====================
router.post('/diagnoses', createDiagnosis);
router.get('/diagnoses/history/:medicalHistoryId', getDiagnosesByHistory);
router.put('/diagnoses/:id', updateDiagnosis);
router.delete('/diagnoses/:id', deleteDiagnosis);

// ==================== ARCHIVOS DIAGNÓSTICOS ====================
router.post('/files', createDiagnosticFile);
router.get('/files/history/:medicalHistoryId', getDiagnosticFilesByHistory);
router.get('/files/download/:id', downloadDiagnosticFile);
router.delete('/files/:id', deleteDiagnosticFile);

export default router;
