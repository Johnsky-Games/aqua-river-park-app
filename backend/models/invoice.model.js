// 📁 backend/models/invoice.model.js
import db from '../config/db.js';

export const registerInvoice = async ({ client_id, invoice_number }) => {
    const [result] = await db.query(
        'INSERT INTO invoices (client_id, invoice_number) VALUES (?, ?)',
        [client_id, invoice_number]
    );
    return result.insertId;
};

export const getInvoicesByClient = async (client_id) => {
    const [rows] = await db.query(
        'SELECT * FROM invoices WHERE client_id = ?',
        [client_id]
    );
    return rows;
};
