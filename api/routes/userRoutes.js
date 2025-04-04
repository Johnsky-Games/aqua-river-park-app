import express from 'express';
import {
  getProfile,
  updateProfile,
  updateEmail,
  updatePassword,
  uploadAvatar
} from '../controllers/userController.js';

import { authenticate } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Proteger todas las rutas
router.use(authenticate);

router.get('/me', getProfile);
router.put('/me', updateProfile);
router.put('/me/email', updateEmail);
router.put('/me/password', updatePassword);
router.post('/me/avatar', upload.single('avatar'), uploadAvatar);

export default router;
