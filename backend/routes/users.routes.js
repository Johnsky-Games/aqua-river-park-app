// 📁 backend/routes/users.routes.js

import { Router } from 'express';
const router = Router();

import {
    getAllUsers,
    getProfile,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    updateProfile,
    updateEmail,
    updatePassword,
    uploadAvatar
} from '../controllers/user.controller.js';

import { authenticateToken, authorizeRole } from '../middlewares/auth.middleware.js';

// ✅ Obtener todos los usuarios (solo admin)
router.get('/', authenticateToken, authorizeRole('admin'), getAllUsers);

// ✅ Obtener perfil del usuario autenticado
router.get('/me', authenticateToken, getProfile);

// ✅ Actualizar perfil (nombre y teléfono)
router.put('/me', authenticateToken, updateProfile);

// ✅ Actualizar email
router.put('/me/email', authenticateToken, updateEmail);

// ✅ Actualizar contraseña
router.put('/me/password', authenticateToken, updatePassword);

// ✅ Subir avatar
router.put('/me/avatar', authenticateToken, uploadAvatar);

// ✅ Obtener un solo usuario por ID (solo admin)
router.get('/:id', authenticateToken, authorizeRole('admin'), getUserById);

// ✅ Crear nuevo usuario (registro interno o testing, usualmente no expuesto públicamente)
router.post('/', authenticateToken, authorizeRole('admin'), createUser);

// ✅ Actualizar usuario
router.put('/:id', authenticateToken, authorizeRole('admin'), updateUser);

// ✅ Eliminar usuario
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteUser);

export default router;
