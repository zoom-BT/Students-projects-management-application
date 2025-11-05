/**
 * Routes pour la gestion des utilisateurs
 */

const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const { uuidParamValidation, validate } = require('../utils/validation');

// Toutes les routes nécessitent l'authentification
router.use(protect);

// Routes accessibles à tous les utilisateurs authentifiés
router.get('/', getUsers);
router.get('/:id', uuidParamValidation, validate, getUserById);
router.get('/:id/stats', uuidParamValidation, validate, getUserStats);

// Routes admin uniquement
router.put('/:id', authorize('admin'), uuidParamValidation, validate, updateUser);
router.delete('/:id', authorize('admin'), uuidParamValidation, validate, deleteUser);

module.exports = router;
