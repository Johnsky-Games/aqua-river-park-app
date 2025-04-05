// 📁 backend/models/freePass.model.js
import db from '../config/db.js';

export const createFreePass = async ({ client_id, qr_code }) => {
  const [result] = await db.query(
    'INSERT INTO free_passes (client_id, qr_code) VALUES (?, ?)',
    [client_id, qr_code]
  );
  return result.insertId;
};

export const redeemFreePass = async (id) => {
  await db.query(
    'UPDATE free_passes SET is_redeemed = TRUE, redeemed_at = NOW() WHERE id = ?',
    [id]
  );
};