export type UserRole = 'student' | 'mentor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  department: string;
  mentorName?: string;
  mentorId?: string;
  projectTitle?: string;
  status?: string;
  progress?: number;
  startDate?: string;
  endDate?: string;
}

export interface Mentor {
  id: string;
  name: string;
  email: string;
  department: string;
  assignedStudents: number;
  maxStudents?: number;
  phone?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Under Review';
  priority?: 'Low' | 'Medium' | 'High';
  assignedTo?: string;
  mentorFeedback?: string;
}

export interface DailyActivity {
  id: string;
  date: string;
  hoursWorked: number;
  tasksCompleted: string;
  learnings: string;
  challenges: string;
  status: 'Approved' | 'Pending' | 'Needs Revision';
  feedback?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  studentName?: string;
  mentorName?: string;
  status: string;
  techStack?: string[];
  startDate?: string;
  githubUrl?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type?: 'info' | 'warning' | 'success' | 'alert';
}

export interface WorkMemo {
  id: string;
  studentName: string;
  date: string;
  summary: string;
  status: string;
  comments?: string;
}
