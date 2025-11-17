/**
 * Service pour la gestion des tâches
 */

import api from './api';

const taskService = {
  /**
   * Obtenir toutes les tâches avec filtres optionnels
   */
  getTasks: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/tasks?${params}`);
    return response.data;
  },

  /**
   * Obtenir une tâche par ID
   */
  getTaskById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  /**
   * Créer une nouvelle tâche
   */
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  /**
   * Mettre à jour une tâche
   */
  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  /**
   * Supprimer une tâche
   */
  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  /**
   * Obtenir les statistiques des tâches
   */
  getTaskStats: async () => {
    const response = await api.get('/tasks/stats/dashboard');
    return response.data;
  }
};

export default taskService;
