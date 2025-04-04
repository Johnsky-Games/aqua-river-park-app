import express from 'express';
import {
  getDashboardData,
  getClientsView,
  getAdminUsers,
  getAdminReports
} from '../controllers/protectedController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  authorizeRole,
  authorizePermission
} from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/dashboard', verifyToken, authorizeRole('admin', 'editor'), getDashboardData);
router.get('/clients', verifyToken, authorizePermission('view_clients'), getClientsView);
router.get('/admin/users', verifyToken, authorizeRole('admin'), authorizePermission('manage_users'), getAdminUsers);
router.get('/admin/reports', verifyToken, authorizeRole('admin'), getAdminReports);

export default router;
