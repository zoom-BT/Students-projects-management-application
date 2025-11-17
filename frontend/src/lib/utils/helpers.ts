/**
 * Fonctions utilitaires diverses
 */

import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

/**
 * Formater une date en format lisible
 */
export const formatDate = (date: string | Date, formatStr: string = 'dd/MM/yyyy'): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr, { locale: fr });
  } catch (error) {
    return 'Date invalide';
  }
};

/**
 * Formater une date avec l'heure
 */
export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, 'dd/MM/yyyy à HH:mm');
};

/**
 * Obtenir le badge de couleur pour un statut de projet
 */
export const getProjectStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    planning: 'bg-gray-100 text-gray-800',
    active: 'bg-blue-100 text-blue-800',
    'on-hold': 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

/**
 * Obtenir le badge de couleur pour une priorité
 */
export const getPriorityColor = (priority: string): string => {
  const colors: Record<string, string> = {
    urgent: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };
  return colors[priority] || 'bg-gray-100 text-gray-800';
};

/**
 * Obtenir le badge de couleur pour un statut de tâche
 */
export const getTaskStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    todo: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'in-review': 'bg-purple-100 text-purple-800',
    done: 'bg-green-100 text-green-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

/**
 * Obtenir le label d'un statut de projet
 */
export const getProjectStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    planning: 'Planification',
    active: 'Actif',
    'on-hold': 'En attente',
    completed: 'Complété',
    cancelled: 'Annulé',
  };
  return labels[status] || status;
};

/**
 * Obtenir le label d'une priorité
 */
export const getPriorityLabel = (priority: string): string => {
  const labels: Record<string, string> = {
    urgent: 'Urgent',
    high: 'Haute',
    medium: 'Moyenne',
    low: 'Basse',
  };
  return labels[priority] || priority;
};

/**
 * Obtenir le label d'un statut de tâche
 */
export const getTaskStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    todo: 'À faire',
    'in-progress': 'En cours',
    'in-review': 'En révision',
    done: 'Terminé',
  };
  return labels[status] || status;
};

/**
 * Obtenir le label d'un rôle utilisateur
 */
export const getRoleLabel = (role: string): string => {
  const labels: Record<string, string> = {
    admin: 'Administrateur',
    manager: 'Manager',
    collaborator: 'Collaborateur',
  };
  return labels[role] || role;
};

/**
 * Vérifier si une date est passée
 */
export const isOverdue = (date: string | Date): boolean => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return dateObj < new Date();
  } catch (error) {
    return false;
  }
};

/**
 * Calculer le pourcentage de progression
 */
export const calculateProgress = (completed: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

/**
 * Tronquer un texte
 */
export const truncate = (text: string, length: number = 50): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Capitaliser la première lettre
 */
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Obtenir les initiales d'un nom
 */
export const getInitials = (firstName?: string, lastName?: string): string => {
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
};
