// 📁 backend/models/service.model.js
import db from '../config/db.js';

export const getAllServices = async () => {
  const [services] = await db.query('SELECT * FROM services');
  return services;
};