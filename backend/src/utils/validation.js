/**
 * Fonctions utilitaires pour la validation des données
 */

const { body, param, query, validationResult } = require('express-validator');

/**
 * Middleware pour vérifier les résultats de validation
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Erreur de validation',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

/**
 * Règles de validation pour l'inscription
 */
const registerValidation = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('Le prénom est requis')
    .isLength({ min: 2, max: 50 }).withMessage('Le prénom doit contenir entre 2 et 50 caractères'),
  body('lastName')
    .trim()
    .notEmpty().withMessage('Le nom est requis')
    .isLength({ min: 2, max: 50 }).withMessage('Le nom doit contenir entre 2 et 50 caractères'),
  body('email')
    .trim()
    .notEmpty().withMessage('L\'email est requis')
    .isEmail().withMessage('Email invalide')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Le mot de passe est requis')
    .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('role')
    .optional()
    .isIn(['admin', 'manager', 'collaborator']).withMessage('Rôle invalide')
];

/**
 * Règles de validation pour la connexion
 */
const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('L\'email est requis')
    .isEmail().withMessage('Email invalide')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Le mot de passe est requis')
];

/**
 * Règles de validation pour la création d'un projet
 */
const createProjectValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Le nom du projet est requis')
    .isLength({ min: 3, max: 100 }).withMessage('Le nom doit contenir entre 3 et 100 caractères'),
  body('description')
    .optional()
    .trim(),
  body('status')
    .optional()
    .isIn(['planning', 'active', 'on_hold', 'completed', 'cancelled']).withMessage('Statut invalide'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent']).withMessage('Priorité invalide'),
  body('startDate')
    .optional()
    .isISO8601().withMessage('Date de début invalide'),
  body('endDate')
    .optional()
    .isISO8601().withMessage('Date de fin invalide')
];

/**
 * Règles de validation pour la création d'une tâche
 */
const createTaskValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Le titre de la tâche est requis')
    .isLength({ min: 3, max: 200 }).withMessage('Le titre doit contenir entre 3 et 200 caractères'),
  body('description')
    .optional()
    .trim(),
  body('status')
    .optional()
    .isIn(['todo', 'in_progress', 'review', 'done']).withMessage('Statut invalide'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent']).withMessage('Priorité invalide'),
  body('projectId')
    .notEmpty().withMessage('L\'ID du projet est requis')
    .isUUID().withMessage('ID de projet invalide'),
  body('assignedTo')
    .optional()
    .isUUID().withMessage('ID d\'utilisateur invalide'),
  body('dueDate')
    .optional()
    .isISO8601().withMessage('Date d\'échéance invalide'),
  body('estimatedHours')
    .optional()
    .isFloat({ min: 0 }).withMessage('Les heures estimées doivent être positives')
];

/**
 * Règles de validation pour les paramètres UUID
 */
const uuidParamValidation = [
  param('id')
    .isUUID().withMessage('ID invalide')
];

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  createProjectValidation,
  createTaskValidation,
  uuidParamValidation
};
