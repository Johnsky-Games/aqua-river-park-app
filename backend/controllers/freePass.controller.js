// 📁 backend/controllers/freePass.controller.js

import db from '../config/db.js';

// ✅ Obtener todos los pases gratuitos
export const getAllFreePasses = async (req, res) => {
    try {
        const [passes] = await db.query('SELECT * FROM free_passes');
        res.json(passes);
    } catch (error) {
        console.error('Error al obtener los pases:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// ✅ Obtener pase gratuito por ID
export const getFreePassById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM free_passes WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Pase no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener el pase:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// ✅ Crear nuevo pase gratuito
export const createFreePass = async (req, res) => {
    const { client_id, qr_code } = req.body;
    try {
        const [existing] = await db.query(
            'SELECT * FROM free_passes WHERE qr_code = ?',
            [qr_code]
        );
        if (existing.length > 0) return res.status(400).json({ message: 'El QR ya fue generado' });

        await db.query(
            'INSERT INTO free_passes (client_id, qr_code) VALUES (?, ?)',
            [client_id, qr_code]
        );
        res.status(201).json({ message: 'Pase gratuito creado con éxito' });
    } catch (error) {
        console.error('Error al crear pase:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// ✅ Redimir pase
export const redeemFreePass = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query(
            'UPDATE free_passes SET is_redeemed = 1, redeemed_at = NOW() WHERE id = ?',
            [id]
        );
        res.json({ message: 'Pase redimido con éxito' });
    } catch (error) {
        console.error('Error al redimir pase:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// ✅ Eliminar pase gratuito
export const deleteFreePass = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM free_passes WHERE id = ?', [id]);
        res.json({ message: 'Pase eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar pase:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};
