// 📁 backend/controllers/qrScan.controller.js

import db from '../config/db.js';

// ✅ Obtener todos los escaneos de códigos QR
export const getAllQrScans = async (req, res) => {
  try {
    const [scans] = await db.query('SELECT * FROM qr_scans');
    res.json(scans);
  } catch (error) {
    console.error('Error al obtener los escaneos:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// ✅ Registrar un nuevo escaneo
export const createQrScan = async (req, res) => {
  const { free_pass_id, scanned_by } = req.body;

  try {
    await db.query(
      'INSERT INTO qr_scans (free_pass_id, scanned_by) VALUES (?, ?)',
      [free_pass_id, scanned_by]
    );
    res.status(201).json({ message: 'Escaneo registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar el escaneo:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// ✅ Obtener escaneos por ID de pase gratuito
export const getQrScansByFreePass = async (req, res) => {
  const { free_pass_id } = req.params;

  try {
    const [scans] = await db.query('SELECT * FROM qr_scans WHERE free_pass_id = ?', [free_pass_id]);
    res.json(scans);
  } catch (error) {
    console.error('Error al obtener escaneos por pase:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
