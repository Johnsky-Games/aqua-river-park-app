const { User } = require('../models').default;
const { hash, compare } = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Obtener datos del perfil
exports.getProfile = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ['password_hash', 'confirmation_token', 'reset_token'] }
  });
  res.json(user);
};

// Actualizar nombre u otros datos
exports.updateProfile = async (req, res) => {
  const { name } = req.body;
  const user = await User.findByPk(req.user.id);
  user.name = name || user.name;
  await user.save();
  res.json({ msg: 'Perfil actualizado correctamente.' });
};

// Cambiar correo
exports.updateEmail = async (req, res) => {
  const { email } = req.body;
  const existing = await User.findOne({ where: { email } });
  if (existing && existing.id !== req.user.id)
    return res.status(400).json({ msg: 'El correo ya está en uso.' });

  const user = await User.findByPk(req.user.id);
  user.email = email;
  await user.save();
  res.json({ msg: 'Correo actualizado.' });
};

// Cambiar contraseña
exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findByPk(req.user.id);
  const match = await compare(currentPassword, user.password_hash);
  if (!match) return res.status(400).json({ msg: 'Contraseña actual incorrecta.' });

  user.password_hash = await hash(newPassword, 10);
  await user.save();
  res.json({ msg: 'Contraseña actualizada.' });
};

// Subir o actualizar avatar
exports.uploadAvatar = async (req, res) => {
  const user = await User.findByPk(req.user.id);
  const filename = req.file.filename;

  // Eliminar el anterior si existe
  if (user.avatar_url && fs.existsSync(`public/uploads/avatars/${user.avatar_url}`)) {
    fs.unlinkSync(`public/uploads/avatars/${user.avatar_url}`);
  }

  user.avatar_url = filename;
  await user.save();
  res.json({ msg: 'Avatar actualizado.', avatar_url: filename });
};
