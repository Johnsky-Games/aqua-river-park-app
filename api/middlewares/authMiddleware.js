import { verify } from 'jsonwebtoken';
import { secret } from '../config/jwt';
import { User } from '../models';

export default async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'Token requerido' });

  try {
    const decoded = verify(token, secret);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido o expirado' });
  }
};
