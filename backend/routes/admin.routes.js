// 📁 backend/routes/admin.routes.js

import { Router } from 'express';
const router = Router();
import { getDashboard, getAllUsers, updateUserRole, getQrScans, getInvoiceSummary } from '../controllers/admin.controller';
import authMiddleware from '../middlewares/auth.middleware';
import roleMiddleware from '../middlewares/role.middleware';

// 📌 Obtener dashboard admin
router.get('/dashboard', authMiddleware, roleMiddleware('admin'), getDashboard);

// 📌 Ver todos los usuarios
router.get('/users', authMiddleware, roleMiddleware('admin'), getAllUsers);

// 📌 Cambiar rol de un usuario
router.patch('/users/:id/role', authMiddleware, roleMiddleware('admin'), updateUserRole);

// 📌 Ver escaneos de QR
router.get('/qr-scans', authMiddleware, roleMiddleware('admin'), getQrScans);

// 📌 Generar resumen de facturas
router.get('/summary/invoices', authMiddleware, roleMiddleware('admin'), getInvoiceSummary);

export default router;
