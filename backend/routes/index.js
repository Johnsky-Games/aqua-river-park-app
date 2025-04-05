// 📁 backend/routes/index.js

import { Router } from 'express';
const router = Router();

// Importar subrutas
import authRoutes from './auth.routes';
import userRoutes from './users.routes';
import invoiceRoutes from './invoices.routes';
import freePassRoutes from './freePass.routes';
import qrScanRoutes from './qrScan.routes';
import emailLogRoutes from './emailLog.routes';
import adminRoutes from './admin.routes';
import cartRoutes from './cart.routes';
import serviceRoutes from './services.routes';
import roleRoutes from './role.routes';
import permissionRoutes from './permission.routes';

// Registrar rutas bajo prefijos organizados
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/free-passes', freePassRoutes);
router.use('/qr-scans', qrScanRoutes);
router.use('/email-logs', emailLogRoutes);
router.use('/admin', adminRoutes);
router.use('/cart', cartRoutes);
router.use('/services', serviceRoutes);
router.use('/roles', roleRoutes);
router.use('/permissions', permissionRoutes);

export default router;
