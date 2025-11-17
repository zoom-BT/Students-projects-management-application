/**
 * Service pour la gestion des projets
 */

import apiClient from './client';
import type { ApiResponse, Project, ProjectFilters } from '../types';

export const projectsApi = {
  /**
   * Obtenir tous les projets
   */
  getProjects: async (filters: ProjectFilters = {}): Promise<ApiResponse<{ projects: Project[] }>> => {
    const params = new URLSearchParams(filters as any);
    const response = await apiClient.get<ApiResponse<{ projects: Project[] }>>(`/projects?${params}`);
    return response.data;
  },

  /**
   * Obtenir un projet par ID
   */
  getProjectById: async (id: number): Promise<ApiResponse<{ project: Project }>> => {
    const response = await apiClient.get<ApiResponse<{ project: Project }>>(`/projects/${id}`);
    return response.data;
  },

  /**
   * Créer un nouveau projet
   */
  createProject: async (projectData: Partial<Project>): Promise<ApiResponse<{ project: Project }>> => {
    const response = await apiClient.post<ApiResponse<{ project: Project }>>('/projects', projectData);
    return response.data;
  },

  /**
   * Mettre à jour un projet
   */
  updateProject: async (id: number, projectData: Partial<Project>): Promise<ApiResponse<{ project: Project }>> => {
    const response = await apiClient.put<ApiResponse<{ project: Project }>>(`/projects/${id}`, projectData);
    return response.data;
  },

  /**
   * Supprimer un projet
   */
  deleteProject: async (id: number): Promise<ApiResponse> => {
    const response = await apiClient.delete<ApiResponse>(`/projects/${id}`);
    return response.data;
  },

  /**
   * Ajouter un membre au projet
   */
  addMember: async (projectId: number, userId: number, role = 'member'): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>(`/projects/${projectId}/members`, {
      userId,
      role,
    });
    return response.data;
  },

  /**
   * Retirer un membre du projet
   */
  removeMember: async (projectId: number, userId: number): Promise<ApiResponse> => {
    const response = await apiClient.delete<ApiResponse>(`/projects/${projectId}/members/${userId}`);
    return response.data;
  },
};
