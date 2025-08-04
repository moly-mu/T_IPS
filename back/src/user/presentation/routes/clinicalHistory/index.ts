import { Router } from 'express';
import medicalHistoryRoutes from './medicalHistory.routes';
import generalDataRoutes from './generalData.routes';
import treatmentFollowUpRoutes from './treatmentFollowUp.routes';
import prescriptionsRoutes from './prescriptions.routes';
import medicalOrdersRoutes from './medicalOrders.routes';

const router = Router();

// Rutas principales de Historia Clínica
router.use('/medical-history', medicalHistoryRoutes);
router.use('/general-data', generalDataRoutes);
router.use('/follow-up', treatmentFollowUpRoutes);
router.use('/prescriptions', prescriptionsRoutes);
router.use('/medical-orders', medicalOrdersRoutes);

export default router;
