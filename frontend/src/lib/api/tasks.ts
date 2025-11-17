/**
 * Service pour la gestion des tâches
 */

import apiClient from './client';
import type { ApiResponse, Task, TaskFilters, DashboardStats } from '../types';

export const tasksApi = {
  /**
   * Obtenir toutes les tâches avec filtres optionnels
   */
  getTasks: async (filters: TaskFilters = {}): Promise<ApiResponse<{ tasks: Task[] }>> => {
    const params = new URLSearchParams(filters as any);
    const response = await apiClient.get<ApiResponse<{ tasks: Task[] }>>(`/tasks?${params}`);
    return response.data;
  },

  /**
   * Obtenir une tâche par ID
   */
  getTaskById: async (id: number): Promise<ApiResponse<{ task: Task }>> => {
    const response = await apiClient.get<ApiResponse<{ task: Task }>>(`/tasks/${id}`);
    return response.data;
  },

  /**
   * Créer une nouvelle tâche
   */
  createTask: async (taskData: Partial<Task>): Promise<ApiResponse<{ task: Task }>> => {
    const response = await apiClient.post<ApiResponse<{ task: Task }>>('/tasks', taskData);
    return response.data;
  },

  /**
   * Mettre à jour une tâche
   */
  updateTask: async (id: number, taskData: Partial<Task>): Promise<ApiResponse<{ task: Task }>> => {
    const response = await apiClient.put<ApiResponse<{ task: Task }>>(`/tasks/${id}`, taskData);
    return response.data;
  },

  /**
   * Supprimer une tâche
   */
  deleteTask: async (id: number): Promise<ApiResponse> => {
    const response = await apiClient.delete<ApiResponse>(`/tasks/${id}`);
    return response.data;
  },

  /**
   * Obtenir les statistiques des tâches
   */
  getTaskStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await apiClient.get<ApiResponse<DashboardStats>>('/tasks/stats/dashboard');
    return response.data;
  },
};
