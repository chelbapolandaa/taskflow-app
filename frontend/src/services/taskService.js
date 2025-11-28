import API from './api.js';

export const taskService = {
  // Get all tasks
  async getTasks() {
    const response = await API.get('/tasks');
    return response.data;
  },

  // Get single task
  async getTask(id) {
    const response = await API.get(`/tasks/${id}`);
    return response.data;
  },

  // Create new task
  async createTask(taskData) {
    const response = await API.post('/tasks', taskData);
    return response.data;
  },

  // Update task
  async updateTask(id, taskData) {
    const response = await API.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Update task status
  async updateTaskStatus(id, status) {
    const response = await API.patch(`/tasks/${id}/status`, { status });
    return response.data;
  },

  // Delete task
  async deleteTask(id) {
    const response = await API.delete(`/tasks/${id}`);
    return response.data;
  }
};