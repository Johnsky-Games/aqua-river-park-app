import { compare, hash } from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import db from '../models/index.js';
const { User } = db;

const avatarPath = path.resolve('public/uploads/avatars');

export async function getProfile(req, res) {
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ['password_hash', 'confirmation_token', 'reset_token'] }
  });
  res.json(user);
}

export async function updateProfile(req, res) {
  const { name } = req.body;
  const user = await User.findByPk(req.user.id);
  user.name = name || user.name;
  await user.save();
  res.json({ msg: 'Perfil actualizado correctamente.' });
}

export async function updateEmail(req, res) {
  const { email } = req.body;
  const existing = await User.findOne({ where: { email } });
  if (existing && existing.id !== req.user.id)
    return res.status(400).json({ msg: 'El correo ya está en uso.' });

  const user = await User.findByPk(req.user.id);
  user.email = email;
  await user.save();
  res.json({ msg: 'Correo actualizado.' });
}

export async function updatePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findByPk(req.user.id);
  const match = await compare(currentPassword, user.password_hash);
  if (!match) return res.status(400).json({ msg: 'Contraseña actual incorrecta.' });

  user.password_hash = await hash(newPassword, 10);
  await user.save();
  res.json({ msg: 'Contraseña actualizada.' });
}

export async function uploadAvatar(req, res) {
  const user = await User.findByPk(req.user.id);
  const filename = req.file.filename;

  if (user.avatar_url) {
    const oldPath = path.join(avatarPath, user.avatar_url);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  user.avatar_url = filename;
  await user.save();
  res.json({ msg: 'Avatar actualizado.', avatar_url: filename });
}
