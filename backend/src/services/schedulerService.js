import { notificationService } from './notificationService.js';

class SchedulerService {
  constructor() {
    this.intervals = [];
  }

  startDueDateChecker() {
    // Check due dates every hour
    const interval = setInterval(async () => {
      try {
        console.log('🕐 Checking for due tasks...');
        const notifiedCount = await notificationService.checkDueTasks();
        if (notifiedCount > 0) {
          console.log(`🔔 Sent ${notifiedCount} due date notifications`);
        }
      } catch (error) {
        console.error('Error in due date checker:', error);
      }
    }, 60 * 60 * 1000); // Every hour

    this.intervals.push(interval);

    // Run immediately on startup
    notificationService.checkDueTasks();

    console.log('✅ Due date checker started');
  }

  stopAll() {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals = [];
    console.log('🛑 All schedulers stopped');
  }
}

export default new SchedulerService();