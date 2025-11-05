/**
 * Routes pour la gestion des projets
 */

const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addMember,
  removeMember
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');
const {
  createProjectValidation,
  uuidParamValidation,
  validate
} = require('../utils/validation');

// Toutes les routes nécessitent l'authentification
router.use(protect);

// Routes CRUD des projets
router.get('/', getProjects);
router.get('/:id', uuidParamValidation, validate, getProjectById);
router.post('/', createProjectValidation, validate, createProject);
router.put('/:id', uuidParamValidation, validate, updateProject);
router.delete('/:id', uuidParamValidation, validate, deleteProject);

// Routes pour la gestion des membres
router.post('/:id/members', uuidParamValidation, validate, addMember);
router.delete('/:id/members/:userId', validate, removeMember);

module.exports = router;
