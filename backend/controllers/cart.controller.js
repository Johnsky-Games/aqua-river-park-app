// 📁 backend/controllers/cart.controller.js

import { query } from '../config/db';

// ✅ Crear un nuevo carrito para un usuario (si no existe ya uno activo)
export async function createCart(req, res) {
    const { userId } = req.body;
    try {
        // Verificar si ya existe un carrito
        const [existing] = await query(
            'SELECT id FROM carts WHERE user_id = ? LIMIT 1',
            [userId]
        );

        if (existing.length > 0) {
            return res.status(200).json({ cartId: existing[0].id });
        }

        const [result] = await query(
            'INSERT INTO carts (user_id) VALUES (?)',
            [userId]
        );
        res.status(201).json({ cartId: result.insertId });
    } catch (error) {
        console.error('Error al crear el carrito:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}

// ✅ Obtener el carrito de un usuario
export async function getCartByUser(req, res) {
    const { userId } = req.params;
    try {
        const [cart] = await query(
            'SELECT * FROM carts WHERE user_id = ? LIMIT 1',
            [userId]
        );
        if (cart.length === 0) return res.status(404).json({ message: 'Carrito no encontrado' });
        res.json(cart[0]);
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}

// ✅ Eliminar el carrito de un usuario (y sus items relacionados)
export async function deleteCart(req, res) {
    const { cartId } = req.params;
    try {
        await query('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);
        await query('DELETE FROM carts WHERE id = ?', [cartId]);
        res.json({ message: 'Carrito eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar el carrito:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}
