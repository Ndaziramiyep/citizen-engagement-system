export type UserRole = 'citizen' | 'government' | 'admin';

export type ComplaintStatus = 'new' | 'under_review' | 'assigned' | 'in_progress' | 'scheduled' | 'resolved' | 'closed';
export type ComplaintPriority = 'low' | 'medium' | 'high' | 'urgent';
export type SubmissionType = 'complaint' | 'feedback' | 'suggestion';
export type UpdateType = 'status_change' | 'assignment' | 'comment' | 'resolution';
export type NotificationType = 'status' | 'message' | 'resolution' | 'submission' | 'assignment' | 'system';
export type SenderType = 'citizen' | 'government' | 'system';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  role: UserRole;
  departmentId?: number;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  token?: string;
}

export interface Department {
  id: number;
  name: string;
  description?: string;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Complaint {
  id: number;
  trackingId: string;
  userId?: number;
  submissionType: SubmissionType;
  category: string;
  subject: string;
  description: string;
  location: string;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  departmentId?: number;
  assigneeId?: number;
  dueDate?: string;
  submitterName?: string;
  submitterEmail?: string;
  submitterPhone?: string;
  submitterAddress?: string;
  isAnonymous: boolean;
  createdAt: string;
  updatedAt: string;
  attachments?: Attachment[];
  updates?: Update[];
  messages?: Message[];
}

export interface Attachment {
  id: number;
  complaintId: number;
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  createdAt: string;
}

export interface Update {
  id: number;
  complaintId: number;
  userId?: number;
  updateType: UpdateType;
  previousStatus?: string;
  newStatus?: string;
  previousDepartmentId?: number;
  newDepartmentId?: number;
  previousAssigneeId?: number;
  newAssigneeId?: number;
  comment?: string;
  isPublic: boolean;
  createdAt: string;
}

export interface Message {
  id: number;
  complaintId: number;
  senderId?: number;
  senderType: SenderType;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface Notification {
  id: number;
  userId: number;
  complaintId?: number;
  type: NotificationType;
  title: string;
  description: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface NotificationSettings {
  id: number;
  userId: number;
  statusEmail: boolean;
  messageEmail: boolean;
  resolutionEmail: boolean;
  statusApp: boolean;
  messageApp: boolean;
  resolutionApp: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Feedback {
  id: number;
  complaintId: number;
  userId?: number;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 