import Notification from '../models/Notification.js';
import Task from '../models/Task.js';

export const notificationService = {
  // Create notification
  async createNotification(notificationData) {
    return await Notification.create(notificationData);
  },

  // Create due date reminder notification
  async createDueDateReminder(task, daysUntilDue = 1) {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const daysDiff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    let message = '';
    let type = 'info';

    if (daysDiff === 0) {
      message = `"${task.title}" is due today!`;
      type = 'urgent';
    } else if (daysDiff === 1) {
      message = `"${task.title}" is due tomorrow!`;
      type = 'warning';
    } else if (daysDiff === daysUntilDue) {
      message = `"${task.title}" is due in ${daysDiff} days`;
      type = 'warning';
    } else if (daysDiff < 0) {
      message = `"${task.title}" is overdue by ${Math.abs(daysDiff)} days!`;
      type = 'urgent';
    }

    if (message) {
      return await this.createNotification({
        title: 'Due Date Reminder',
        message,
        type,
        user: task.user,
        task: task._id,
        relatedDate: task.dueDate,
        actionUrl: `/tasks`
      });
    }
  },

  // Check for due tasks and create notifications - FIXED QUERY
  async checkDueTasks() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow
      
      const dayAfterTomorrow = new Date(today);
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2); // Start of day after tomorrow

      // Find tasks that are due today, tomorrow, or overdue
      // FIXED: Use proper date queries instead of $in with mixed types
      const dueTasks = await Task.find({
        $and: [
          { dueDate: { $ne: null } }, // Only tasks with due dates
          { status: { $ne: 'done' } }, // Only tasks that are not completed
          {
            $or: [
              // Due today
              { 
                dueDate: { 
                  $gte: today,
                  $lt: tomorrow
                } 
              },
              // Due tomorrow  
              { 
                dueDate: { 
                  $gte: tomorrow,
                  $lt: dayAfterTomorrow
                } 
              },
              // Overdue (due date is before today)
              { 
                dueDate: { 
                  $lt: today
                } 
              }
            ]
          }
        ]
      }).populate('user');

      console.log(`🔔 Found ${dueTasks.length} tasks with due dates`);

      let notificationCount = 0;
      for (const task of dueTasks) {
        const notification = await this.createDueDateReminder(task, 2);
        if (notification) {
          notificationCount++;
        }
      }

      return notificationCount;
    } catch (error) {
      console.error('Error checking due tasks:', error);
      return 0;
    }
  },

  // Create task completion notification
  async createTaskCompletionNotification(task) {
    return await this.createNotification({
      title: 'Task Completed! 🎉',
      message: `You've completed "${task.title}"`,
      type: 'success',
      user: task.user,
      task: task._id,
      actionUrl: `/tasks`
    });
  },

  // Create new task assignment notification
  async createNewTaskNotification(task) {
    return await this.createNotification({
      title: 'New Task Created',
      message: `You created a new task: "${task.title}"`,
      type: 'info',
      user: task.user,
      task: task._id,
      actionUrl: `/tasks`
    });
  }
};