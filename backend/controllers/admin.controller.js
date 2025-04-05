// 📁 backend/controllers/admin.controller.js

import { query } from '../config/db';

// ✅ Obtener información general del dashboard
export async function getDashboardInfo(req, res) {
    try {
        const [[userCount]] = await query('SELECT COUNT(*) as total FROM users');
        const [[clientCount]] = await query('SELECT COUNT(*) as total FROM clients');
        const [[invoiceCount]] = await query('SELECT COUNT(*) as total FROM invoices');
        const [[freePassCount]] = await query('SELECT COUNT(*) as total FROM free_passes');
        const [[qrScanCount]] = await query('SELECT COUNT(*) as total FROM qr_scans');

        res.json({
            users: userCount.total,
            clients: clientCount.total,
            invoices: invoiceCount.total,
            freePasses: freePassCount.total,
            qrScans: qrScanCount.total
        });
    } catch (error) {
        console.error('Error al obtener datos del dashboard:', error);
        res.status(500).json({ message: 'Error al obtener estadísticas' });
    }
}

// ✅ Obtener lista de todos los usuarios con su rol
export async function getAllUsersWithRoles(req, res) {
    try {
        const [users] = await query(
            `SELECT u.id, u.name, u.email, r.name AS role
       FROM users u
       LEFT JOIN roles r ON u.role_id = r.id`
        );
        res.json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}

// ✅ Cambiar el rol de un usuario
export async function updateUserRole(req, res) {
    const { userId, roleId } = req.body;
    try {
        await query('UPDATE users SET role_id = ? WHERE id = ?', [roleId, userId]);
        res.json({ message: 'Rol de usuario actualizado correctamente.' });
    } catch (error) {
        console.error('Error al actualizar rol:', error);
        res.status(500).json({ message: 'Error al actualizar el rol del usuario' });
    }
}
