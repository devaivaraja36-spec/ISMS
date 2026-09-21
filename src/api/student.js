import { apiClient } from './client';

export const studentApi = {
  getProfile: () => apiClient.get('/students/me/'),
  getDashboard: () => apiClient.get('/students/me/dashboard/'),
  getTasks: () => apiClient.get('/students/me/tasks/'),
  updateTaskStatus: (taskId, status) => apiClient.patch(`/students/me/tasks/${taskId}/`, { status }),
  getActivities: () => apiClient.get('/students/me/activities/'),
  submitActivity: (activityData) => apiClient.post('/students/me/activities/', activityData),
  getProject: () => apiClient.get('/students/me/project/'),
};
