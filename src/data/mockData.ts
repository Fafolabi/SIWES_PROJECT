
import { User, LogEntry, WeeklyReport, StudentProfile, Notification } from '../types';
import { addDays, subDays, format } from 'date-fns';

// Generate a UUID
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

const today = new Date();

// Mock Users
export const users: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'student',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'supervisor',
    profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 'user-3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
];

// Mock Student Profiles
export const studentProfiles: StudentProfile[] = [
  {
    id: 'profile-1',
    userId: 'user-1',
    matricNumber: 'MAT12345',
    department: 'Computer Science',
    level: '300',
    company: 'Tech Solutions Ltd',
    supervisorId: 'user-2',
    startDate: subDays(today, 30),
    endDate: addDays(today, 60),
  },
];

// Mock Log Entries
export const logEntries: LogEntry[] = [
  {
    id: 'log-1',
    studentId: 'user-1',
    date: subDays(today, 2),
    content: 'Attended orientation and was introduced to the company structure.',
    createdAt: subDays(today, 2),
    updatedAt: subDays(today, 2),
  },
  {
    id: 'log-2',
    studentId: 'user-1',
    date: subDays(today, 1),
    content: 'Participated in a team meeting and was assigned to a project.',
    attachments: ['meeting-notes.pdf'],
    createdAt: subDays(today, 1),
    updatedAt: subDays(today, 1),
  },
  {
    id: 'log-3',
    studentId: 'user-1',
    date: today,
    content: 'Started working on the frontend of the project using React.',
    createdAt: today,
    updatedAt: today,
  },
];

// Mock Weekly Reports
export const weeklyReports: WeeklyReport[] = [
  {
    id: 'report-1',
    studentId: 'user-1',
    weekNumber: 1,
    startDate: subDays(today, 7),
    endDate: today,
    content: `# Week 1 Report\n\n## Activities\n- Company orientation\n- Team introduction\n- Project assignment\n\n## Skills Acquired\n- Understanding of company workflow\n- Basic project management tools\n\n## Challenges\n- Getting familiar with the codebase\n\n## Goals for Next Week\n- Start contributing to the project\n- Complete assigned tasks`,
    status: 'submitted',
    createdAt: subDays(today, 1),
    updatedAt: subDays(today, 1),
  },
];

// Mock Notifications
export const notifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    title: 'Weekly Report Due',
    message: 'Your weekly report for Week 2 is due in 2 days.',
    isRead: false,
    createdAt: subDays(today, 1),
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    title: 'Supervisor Comment',
    message: 'Your supervisor has left a comment on your Week 1 report.',
    isRead: true,
    createdAt: subDays(today, 2),
  },
];

// Authentication utilities
let currentUser: User | null = null;

export const getCurrentUser = () => currentUser;

export const login = (email: string, role?: string): User | null => {
  // For demo purposes, we'll just set the user based on the role
  if (role) {
    const user = users.find(u => u.role === role);
    if (user) {
      currentUser = user;
      return user;
    }
  } else {
    // Try to find user by email
    const user = users.find(u => u.email === email);
    if (user) {
      currentUser = user;
      return user;
    }
  }
  return null;
};

export const logout = () => {
  currentUser = null;
};

// Data retrieval utilities
export const getStudentProfile = (userId: string) => {
  return studentProfiles.find(profile => profile.userId === userId) || null;
};

export const getLogEntries = (studentId: string) => {
  return logEntries.filter(entry => entry.studentId === studentId);
};

export const getWeeklyReports = (studentId: string) => {
  return weeklyReports.filter(report => report.studentId === studentId);
};

export const getNotifications = (userId: string) => {
  return notifications.filter(notif => notif.userId === userId);
};

// Data manipulation utilities
export const addLogEntry = (entry: Omit<LogEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newEntry: LogEntry = {
    ...entry,
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  logEntries.push(newEntry);
  return newEntry;
};

export const addWeeklyReport = (report: Omit<WeeklyReport, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newReport: WeeklyReport = {
    ...report,
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  weeklyReports.push(newReport);
  return newReport;
};

export const updateWeeklyReport = (reportId: string, updates: Partial<WeeklyReport>) => {
  const index = weeklyReports.findIndex(report => report.id === reportId);
  if (index !== -1) {
    weeklyReports[index] = {
      ...weeklyReports[index],
      ...updates,
      updatedAt: new Date(),
    };
    return weeklyReports[index];
  }
  return null;
};
