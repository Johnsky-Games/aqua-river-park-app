// 📁 backend/models/role.model.js
import db from '../config/db.js';

export const getAllRoles = async () => {
  const [rows] = await db.query('SELECT * FROM roles');
  return rows;
};

export const createRole = async (name) => {
  const [result] = await db.query(
	'INSERT INTO roles (name) VALUES (?)',
	[name]
  );
  return result.insertId;
};