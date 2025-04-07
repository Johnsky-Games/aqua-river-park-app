// 📁 backend/controllers/user.controller.js

import fs from 'fs';
import path from 'path';
import { hash, compare } from 'bcryptjs';
import { validationResult } from 'express-validator';
import db from '../config/db.js';

// ✅ Obtener perfil del usuario
export const getProfile = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, email, phone, avatar_url, role_id FROM users WHERE id = ?',
      [req.user.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// ✅ Actualizar nombre y teléfono
export const updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, phone } = req.body;

  try {
    await db.query(
      'UPDATE users SET name = ?, phone = ? WHERE id = ?',
      [name, phone, req.user.id]
    );
    res.json({ message: 'Perfil actualizado correctamente.' });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// ✅ Cambiar correo electrónico
export const updateEmail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email } = req.body;

  try {
    const [existing] = await db.query('SELECT id FROM users WHERE email = ? AND id != ?', [email, req.user.id]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'El correo ya está en uso.' });
    }

    await db.query('UPDATE users SET email = ? WHERE id = ?', [email, req.user.id]);
    res.json({ message: 'Correo actualizado.' });
  } catch (error) {
    console.error('Error al actualizar correo:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// ✅ Cambiar contraseña
export const updatePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { currentPassword, newPassword } = req.body;

  try {
    const [users] = await db.query('SELECT password_hash FROM users WHERE id = ?', [req.user.id]);
    const user = users[0];

    const match = await compare(currentPassword, user.password_hash);
    if (!match) {
      return res.status(400).json({ message: 'Contraseña actual incorrecta.' });
    }

    const newHashed = await hash(newPassword, 10);
    await db.query('UPDATE users SET password_hash = ? WHERE id = ?', [newHashed, req.user.id]);

    res.json({ message: 'Contraseña actualizada.' });
  } catch (error) {
    console.error('Error al actualizar contraseña:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// ✅ Subir o actualizar avatar
export const uploadAvatar = async (req, res) => {
  try {
    const filename = req.file.filename;
    const [users] = await db.query('SELECT avatar_url FROM users WHERE id = ?', [req.user.id]);
    const user = users[0];

    if (user.avatar_url) {
      const filePath = path.join('public/uploads/avatars', user.avatar_url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await db.query('UPDATE users SET avatar_url = ? WHERE id = ?', [filename, req.user.id]);
    res.json({ message: 'Avatar actualizado.', avatar_url: filename });
  } catch (error) {
    console.error('Error al subir avatar:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
