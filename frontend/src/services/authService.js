import API from './api.js';

export const authService = {
  // Register user
  async register(userData) {
    const response = await API.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  async login(credentials) {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  },

  // Get current user
  async getMe() {
    const response = await API.get('/auth/me');
    return response.data;
  },

  // Logout user - PERBAIKAN: handle error lebih baik
  async logout() {
    try {
      const response = await API.post('/auth/logout');
      return response.data;
    } catch (error) {
      // Even if backend fails, we still want to logout from frontend
      console.log('Logout API call failed, but continuing with frontend logout');
      return { success: true, message: 'Logged out from frontend' };
    }
  }
};