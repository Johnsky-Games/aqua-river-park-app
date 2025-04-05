// 📁 backend/controllers/userPermissions.controller.js

import db from '../config/db.js';

// ✅ Obtener todos los permisos de un usuario
export const getUserPermissions = async (req, res) => {
    const { userId } = req.params;
    try {
        const [permissions] = await db.query(
            `SELECT p.* FROM permissions p
       INNER JOIN user_permissions up ON p.id = up.permission_id
       WHERE up.user_id = ?`,
            [userId]
        );
        res.json(permissions);
    } catch (error) {
        console.error('Error al obtener permisos del usuario:', error);
        res.status(500).json({ message: 'Error al obtener permisos del usuario' });
    }
};

// ✅ Asignar permiso a usuario
export const assignPermissionToUser = async (req, res) => {
    const { userId, permissionId } = req.body;
    try {
        const [existing] = await db.query(
            'SELECT * FROM user_permissions WHERE user_id = ? AND permission_id = ?',
            [userId, permissionId]
        );
        if (existing.length > 0) {
            return res.status(400).json({ message: 'El permiso ya está asignado al usuario.' });
        }

        await db.query(
            'INSERT INTO user_permissions (user_id, permission_id) VALUES (?, ?)',
            [userId, permissionId]
        );
        res.status(201).json({ message: 'Permiso asignado correctamente al usuario' });
    } catch (error) {
        console.error('Error al asignar permiso al usuario:', error);
        res.status(500).json({ message: 'Error al asignar permiso al usuario' });
    }
};

// ✅ Eliminar permiso de usuario
export const removePermissionFromUser = async (req, res) => {
    const { userId, permissionId } = req.body;
    try {
        await db.query(
            'DELETE FROM user_permissions WHERE user_id = ? AND permission_id = ?',
            [userId, permissionId]
        );
        res.json({ message: 'Permiso eliminado correctamente del usuario' });
    } catch (error) {
        console.error('Error al eliminar permiso del usuario:', error);
        res.status(500).json({ message: 'Error al eliminar permiso del usuario' });
    }
};
