import { apiClient } from './client';

export const authApi = {
  login: async (email, password) => {
    const data = await apiClient.post('/auth/login/', { email, password });
    if (data.access) {
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },
  logout: async () => {
    try {
      await apiClient.post('/auth/logout/');
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  },
  getCurrentUser: async () => {
    return apiClient.get('/auth/me/');
  },
};
