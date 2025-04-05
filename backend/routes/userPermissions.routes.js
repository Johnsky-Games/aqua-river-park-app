import { Router } from 'express';
const router = Router();
import { getPermissionsByUser, assignPermissionToUser, removePermissionFromUser } from '../controllers/userPermission.controller';
import { authenticateUser, authorizeRole } from '../middlewares/authMiddleware';

// ✅ Obtener permisos de un usuario
router.get('/:userId', authenticateUser, authorizeRole('admin'), getPermissionsByUser);

// ✅ Asignar un permiso a un usuario
router.post('/', authenticateUser, authorizeRole('admin'), assignPermissionToUser);

// ✅ Eliminar un permiso de un usuario
router.delete('/', authenticateUser, authorizeRole('admin'), removePermissionFromUser);

export default router;
