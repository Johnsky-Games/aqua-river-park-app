// 📁 backend/models/emailLog.model.js
import db from '../config/db.js';

export const logEmail = async ({ client_id, email_to, subject, status }) => {
  await db.query(
    'INSERT INTO email_logs (client_id, email_to, subject, status) VALUES (?, ?, ?, ?)',
    [client_id, email_to, subject, status]
  );
};