// src/services/api.ts
import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import type { LoginCredentials, AuthResponse, User } from '../types';

// Configuration de l'API
const API_URL: string = 'http://127.0.0.1:8000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== AUTHENTIFICATION ====================
export const authAPI = {
  login: (credentials: LoginCredentials): Promise<AxiosResponse<AuthResponse>> => 
    api.post('/login', credentials),
  
  logout: (): Promise<AxiosResponse<{ message: string }>> => 
    api.post('/logout'),
  
  getUser: (): Promise<AxiosResponse<User>> => 
    api.get('/me'),
};

// ==================== PERSONNELS ====================
export const personnelAPI = {
  getAll: () => api.get('/personnels'),
  getById: (id: number) => api.get(`/personnels/${id}`),
  create: (data: any) => api.post('/personnels', data),
  update: (id: number, data: any) => api.put(`/personnels/${id}`, data),
  delete: (id: number) => api.delete(`/personnels/${id}`),
  getStats: () => api.get('/personnels/stats'),
};

// ==================== DIRECTIONS ====================
export const directionAPI = {
  getAll: () => api.get('/directions'),
  getById: (id: number) => api.get(`/directions/${id}`),
  create: (data: any) => api.post('/directions', data),
  update: (id: number, data: any) => api.put(`/directions/${id}`, data),
  delete: (id: number) => api.delete(`/directions/${id}`),
  getServices: (id: number) => api.get(`/directions/${id}/services`),
  getPersonnels: (id: number) => api.get(`/directions/${id}/personnels`),
};

// ==================== SERVICES ====================
export const serviceAPI = {
  getAll: () => api.get('/services'),
  getById: (id: number) => api.get(`/services/${id}`),
  getByDirection: (directionId: number) => api.get(`/services/direction/${directionId}`),
  create: (data: any) => api.post('/services', data),
  update: (id: number, data: any) => api.put(`/services/${id}`, data),
  delete: (id: number) => api.delete(`/services/${id}`),
};

// ==================== POSTES ====================
export const posteAPI = {
  getAll: () => api.get('/postes'),
  getById: (id: number) => api.get(`/postes/${id}`),
  getByService: (serviceId: number) => api.get(`/postes/service/${serviceId}`),
  create: (data: any) => api.post('/postes', data),
  update: (id: number, data: any) => api.put(`/postes/${id}`, data),
  delete: (id: number) => api.delete(`/postes/${id}`),
};

// ==================== CARRIERES ====================
export const carriereAPI = {
  getAll: () => api.get('/carrieres'),
  getById: (id: number) => api.get(`/carrieres/${id}`),
  create: (data: any) => api.post('/carrieres', data),
  update: (id: number, data: any) => api.put(`/carrieres/${id}`, data),
  delete: (id: number) => api.delete(`/carrieres/${id}`),
};

// ==================== HISTORIQUE ====================
export const historiqueAPI = {
  getAll: () => api.get('/historiques'),
  getById: (id: number) => api.get(`/historiques/${id}`),
  getByPersonnel: (personnelId: number) => api.get(`/historiques/personnel/${personnelId}`),
  create: (data: any) => api.post('/historiques', data),
  update: (id: number, data: any) => api.put(`/historiques/${id}`, data),
  delete: (id: number) => api.delete(`/historiques/${id}`),
};

// ==================== BASE ROHI ====================
export const baseRohiAPI = {
  getAll: () => api.get('/base-rohi'),
  getById: (id: number) => api.get(`/base-rohi/${id}`),
  create: (data: any) => api.post('/base-rohi', data),
  update: (id: number, data: any) => api.put(`/base-rohi/${id}`, data),
  delete: (id: number) => api.delete(`/base-rohi/${id}`),
  getLiaisons: () => api.get('/personnels-rohi'),
  addLiaison: (personnelId: number, rohiId: number) => 
    api.post('/personnels-rohi', { id_personnel: personnelId, id_rohi: rohiId }),
  removeLiaison: (personnelId: number, rohiId: number) => 
    api.delete(`/personnels-rohi/${personnelId}/${rohiId}`),
};

// ==================== BASE AUGURE ====================
export const baseAugureAPI = {
  getAll: () => api.get('/base-augure'),
  getById: (id: number) => api.get(`/base-augure/${id}`),
  create: (data: any) => api.post('/base-augure', data),
  update: (id: number, data: any) => api.put(`/base-augure/${id}`, data),
  delete: (id: number) => api.delete(`/base-augure/${id}`),
  getLiaisons: () => api.get('/personnels-augure'),
  addLiaison: (personnelId: number, augureId: number) => 
    api.post('/personnels-augure', { id_personnel: personnelId, id_augure: augureId }),
  removeLiaison: (personnelId: number, augureId: number) => 
    api.delete(`/personnels-augure/${personnelId}/${augureId}`),
};

// ==================== STATUTS ADMIN ====================
export const statutAPI = {
  getAll: () => api.get('/statuts'),
  getById: (id: number) => api.get(`/statuts/${id}`),
  create: (data: any) => api.post('/statuts', data),
  update: (id: number, data: any) => api.put(`/statuts/${id}`, data),
  delete: (id: number) => api.delete(`/statuts/${id}`),
};

// ==================== SITUATIONS ADMIN ====================
export const situationAPI = {
  getAll: () => api.get('/situations-admin'),
  getById: (id: number) => api.get(`/situations-admin/${id}`),
  getByPersonnel: (personnelId: number) => api.get(`/situations-admin/personnel/${personnelId}`),
  create: (data: any) => api.post('/situations-admin', data),
  update: (id: number, data: any) => api.put(`/situations-admin/${id}`, data),
  delete: (id: number) => api.delete(`/situations-admin/${id}`),
};

// ==================== ETATS ====================
export const etatAPI = {
  getAll: () => api.get('/etats'),
  getById: (id: number) => api.get(`/etats/${id}`),
  create: (data: any) => api.post('/etats', data),
  update: (id: number, data: any) => api.put(`/etats/${id}`, data),
  delete: (id: number) => api.delete(`/etats/${id}`),
};

// ==================== DASHBOARD ====================
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
};

// Gestion du token
export const setAuthToken = (token: string | null): void => {
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;