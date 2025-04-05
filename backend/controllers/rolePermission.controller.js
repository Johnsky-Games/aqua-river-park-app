// 📁 backend/controllers/rolePermission.controller.js

import { execute } from '../config/db';

// ✅ Obtener todos los permisos asignados a un rol
export async function getPermissionsByRole(req, res) {
    const { roleId } = req.params;

    try {
        const [results] = await execute(
            `SELECT p.id, p.name 
       FROM role_permissions rp
       JOIN permissions p ON rp.permission_id = p.id
       WHERE rp.role_id = ?`,
            [roleId]
        );

        res.status(200).json({ permissions: results });
    } catch (error) {
        console.error('Error al obtener permisos por rol:', error);
        res.status(500).json({ message: 'Error al obtener permisos del rol' });
    }
}

// ✅ Asignar permiso a rol
export async function assignPermissionToRole(req, res) {
    const { roleId, permissionId } = req.body;

    if (!roleId || !permissionId) {
        return res.status(400).json({ message: 'Se requieren roleId y permissionId' });
    }

    try {
        await execute(
            `INSERT INTO role_permissions (role_id, permission_id)
       VALUES (?, ?)`,
            [roleId, permissionId]
        );

        res.status(201).json({ message: 'Permiso asignado al rol exitosamente' });
    } catch (error) {
        console.error('Error al asignar permiso a rol:', error);
        res.status(500).json({ message: 'No se pudo asignar el permiso al rol' });
    }
}

// ✅ Eliminar permiso de rol
export async function removePermissionFromRole(req, res) {
    const { roleId, permissionId } = req.body;

    if (!roleId || !permissionId) {
        return res.status(400).json({ message: 'Se requieren roleId y permissionId' });
    }

    try {
        await execute(
            `DELETE FROM role_permissions
       WHERE role_id = ? AND permission_id = ?`,
            [roleId, permissionId]
        );

        res.status(200).json({ message: 'Permiso eliminado del rol exitosamente' });
    } catch (error) {
        console.error('Error al eliminar permiso de rol:', error);
        res.status(500).json({ message: 'No se pudo eliminar el permiso del rol' });
    }
}