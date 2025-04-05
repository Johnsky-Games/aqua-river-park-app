import { Router } from 'express';
const router = Router();
import { getAllRoles, getRoleById, createRole, updateRole, deleteRole } from '../controllers/role.controller';
import { authenticateUser, authorizeRole } from '../middlewares/authMiddleware';

// ✅ Obtener todos los roles
router.get('/', authenticateUser, authorizeRole('admin'), getAllRoles);

// ✅ Obtener un rol por ID
router.get('/:id', authenticateUser, authorizeRole('admin'), getRoleById);

// ✅ Crear nuevo rol
router.post('/', authenticateUser, authorizeRole('admin'), createRole);

// ✅ Actualizar un rol existente
router.put('/:id', authenticateUser, authorizeRole('admin'), updateRole);

// ✅ Eliminar un rol
router.delete('/:id', authenticateUser, authorizeRole('admin'), deleteRole);

export default router;
