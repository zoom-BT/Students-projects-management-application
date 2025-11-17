/**
 * Service pour la gestion des projets
 */

import api from './api';

const projectService = {
  /**
   * Obtenir tous les projets
   */
  getProjects: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/projects?${params}`);
    return response.data;
  },

  /**
   * Obtenir un projet par ID
   */
  getProjectById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  /**
   * Créer un nouveau projet
   */
  createProject: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  /**
   * Mettre à jour un projet
   */
  updateProject: async (id, projectData) => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },

  /**
   * Supprimer un projet
   */
  deleteProject: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },

  /**
   * Ajouter un membre au projet
   */
  addMember: async (projectId, userId, role = 'member') => {
    const response = await api.post(`/projects/${projectId}/members`, {
      userId,
      role
    });
    return response.data;
  },

  /**
   * Retirer un membre du projet
   */
  removeMember: async (projectId, userId) => {
    const response = await api.delete(`/projects/${projectId}/members/${userId}`);
    return response.data;
  }
};

export default projectService;
