import { User } from '../models';
const bcrypt = require('bcryptjs');
export async function getUserProfile(req, res) {
  const user = await User.findByPk(req.user.id, { attributes: ['id', 'name', 'email', 'avatar_url'] });
  res.json(user);
}

export async function updateProfile(req, res) {
  const user = await User.findByPk(req.user.id);
  const { name, email } = req.body;
  user.name = name || user.name;
  user.email = email || user.email;
  await user.save();
  res.json({ msg: 'Perfil actualizado', user });
}

export async function updatePassword(req, res) {
  const user = await User.findByPk(req.user.id);
  const { currentPassword, newPassword } = req.body;
  const match = await bcrypt.compare(currentPassword, user.password_hash);
  if (!match) return res.status(400).json({ msg: 'Contraseña actual incorrecta' });
  user.password_hash = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ msg: 'Contraseña actualizada' });
}

export async function uploadAvatar(req, res) {
  const user = await User.findByPk(req.user.id);
  user.avatar_url = `/uploads/avatars/${req.file.filename}`;
  await user.save();
  res.json({ msg: 'Avatar actualizado', avatar: user.avatar_url });
}