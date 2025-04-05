// 📁 backend/routes/invoice.routes.js

import { Router } from 'express';
const router = Router();
import {
    registerInvoice,
    getInvoicesByClient,
    getInvoiceStats
} from '../controllers/invoice.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

// ✅ Registrar nueva factura (recomendado protegerla)
router.post('/', authenticateToken, registerInvoice);

// ✅ Obtener todas las facturas de un cliente
router.get('/client/:clientId', authenticateToken, getInvoicesByClient);

// ✅ Obtener cantidad total de facturas y pases generados
router.get('/stats/:clientId', authenticateToken, getInvoiceStats);

export default router;
