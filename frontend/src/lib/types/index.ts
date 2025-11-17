// User Types
export type UserRole = 'admin' | 'manager' | 'collaborator';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Project Types
export type ProjectStatus = 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
export type ProjectPriority = 'urgent' | 'high' | 'medium' | 'low';

export interface Project {
  id: number;
  name: string;
  description?: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  startDate?: string;
  endDate?: string;
  progress: number;
  color?: string;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  members?: ProjectMember[];
  tasks?: Task[];
}

export interface ProjectMember {
  id: number;
  projectId: number;
  userId: number;
  role: string;
  user?: User;
  createdAt: string;
}

// Task Types
export type TaskStatus = 'todo' | 'in-progress' | 'in-review' | 'done';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: ProjectPriority;
  projectId: number;
  assignedTo?: number;
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  tags?: string[];
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  project?: Project;
  assignedUser?: User;
  createdByUser?: User;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Dashboard Stats Types
export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalTasks: number;
  todoTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  overdueTasks: number;
  myTasks: number;
  recentProjects: Project[];
  recentTasks: Task[];
}

// Filter Types
export interface ProjectFilters {
  status?: ProjectStatus;
  priority?: ProjectPriority;
  search?: string;
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: ProjectPriority;
  projectId?: number;
  assignedTo?: number;
  search?: string;
}
