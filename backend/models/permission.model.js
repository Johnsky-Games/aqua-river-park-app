// 📁 backend/models/permission.model.js
import db from '../config/db.js';

export const getAllPermissions = async () => {
  const [permissions] = await db.query('SELECT * FROM permissions');
  return permissions;
};

export const assignPermissionToRole = async (role_id, permission_id) => {
  await db.query(
    'INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)',
    [role_id, permission_id]
  );
};