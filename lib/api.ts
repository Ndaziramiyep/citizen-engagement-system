import axios from 'axios';
import { ApiResponse, PaginatedResponse, Complaint, User, Department, Notification, Message, Update, Attachment, NotificationSettings } from './types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const auth = {
  register: async (data: { firstName: string; lastName: string; email: string; password: string; phone?: string; address?: string }) => {
    const response = await api.post<ApiResponse<User>>('/auth/register', data);
    return response.data;
  },
  login: async (data: { email: string; password: string }) => {
    const response = await api.post<ApiResponse<User>>('/auth/login', data);
    return response.data;
  },
  logout: async () => {
    const response = await api.post<ApiResponse<void>>('/auth/logout');
    return response.data;
  },
  forgotPassword: async (email: string) => {
    const response = await api.post<ApiResponse<void>>('/auth/forgot-password', { email });
    return response.data;
  },
  resetPassword: async (data: { token: string; password: string }) => {
    const response = await api.post<ApiResponse<void>>('/auth/reset-password', data);
    return response.data;
  },
  verifyEmail: async (token: string) => {
    const response = await api.get<ApiResponse<void>>(`/auth/verify-email?token=${token}`);
    return response.data;
  },
  resendVerification: async (email: string) => {
    const response = await api.post<ApiResponse<void>>('/auth/resend-verification', { email });
    return response.data;
  },
};

// User API calls
export const users = {
  getCurrentUser: async () => {
    const response = await api.get<ApiResponse<User>>('/users/me');
    return response.data;
  },
  updateCurrentUser: async (data: Partial<User>) => {
    const response = await api.put<ApiResponse<User>>('/users/me', data);
    return response.data;
  },
  getUser: async (id: number) => {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    return response.data;
  },
  updateUser: async (id: number, data: Partial<User>) => {
    const response = await api.put<ApiResponse<User>>(`/users/${id}`, data);
    return response.data;
  },
  deleteUser: async (id: number) => {
    const response = await api.delete<ApiResponse<void>>(`/users/${id}`);
    return response.data;
  },
  listUsers: async (params: { page?: number; limit?: number; role?: string }) => {
    const response = await api.get<PaginatedResponse<User>>('/users', { params });
    return response.data;
  },
};

// Complaint API calls
export const complaints = {
  create: async (data: FormData) => {
    const response = await api.post<ApiResponse<Complaint>>('/complaints', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  get: async (id: number) => {
    const response = await api.get<ApiResponse<Complaint>>(`/complaints/${id}`);
    return response.data;
  },
  update: async (id: number, data: Partial<Complaint>) => {
    const response = await api.put<ApiResponse<Complaint>>(`/complaints/${id}`, data);
    return response.data;
  },
  track: async (trackingId: string) => {
    const response = await api.get<ApiResponse<Complaint>>(`/complaints/track/${trackingId}`);
    return response.data;
  },
  list: async (params: { page?: number; limit?: number; status?: string; category?: string }) => {
    const response = await api.get<PaginatedResponse<Complaint>>('/complaints', { params });
    return response.data;
  },
  addAttachment: async (id: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<ApiResponse<Attachment>>(`/complaints/${id}/attachments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  deleteAttachment: async (id: number, attachmentId: number) => {
    const response = await api.delete<ApiResponse<void>>(`/complaints/${id}/attachments/${attachmentId}`);
    return response.data;
  },
};

// Department API calls
export const departments = {
  list: async () => {
    const response = await api.get<ApiResponse<Department[]>>('/departments');
    return response.data;
  },
  get: async (id: number) => {
    const response = await api.get<ApiResponse<Department>>(`/departments/${id}`);
    return response.data;
  },
};

// Notification API calls
export const notifications = {
  list: async (params: { page?: number; limit?: number; isRead?: boolean }) => {
    const response = await api.get<PaginatedResponse<Notification>>('/notifications', { params });
    return response.data;
  },
  markAsRead: async (id: number) => {
    const response = await api.put<ApiResponse<void>>(`/notifications/${id}/read`);
    return response.data;
  },
  markAllAsRead: async () => {
    const response = await api.put<ApiResponse<void>>('/notifications/read-all');
    return response.data;
  },
  getSettings: async () => {
    const response = await api.get<ApiResponse<NotificationSettings>>('/notifications/settings');
    return response.data;
  },
  updateSettings: async (data: Partial<NotificationSettings>) => {
    const response = await api.put<ApiResponse<NotificationSettings>>('/notifications/settings', data);
    return response.data;
  },
};

// Message API calls
export const messages = {
  list: async (complaintId: number) => {
    const response = await api.get<ApiResponse<Message[]>>(`/complaints/${complaintId}/messages`);
    return response.data;
  },
  send: async (complaintId: number, message: string) => {
    const response = await api.post<ApiResponse<Message>>(`/complaints/${complaintId}/messages`, { message });
    return response.data;
  },
  markAsRead: async (complaintId: number) => {
    const response = await api.put<ApiResponse<void>>(`/complaints/${complaintId}/messages/read`);
    return response.data;
  },
};

export default api; 