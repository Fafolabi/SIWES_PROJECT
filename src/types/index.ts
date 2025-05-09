
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'supervisor' | 'admin';
  profileImage?: string;
}

export interface LogEntry {
  id: string;
  studentId: string;
  date: Date;
  content: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WeeklyReport {
  id: string;
  studentId: string;
  weekNumber: number;
  startDate: Date;
  endDate: Date;
  content: string;
  status: 'draft' | 'submitted' | 'reviewed';
  supervisorFeedback?: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentProfile {
  id: string;
  userId: string;
  matricNumber: string;
  department: string;
  level: string;
  company: string;
  supervisorId?: string;
  startDate: Date;
  endDate: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}
