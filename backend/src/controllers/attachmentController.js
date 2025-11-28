import Task from '../models/Task.js';
import { validationResult } from 'express-validator';

// @desc    Add attachment to task
// @route   POST /api/tasks/:id/attachments
// @access  Private
export const addAttachment = async (req, res) => {
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

    // Untuk sekarang kita simulasikan file upload
    // Nanti bisa diintegrasikan dengan Multer & Cloudinary
    const attachment = {
      filename: req.body.filename || `file-${Date.now()}`,
      originalName: req.body.originalName,
      url: req.body.url, // URL dari Cloudinary/CDN
      size: req.body.size,
      mimetype: req.body.mimetype,
      uploadedBy: req.user.id
    };

    task.attachments.push(attachment);
    await task.save();

    // Populate untuk return data yang lengkap
    await task.populate('attachments.uploadedBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Attachment added successfully',
      data: task.attachments[task.attachments.length - 1]
    });
  } catch (error) {
    console.error('Add attachment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding attachment'
    });
  }
};

// @desc    Get task attachments
// @route   GET /api/tasks/:id/attachments
// @access  Private
export const getAttachments = async (req, res) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    }).populate('attachments.uploadedBy', 'name email');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.json({
      success: true,
      count: task.attachments.length,
      data: task.attachments
    });
  } catch (error) {
    console.error('Get attachments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching attachments'
    });
  }
};

// @desc    Delete attachment
// @route   DELETE /api/tasks/:taskId/attachments/:attachmentId
// @access  Private
export const deleteAttachment = async (req, res) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.taskId, 
      user: req.user.id 
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Cari attachment
    const attachment = task.attachments.id(req.params.attachmentId);
    if (!attachment) {
      return res.status(404).json({
        success: false,
        message: 'Attachment not found'
      });
    }

    // Hanya yang upload atau task owner yang bisa delete
    if (attachment.uploadedBy.toString() !== req.user.id && task.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this attachment'
      });
    }

    // Hapus attachment
    task.attachments.pull(req.params.attachmentId);
    await task.save();

    res.json({
      success: true,
      message: 'Attachment deleted successfully'
    });
  } catch (error) {
    console.error('Delete attachment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting attachment'
    });
  }
};