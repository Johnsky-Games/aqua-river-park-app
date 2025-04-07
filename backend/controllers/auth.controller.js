// 📁 backend/controllers/user.controller.js

import { User } from '../models/index.js';
import { hash, compare } from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { validationResult } from 'express-validator';

// ✅ Obtener datos del perfil
export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password_hash', 'confirmation_token', 'reset_token'] }
    });
    res.json(user);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

// ✅ Actualizar nombre y número de teléfono
export const updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, phone } = req.body;
    const user = await User.findByPk(req.user.id);
    user.name = name || user.name;
    user.phone = phone || user.phone;
    await user.save();
    res.json({ msg: 'Perfil actualizado correctamente.' });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

// ✅ Cambiar correo electrónico
export const updateEmail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing && existing.id !== req.user.id)
      return res.status(400).json({ msg: 'El correo ya está en uso.' });

    const user = await User.findByPk(req.user.id);
    user.email = email;
    await user.save();
    res.json({ msg: 'Correo actualizado.' });
  } catch (error) {
    console.error('Error al actualizar correo:', error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

// ✅ Cambiar contraseña
export const updatePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);
    const match = await compare(currentPassword, user.password_hash);
    if (!match) return res.status(400).json({ msg: 'Contraseña actual incorrecta.' });

    user.password_hash = await hash(newPassword, 10);
    await user.save();
    res.json({ msg: 'Contraseña actualizada.' });
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

// ✅ Subir o actualizar avatar
export const uploadAvatar = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const filename = req.file.filename;

    if (user.avatar_url && fs.existsSync(`public/uploads/avatars/${user.avatar_url}`)) {
      fs.unlinkSync(`public/uploads/avatars/${user.avatar_url}`);
    }

    user.avatar_url = filename;
    await user.save();
    res.json({ msg: 'Avatar actualizado.', avatar_url: filename });
  } catch (error) {
    console.error('Error al subir avatar:', error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};