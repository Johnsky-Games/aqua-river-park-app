// 📁 backend/routes/cart_items.routes.js

import { Router } from 'express';
const router = Router();
import { getItemsByCart, addItem, deleteItem, updateItem } from '../controllers/cart_item.controller';
import { authenticateUser } from '../middlewares/authMiddleware';

// ✅ Obtener todos los ítems de un carrito (por ID de carrito)
router.get('/:cartId', authenticateUser, getItemsByCart);

// ✅ Agregar ítem directamente (por admin o proceso especial)
router.post('/', authenticateUser, addItem);

// ✅ Eliminar ítem específico
router.delete('/:id', authenticateUser, deleteItem);

// ✅ Actualizar cantidad del ítem
router.put('/:id', authenticateUser, updateItem);

export default router;
