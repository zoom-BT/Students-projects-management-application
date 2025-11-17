/**
 * Fonctions utilitaires
 */

import { format, formatDistanceToNow, isAfter, isBefore } from 'date-fns';
import { fr } from 'date-fns/locale';

/**
 * Formater une date
 */
export const formatDate = (date, formatStr = 'dd/MM/yyyy') => {
  if (!date) return '-';
  return format(new Date(date), formatStr, { locale: fr });
};

/**
 * Obtenir le temps relatif (il y a X jours)
 */
export const getRelativeTime = (date) => {
  if (!date) return '-';
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });
};

/**
 * Vérifier si une date est passée
 */
export const isOverdue = (date) => {
  if (!date) return false;
  return isBefore(new Date(date), new Date());
};

/**
 * Obtenir la couleur selon la priorité
 */
export const getPriorityColor = (priority) => {
  const colors = {
    urgent: 'bg-red-100 text-red-800 border-red-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };
  return colors[priority] || colors.medium;
};

/**
 * Obtenir la couleur selon le statut
 */
export const getStatusColor = (status) => {
  const colors = {
    todo: 'bg-gray-100 text-gray-800 border-gray-200',
    in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
    review: 'bg-purple-100 text-purple-800 border-purple-200',
    done: 'bg-green-100 text-green-800 border-green-200',
    planning: 'bg-gray-100 text-gray-800 border-gray-200',
    active: 'bg-blue-100 text-blue-800 border-blue-200',
    on_hold: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200'
  };
  return colors[status] || colors.todo;
};

/**
 * Obtenir le label en français pour les statuts
 */
export const getStatusLabel = (status) => {
  const labels = {
    todo: 'À faire',
    in_progress: 'En cours',
    review: 'En révision',
    done: 'Terminé',
    planning: 'Planification',
    active: 'Actif',
    on_hold: 'En attente',
    completed: 'Complété',
    cancelled: 'Annulé'
  };
  return labels[status] || status;
};

/**
 * Obtenir le label en français pour les priorités
 */
export const getPriorityLabel = (priority) => {
  const labels = {
    urgent: 'Urgent',
    high: 'Haute',
    medium: 'Moyenne',
    low: 'Basse'
  };
  return labels[priority] || priority;
};

/**
 * Obtenir les initiales d'un nom
 */
export const getInitials = (firstName, lastName) => {
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
};

/**
 * Tronquer un texte
 */
export const truncate = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Calculer le pourcentage de complétion
 */
export const calculateProgress = (total, completed) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};
