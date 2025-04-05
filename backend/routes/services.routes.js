// 📁 backend/routes/services.routes.js

import { Router } from 'express';
const router = Router();

import {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
} from '../controllers/service.controller.js';

import {
    authenticateToken,
    authorizeRole,
} from '../middlewares/auth.middleware.js';

// ✅ Obtener todos los servicios (público)
router.get('/', getAllServices);

// ✅ Obtener un servicio por ID (ahora público)
router.get('/:id', getServiceById);

// ✅ Crear nuevo servicio (solo admin)
router.post('/', authenticateToken, authorizeRole('admin'), createService);

// ✅ Actualizar servicio (solo admin)
router.put('/:id', authenticateToken, authorizeRole('admin'), updateService);

// ✅ Eliminar servicio (solo admin)
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteService);

export default router;
