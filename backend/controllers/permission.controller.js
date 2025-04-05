// 📁 backend/controllers/permission.controller.js

import db from '../config/db.js';

// ✅ Obtener todos los permisos
export const getAllPermissions = async (req, res) => {
    try {
        const [permissions] = await db.query('SELECT * FROM permissions');
        res.json(permissions);
    } catch (error) {
        console.error('Error al obtener los permisos:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// ✅ Obtener un permiso por ID
export const getPermissionById = async (req, res) => {
    const { id } = req.params;

    try {
        const [results] = await db.query('SELECT * FROM permissions WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error('Error al obtener el permiso:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// ✅ Crear nuevo permiso
export const createPermission = async (req, res) => {
    const { name } = req.body;

    try {
        await db.query('INSERT INTO permissions (name) VALUES (?)', [name]);
        res.status(201).json({ message: 'Permiso creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el permiso:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// ✅ Eliminar un permiso
export const deletePermission = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM permissions WHERE id = ?', [id]);
        res.json({ message: 'Permiso eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el permiso:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};
