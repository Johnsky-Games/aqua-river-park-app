// 📁 backend/routes/cart.routes.js

import { Router } from 'express';
const router = Router();
import { getUserCart, addToCart, removeItem, clearCart, updateItemQuantity } from '../controllers/cart.controller';
import { authenticateUser } from '../middlewares/authMiddleware';

// ✅ Obtener el carrito del usuario autenticado
router.get('/', authenticateUser, getUserCart);

// ✅ Agregar un servicio al carrito
router.post('/add', authenticateUser, addToCart);

// ✅ Eliminar un ítem del carrito
router.delete('/item/:itemId', authenticateUser, removeItem);

// ✅ Vaciar todo el carrito
router.delete('/clear', authenticateUser, clearCart);

// ✅ Actualizar cantidad de un ítem
router.put('/item/:itemId', authenticateUser, updateItemQuantity);

export default router;
