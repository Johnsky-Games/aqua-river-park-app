import { Router } from 'express';
const router = Router();
import { getUserProfile, updateProfile, updatePassword, uploadAvatar } from '../controllers/userController';
import auth from '../middlewares/authMiddleware';
import { single } from '../middlewares/uploadMiddleware';

router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateProfile);
router.put('/password', auth, updatePassword);
router.put('/avatar', auth, single('avatar'), uploadAvatar);

export default router;
