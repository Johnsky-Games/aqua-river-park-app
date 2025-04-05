// 📁 backend/models/user.model.js
import db from '../config/db.js';

export const findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0]; // este ya incluye "phone" si está en la tabla
};

export const createUser = async ({ name, email, password_hash, role_id, phone }) => {
  const [result] = await db.query(
    'INSERT INTO users (name, email, password_hash, role_id, phone) VALUES (?, ?, ?, ?, ?)',
    [name, email, password_hash, role_id, phone]
  );
  return result.insertId;
};

export const updateUserLastLogin = async (userId) => {
  await db.query('UPDATE users SET last_login = NOW() WHERE id = ?', [userId]);
};
