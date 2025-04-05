// 📁 backend/controllers/cart_items.controller.js

import { query } from '../config/db';

// ✅ Obtener ítems del carrito
export async function getCartItems(req, res) {
    const { cartId } = req.params;
    try {
        const [items] = await query(
            `SELECT ci.id, ci.quantity, s.id as service_id, s.title, s.price, s.image_url
       FROM cart_items ci
       INNER JOIN services s ON ci.service_id = s.id
       WHERE ci.cart_id = ?`,
            [cartId]
        );
        res.json(items);
    } catch (error) {
        console.error('Error al obtener ítems del carrito:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}

// ✅ Agregar ítem al carrito
export async function addItemToCart(req, res) {
    const { cartId, serviceId, quantity } = req.body;
    try {
        await query(
            `INSERT INTO cart_items (cart_id, service_id, quantity) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
            [cartId, serviceId, quantity]
        );
        res.json({ message: 'Ítem agregado al carrito.' });
    } catch (error) {
        console.error('Error al agregar ítem al carrito:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}

// ✅ Actualizar cantidad de un ítem
export async function updateItemQuantity(req, res) {
    const { itemId } = req.params;
    const { quantity } = req.body;
    try {
        await query(
            'UPDATE cart_items SET quantity = ? WHERE id = ?',
            [quantity, itemId]
        );
        res.json({ message: 'Cantidad actualizada correctamente.' });
    } catch (error) {
        console.error('Error al actualizar cantidad del ítem:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}

// ✅ Eliminar ítem del carrito
export async function removeItemFromCart(req, res) {
    const { itemId } = req.params;
    try {
        await query('DELETE FROM cart_items WHERE id = ?', [itemId]);
        res.json({ message: 'Ítem eliminado del carrito.' });
    } catch (error) {
        console.error('Error al eliminar ítem del carrito:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}
