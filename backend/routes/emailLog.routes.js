// 📁 backend/routes/emailLog.routes.js

import { Router } from 'express';
const router = Router();
import { getAll, getByClient, create } from '../controllers/emailLog.controller';
import { authenticateUser } from '../middlewares/authMiddleware';

// ✅ Obtener todos los registros de email (admin)
router.get('/', authenticateUser, getAll);

// ✅ Obtener logs de email por cliente
router.get('/client/:clientId', authenticateUser, getByClient);

// ✅ Registrar un nuevo log de email
router.post('/', authenticateUser, create);

export default router;
