import jwt from 'jsonwebtoken';
import { secret } from '../config/jwt.js';
import db from '../models/index.js';

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ msg: 'Token no proporcionado' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secret);
    const user = await db.User.findByPk(decoded.id, {
      include: [{ model: db.Role }, { model: db.Permission }]
    });

    if (!user) return res.status(401).json({ msg: 'Usuario no válido' });

    req.user = user;
    console.log('✅ Usuario verificado:', user.name, '| Rol:', user.Role.name);
    next();
  } catch (error) {
    console.error('❌ Error en verificación JWT:', error.message);
    res.status(401).json({ msg: 'Token inválido' });
  }
};
