// 📁 backend/models/qrScan.model.js
import db from '../config/db.js';

export const logQrScan = async ({ free_pass_id, scanned_by }) => {
  await db.query(
    'INSERT INTO qr_scans (free_pass_id, scanned_by) VALUES (?, ?)',
    [free_pass_id, scanned_by]
  );
};