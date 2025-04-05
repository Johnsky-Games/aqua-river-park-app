// 📁 backend/controllers/invoice.controller.js

import db from '../config/db.js';

// ✅ Obtener todas las facturas
export const getAllInvoices = async (req, res) => {
    try {
        const [invoices] = await db.query('SELECT * FROM invoices');
        res.json(invoices);
    } catch (error) {
        console.error('Error al obtener las facturas:', error);
        res.status(500).json({ message: 'Error al obtener facturas' });
    }
};

// ✅ Obtener factura por ID
export const getInvoiceById = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM invoices WHERE id = ?', [req.params.id]);
        const invoice = result[0];
        if (!invoice) return res.status(404).json({ message: 'Factura no encontrada' });
        res.json(invoice);
    } catch (error) {
        console.error('Error al obtener la factura:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// ✅ Registrar una factura (vinculada a cliente)
export const createInvoice = async (req, res) => {
    const { client_id, invoice_number } = req.body;

    try {
        const [existing] = await db.query(
            'SELECT * FROM invoices WHERE client_id = ? AND invoice_number = ?',
            [client_id, invoice_number]
        );

        if (existing.length > 0) {
            return res.status(409).json({ message: 'Esta factura ya fue registrada por el cliente.' });
        }

        await db.query(
            'INSERT INTO invoices (client_id, invoice_number) VALUES (?, ?)',
            [client_id, invoice_number]
        );

        res.status(201).json({ message: 'Factura registrada correctamente.' });
    } catch (error) {
        console.error('Error al registrar la factura:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// ✅ Eliminar factura
export const deleteInvoice = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM invoices WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Factura no encontrada' });
        res.json({ message: 'Factura eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la factura:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};
