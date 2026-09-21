import { apiClient } from './client';

export const notificationsApi = {
  getNotifications: () => apiClient.get('/notifications/'),
  markAsRead: (id) => apiClient.post(`/notifications/${id}/read/`),
  markAllAsRead: () => apiClient.post('/notifications/read-all/'),
};
