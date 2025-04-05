// 📁 backend/controllers/role.controller.js

import db from '../config/db.js';

// ✅ Obtener todos los roles
export const getAllRoles = async (req, res) => {
  try {
    const [roles] = await db.query('SELECT * FROM roles');
    res.json(roles);
  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).json({ message: 'Error al obtener los roles' });
  }
};

// ✅ Crear un nuevo rol
export const createRole = async (req, res) => {
  const { name } = req.body;
  try {
    const [existing] = await db.query('SELECT * FROM roles WHERE name = ?', [name]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'El rol ya existe.' });
    }
    await db.query('INSERT INTO roles (name) VALUES (?)', [name]);
    res.status(201).json({ message: 'Rol creado correctamente' });
  } catch (error) {
    console.error('Error al crear el rol:', error);
    res.status(500).json({ message: 'Error al crear el rol' });
  }
};

// ✅ Actualizar rol
export const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await db.query('UPDATE roles SET name = ? WHERE id = ?', [name, id]);
    res.json({ message: 'Rol actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el rol:', error);
    res.status(500).json({ message: 'Error al actualizar el rol' });
  }
};

// ✅ Eliminar rol
export const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM roles WHERE id = ?', [id]);
    res.json({ message: 'Rol eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el rol:', error);
    res.status(500).json({ message: 'Error al eliminar el rol' });
  }
};
