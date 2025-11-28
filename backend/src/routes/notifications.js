import express from 'express';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
} from '../controllers/notificationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/', getNotifications);
router.patch('/:id/read', markAsRead);
router.patch('/read-all', markAllAsRead);
router.delete('/:id', deleteNotification);

// Test route
router.get('/test', (req, res) => {
  res.json({
    message: 'Notifications routes are working!',
    user: req.user.id,
    endpoints: {
      getAll: 'GET /api/notifications',
      markRead: 'PATCH /api/notifications/:id/read',
      markAllRead: 'PATCH /api/notifications/read-all',
      delete: 'DELETE /api/notifications/:id'
    }
  });
});

export default router;