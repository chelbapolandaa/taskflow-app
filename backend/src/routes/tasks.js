import express from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus
} from '../controllers/taskController.js';
// ✅ Import attachment controllers
import {
  addAttachment,
  getAttachments,
  deleteAttachment
} from '../controllers/attachmentController.js';
import { protect } from '../middleware/auth.js';
import { taskValidation, updateTaskValidation } from '../middleware/validation.js';

const router = express.Router();

// All routes are protected (require authentication)
router.use(protect);

router.route('/')
  .get(getTasks)
  .post(taskValidation, createTask);

router.route('/:id')
  .get(getTask)
  .put(updateTaskValidation, updateTask)
  .delete(deleteTask);

router.patch('/:id/status', updateTaskStatus);

// ✅ Attachment routes
router.route('/:id/attachments')
  .get(getAttachments)
  .post(addAttachment);

router.delete('/:taskId/attachments/:attachmentId', deleteAttachment);

// Test route
router.get('/', (req, res) => {
  res.json({
    message: 'Tasks routes are working!',
    user: req.user.id,
    endpoints: {
      getAll: 'GET /api/tasks',
      create: 'POST /api/tasks',
      getOne: 'GET /api/tasks/:id',
      update: 'PUT /api/tasks/:id',
      delete: 'DELETE /api/tasks/:id',
      updateStatus: 'PATCH /api/tasks/:id/status',
      // ✅ Tambahkan attachment endpoints
      getAttachments: 'GET /api/tasks/:id/attachments',
      addAttachment: 'POST /api/tasks/:id/attachments',
      deleteAttachment: 'DELETE /api/tasks/:taskId/attachments/:attachmentId'
    }
  });
});

export default router;