// 📁 backend/routes/qrScan.routes.js

import { Router } from 'express';
const router = Router();
import { registerScan, getAllScans, getScansByFreePassId } from '../controllers/qr_scan.controller';
import { authenticateUser, authorizeRoles } from '../middlewares/authMiddleware';

// ✅ Registrar un escaneo de QR (por admin)
router.post('/', authenticateUser, authorizeRoles('admin'), registerScan);

// ✅ Obtener todos los escaneos (solo admin)
router.get('/', authenticateUser, authorizeRoles('admin'), getAllScans);

// ✅ Obtener escaneos por pase gratuito específico
router.get('/free-pass/:freePassId', authenticateUser, getScansByFreePassId);

export default router;
