// 📁 backend/routes/permission.routes.js

import { Router } from 'express';
const router = Router();
import { getAllPermissions, assignPermissionToUser, removePermissionFromUser, assignPermissionToRole, removePermissionFromRole } from '../controllers/permission.controller';
import { authenticateUser, authorizeRoles } from '../middlewares/authMiddleware';

// ✅ Obtener todos los permisos disponibles
router.get('/', authenticateUser, authorizeRoles('admin'), getAllPermissions);

// ✅ Asignar permiso a un usuario
router.post('/assign-to-user', authenticateUser, authorizeRoles('admin'), assignPermissionToUser);

// ✅ Remover permiso de un usuario
router.delete('/remove-from-user', authenticateUser, authorizeRoles('admin'), removePermissionFromUser);

// ✅ Asignar permiso a un rol
router.post('/assign-to-role', authenticateUser, authorizeRoles('admin'), assignPermissionToRole);

// ✅ Remover permiso de un rol
router.delete('/remove-from-role', authenticateUser, authorizeRoles('admin'), removePermissionFromRole);

export default router;
