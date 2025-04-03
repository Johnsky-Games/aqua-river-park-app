import { hash, compare } from 'bcryptjs';
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { secret, expiresIn } = require('../config/jwt');
const transporter = require('../config/mailer').default;
const crypto = require('crypto');
export async function registerUser(req, res) {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ msg: 'Ya existe una cuenta con ese correo.' });
    const hashed = await hash(password, 10);
    const token = crypto.randomBytes(32).toString('hex');
    const user = await User.create({
      name, email, password_hash: hashed,
      confirmation_token: token,
      confirmation_expires: new Date(Date.now() + 3600000)
    });
    await transporter.sendMail({
      to: email,
      subject: 'Confirma tu cuenta',
      html: `<a href="http://localhost:5173/confirm/${token}">Confirmar cuenta</a>`
    });
    res.status(201).json({ msg: 'Registro exitoso, revisa tu correo.' });
  } catch (err) {
    res.status(500).json({ msg: 'Error en el servidor', err });
  }
}
export async function confirmUser(req, res) {
  const { token } = req.params;
  const user = await User.findOne({ where: { confirmation_token: token } });
  if (!user || user.confirmation_expires < new Date())
    return res.status(400).json({ msg: 'Token inválido o expirado.' });
  user.is_confirmed = true;
  user.confirmation_token = null;
  user.confirmation_expires = null;
  await user.save();
  res.json({ msg: 'Cuenta confirmada correctamente.' });
}

export async function resendToken(req, res) {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || user.is_confirmed) return res.status(400).json({ msg: 'Usuario no válido o ya confirmado.' });
  user.confirmation_token = crypto.randomBytes(32).toString('hex');
  user.confirmation_expires = new Date(Date.now() + 3600000);
  await user.save();
  await transporter.sendMail({
    to: email,
    subject: 'Nuevo enlace de confirmación',
    html: `<a href="http://localhost:5173/confirm/${user.confirmation_token}">Confirmar cuenta</a>`
  });
  res.json({ msg: 'Nuevo enlace enviado.' });
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !(await compare(password, user.password_hash)))
    return res.status(400).json({ msg: 'Credenciales inválidas' });
  if (!user.is_confirmed) return res.status(403).json({ msg: 'Confirma tu cuenta' });
  const token = jwt.sign({ id: user.id }, secret, { expiresIn });
  user.last_login = new Date();
  await user.save();
  res.json({ token, user });
}

export async function forgotPassword(req, res) {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ msg: 'Usuario no encontrado.' });
  user.reset_token = crypto.randomBytes(32).toString('hex');
  user.reset_expires = new Date(Date.now() + 3600000);
  await user.save();
  await transporter.sendMail({
    to: email,
    subject: 'Recuperar contraseña',
    html: `<a href="http://localhost:5173/reset-password/${user.reset_token}">Cambiar contraseña</a>`
  });
  res.json({ msg: 'Correo de recuperación enviado' });
}

export async function resetPassword(req, res) {
  const { token, password } = req.body;
  const user = await User.findOne({ where: { reset_token: token } });
  if (!user || user.reset_expires < new Date()) return res.status(400).json({ msg: 'Token inválido o expirado.' });
  user.password_hash = await hash(password, 10);
  user.reset_token = null;
  user.reset_expires = null;
  await user.save();
  res.json({ msg: 'Contraseña actualizada' });
}