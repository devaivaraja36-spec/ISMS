import { apiClient } from './client';

export const mentorApi = {
  getProfile: () => apiClient.get('/mentors/me/'),
  getDashboard: () => apiClient.get('/mentors/me/dashboard/'),
  getStudents: () => apiClient.get('/mentors/me/students/'),
  getTasks: () => apiClient.get('/mentors/me/tasks/'),
  createTask: (taskData) => apiClient.post('/mentors/me/tasks/', taskData),
  getReviews: () => apiClient.get('/mentors/me/reviews/'),
  approveReview: (reviewId, comment = '') => apiClient.post(`/mentors/reviews/${reviewId}/approve/`, { comment }),
  requestChangesReview: (reviewId, comment = '') => apiClient.post(`/mentors/reviews/${reviewId}/request-changes/`, { comment }),
};
