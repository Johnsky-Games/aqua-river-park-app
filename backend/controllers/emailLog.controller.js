// 📁 backend/controllers/emailLog.controller.js

import db from '../config/db.js';

// ✅ Obtener todos los registros de email
export const getAllEmailLogs = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM email_logs');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener los logs de correo:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// ✅ Obtener un email log por ID
export const getEmailLogById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM email_logs WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener el registro de correo:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// ✅ Crear nuevo registro de log de correo
export const createEmailLog = async (req, res) => {
    const { client_id, email_to, subject, status = 'sent' } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO email_logs (client_id, email_to, subject, status) VALUES (?, ?, ?, ?)',
            [client_id, email_to, subject, status]
        );
        res.status(201).json({ id: result.insertId, message: 'Registro de correo creado con éxito' });
    } catch (error) {
        console.error('Error al crear el log de correo:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// ✅ Eliminar un log de correo
export const deleteEmailLog = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM email_logs WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.json({ message: 'Registro de correo eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el log de correo:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};
