/**
 * Service pour la gestion de l'authentification
 */

import apiClient from './client';
import type {
  ApiResponse,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
  PasswordChangeData,
} from '../types';

export const authApi = {
  /**
   * Inscription d'un nouvel utilisateur
   */
  register: async (userData: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', userData);
    if (response.data.success && response.data.data?.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
    }
    return response.data;
  },

  /**
   * Connexion d'un utilisateur
   */
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    if (response.data.success && response.data.data?.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
    }
    return response.data;
  },

  /**
   * Déconnexion
   */
  logout: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  /**
   * Obtenir les informations de l'utilisateur connecté
   */
  getMe: async (): Promise<ApiResponse<{ user: User }>> => {
    const response = await apiClient.get<ApiResponse<{ user: User }>>('/auth/me');
    if (response.data.success && response.data.data?.user) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
    }
    return response.data;
  },

  /**
   * Mettre à jour le profil
   */
  updateProfile: async (profileData: Partial<User>): Promise<ApiResponse<{ user: User }>> => {
    const response = await apiClient.put<ApiResponse<{ user: User }>>('/auth/profile', profileData);
    if (response.data.success && response.data.data?.user) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
    }
    return response.data;
  },

  /**
   * Changer le mot de passe
   */
  changePassword: async (passwordData: PasswordChangeData): Promise<ApiResponse> => {
    const response = await apiClient.put<ApiResponse>('/auth/change-password', passwordData);
    return response.data;
  },

  /**
   * Obtenir l'utilisateur depuis le localStorage
   */
  getCurrentUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isAuthenticated: (): boolean => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  },
};
