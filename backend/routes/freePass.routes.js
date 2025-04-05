// 📁 backend/routes/freePass.routes.js

import { Router } from 'express';
const router = Router();
import { getAll, getByClient, generateForClient, redeemPass } from '../controllers/free_pass.controller';
import { authenticateUser, authorizeRole } from '../middlewares/authMiddleware';

// ✅ Obtener todos los pases (solo admin)
router.get('/', authenticateUser, authorizeRole(['admin']), getAll);

// ✅ Obtener pases de un cliente específico
router.get('/client/:clientId', authenticateUser, getByClient);

// ✅ Generar un nuevo pase gratuito (usualmente luego de registrar 5 facturas)
router.post('/generate/:clientId', authenticateUser, generateForClient);

// ✅ Canjear un pase gratuito (por QR)
router.post('/redeem/:qrCode', authenticateUser, authorizeRole(['admin']), redeemPass);

export default router;
