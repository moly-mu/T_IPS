import { Router } from 'express';
import {
  getCitas,
  getPagos,
  getRegistros,
  getRatings,
  getHistorias
} from '../controller/activity.controller';

const router = Router();

router.get('/citas', getCitas);
router.get('/pagos', getPagos);
router.get('/registros', getRegistros);
router.get('/ratings', getRatings);
router.get('/historias', getHistorias);

export default router;
