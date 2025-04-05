// 📁 backend/routes/clients.routes.js

import { Router } from 'express';
const router = Router();
import { getAllClients, getClientById, createClient, updateClient, deleteClient } from '../controllers/clients.controller';
import { verifyToken, requireRole } from '../middlewares/auth.middleware';

// 📌 Obtener todos los clientes (solo admin)
router.get('/', verifyToken, requireRole(['admin']), getAllClients);

// 📌 Obtener cliente por ID (solo admin)
router.get('/:id', verifyToken, requireRole(['admin']), getClientById);

// ✅ Registrar nuevo cliente
router.post('/', createClient);

// ✏️ Actualizar cliente (por admin o cliente mismo)
router.put('/:id', verifyToken, updateClient);

// ❌ Eliminar cliente (solo admin)
router.delete('/:id', verifyToken, requireRole(['admin']), deleteClient);

export default router;
