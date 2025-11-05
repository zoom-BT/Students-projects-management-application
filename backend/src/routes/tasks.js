/**
 * Routes pour la gestion des tâches
 */

const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const {
  createTaskValidation,
  uuidParamValidation,
  validate
} = require('../utils/validation');

// Toutes les routes nécessitent l'authentification
router.use(protect);

// Route pour les statistiques
router.get('/stats/dashboard', getTaskStats);

// Routes CRUD des tâches
router.get('/', getTasks);
router.get('/:id', uuidParamValidation, validate, getTaskById);
router.post('/', createTaskValidation, validate, createTask);
router.put('/:id', uuidParamValidation, validate, updateTask);
router.delete('/:id', uuidParamValidation, validate, deleteTask);

module.exports = router;
