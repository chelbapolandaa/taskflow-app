import Task from '../models/Task.js';
import { validationResult } from 'express-validator';
import { notificationService } from '../services/notificationService.js';

// @desc    Get all tasks for logged in user
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching tasks'
    });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
export const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching task'
    });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const task = await Task.create({
      ...req.body,
      user: req.user.id
    });

    // 🔔 Create notification for new task
    try {
      await notificationService.createNewTaskNotification(task);
      console.log('✅ New task notification created');
    } catch (notificationError) {
      console.error('Notification error:', notificationError);
      // Don't fail the request if notification fails
    }

    // 🔔 Check if due date is soon and create reminder
    if (task.dueDate) {
      try {
        await notificationService.createDueDateReminder(task, 2);
        console.log('✅ Due date reminder created');
      } catch (reminderError) {
        console.error('Due date reminder error:', reminderError);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating task'
    });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    let task = await Task.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating task'
    });
  }
};

// @desc    Update task status/column
// @route   PATCH /api/tasks/:id/status
// @access  Private
export const updateTaskStatus = async (req, res) => {
  try {
    const { status, column } = req.body;

    console.log('🔄 Update task request:', {
      taskId: req.params.id,
      status: status,
      column: column,
      userId: req.user.id
    });

    // Accept both status (old) and column (new) for compatibility
    const newStatus = column || status;

    if (!['backlog', 'todo', 'in-progress', 'review', 'done'].includes(newStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be one of: backlog, todo, in-progress, review, done'
      });
    }

    let task = await Task.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { 
        status: newStatus, // Untuk compatibility
        column: newStatus  // Untuk Kanban
      },
      { new: true }
    );

    // 🔔 Create completion notification if task is marked as done
    if (newStatus === 'done') {
      try {
        await notificationService.createTaskCompletionNotification(task);
        console.log('✅ Task completion notification created');
      } catch (notificationError) {
        console.error('Completion notification error:', notificationError);
      }
    }

    console.log('✅ Task updated successfully:', {
      taskId: task._id,
      newColumn: task.column,
      newStatus: task.status
    });

    res.json({
      success: true,
      message: 'Task status updated successfully',
      data: task
    });
  } catch (error) {
    console.error('❌ Update task status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating task status'
    });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting task'
    });
  }
};