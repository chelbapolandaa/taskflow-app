import API from './api.js';

export const notificationService = {
  // Get all notifications
  async getNotifications() {
    const response = await API.get('/notifications');
    return response.data;
  },

  // Mark notification as read
  async markAsRead(notificationId) {
    const response = await API.patch(`/notifications/${notificationId}/read`);
    return response.data;
  },

  // Mark all notifications as read
  async markAllAsRead() {
    const response = await API.patch('/notifications/read-all');
    return response.data;
  },

  // Delete notification
  async deleteNotification(notificationId) {
    const response = await API.delete(`/notifications/${notificationId}`);
    return response.data;
  }
};