import { apiClient } from './client';

export const adminApi = {
  getDashboard: () => apiClient.get('/admin/dashboard/'),
  getStudents: () => apiClient.get('/admin/students/'),
  createStudent: (studentData) => apiClient.post('/admin/students/', studentData),
  getMentors: () => apiClient.get('/admin/mentors/'),
  createMentor: (mentorData) => apiClient.post('/admin/mentors/', mentorData),
  getInternships: () => apiClient.get('/internships/'),
  createInternship: (internshipData) => apiClient.post('/internships/', internshipData),
  getReports: () => apiClient.get('/admin/reports/'),
  getAuditLogs: () => apiClient.get('/admin/audit-logs/'),
};
