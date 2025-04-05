// 📁 backend/routes/auth.routes.js

import { Router } from 'express';
const router = Router();
import { login, register, confirmAccount, forgotPassword, resetPassword, getProfile } from '../controllers/auth.controller';
import { validateToken } from '../middlewares/auth.middleware';

// 🔐 Autenticación y seguridad
router.post('/login', login);
router.post('/register', register);
router.post('/confirm/:token', confirmAccount);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// 🔒 Rutas protegidas
router.get('/me', validateToken, getProfile);

export default router;
