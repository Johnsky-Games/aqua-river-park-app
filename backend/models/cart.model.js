// 📁 backend/models/cart.model.js
import db from '../config/db.js';

export const createCart = async (userId) => {
  const [result] = await db.query(
    'INSERT INTO carts (user_id) VALUES (?)',
    [userId]
  );
  return result.insertId;
};

export const getCartByUserId = async (userId) => {
  const [rows] = await db.query(
    'SELECT * FROM carts WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
    [userId]
  );
  return rows[0];
};