import { Router } from 'express';
const router = Router();
import { getPermissionsByRole, assignPermissionToRole, removePermissionFromRole } from '../controllers/rolePermission.controller';
import { authenticateUser, authorizeRole } from '../middlewares/authMiddleware';

// ✅ Obtener permisos de un rol
router.get('/:roleId', authenticateUser, authorizeRole('admin'), getPermissionsByRole);

// ✅ Asignar un permiso a un rol
router.post('/', authenticateUser, authorizeRole('admin'), assignPermissionToRole);

// ✅ Eliminar un permiso de un rol
router.delete('/', authenticateUser, authorizeRole('admin'), removePermissionFromRole);

export default router;
