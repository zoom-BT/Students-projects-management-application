/**
 * Contrôleur pour la gestion des tâches
 */

const { Task, User, Project, ProjectMember } = require('../models');
const { Op } = require('sequelize');

/**
 * @route   GET /api/tasks
 * @desc    Obtenir toutes les tâches (avec filtres optionnels)
 * @access  Private
 */
const getTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { projectId, status, priority, assignedTo, search } = req.query;

    // Construire les conditions
    const where = {};
    if (projectId) where.projectId = projectId;
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (assignedTo) where.assignedTo = assignedTo;
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const tasks = await Task.findAll({
      where,
      include: [
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'firstName', 'lastName', 'email', 'avatar']
        },
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'firstName', 'lastName', 'email']
        },
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name', 'color'],
          include: [{
            model: User,
            as: 'members',
            attributes: ['id']
          }]
        }
      ],
      order: [
        ['priority', 'DESC'],
        ['dueDate', 'ASC'],
        ['createdAt', 'DESC']
      ]
    });

    // Filtrer uniquement les tâches des projets accessibles
    const accessibleTasks = tasks.filter(task =>
      task.project.ownerId === userId ||
      task.project.members.some(member => member.id === userId)
    );

    res.json({
      success: true,
      count: accessibleTasks.length,
      data: {
        tasks: accessibleTasks
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/tasks/:id
 * @desc    Obtenir une tâche par ID
 * @access  Private
 */
const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await Task.findByPk(id, {
      include: [
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'firstName', 'lastName', 'email', 'avatar']
        },
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'firstName', 'lastName', 'email']
        },
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name', 'ownerId'],
          include: [{
            model: User,
            as: 'members',
            attributes: ['id']
          }]
        }
      ]
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tâche non trouvée'
      });
    }

    // Vérifier l'accès
    const hasAccess = task.project.ownerId === userId ||
                     task.project.members.some(member => member.id === userId);

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé à cette tâche'
      });
    }

    res.json({
      success: true,
      data: {
        task
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/tasks
 * @desc    Créer une nouvelle tâche
 * @access  Private
 */
const createTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      projectId,
      status,
      priority,
      dueDate,
      estimatedHours,
      assignedTo,
      tags
    } = req.body;
    const userId = req.user.id;

    // Vérifier que le projet existe
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projet non trouvé'
      });
    }

    // Vérifier l'accès au projet
    const member = await ProjectMember.findOne({
      where: { projectId, userId }
    });

    if (project.ownerId !== userId && !member) {
      return res.status(403).json({
        success: false,
        message: 'Vous n\'avez pas accès à ce projet'
      });
    }

    // Si assignedTo est spécifié, vérifier que l'utilisateur est membre du projet
    if (assignedTo) {
      const assigneeMember = await ProjectMember.findOne({
        where: { projectId, userId: assignedTo }
      });
      if (!assigneeMember && project.ownerId !== assignedTo) {
        return res.status(400).json({
          success: false,
          message: 'L\'utilisateur assigné n\'est pas membre du projet'
        });
      }
    }

    // Créer la tâche
    const task = await Task.create({
      title,
      description,
      projectId,
      status,
      priority,
      dueDate,
      estimatedHours,
      assignedTo,
      tags,
      createdBy: userId
    });

    // Recharger avec les relations
    const fullTask = await Task.findByPk(task.id, {
      include: [
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'firstName', 'lastName', 'email', 'avatar']
        },
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'firstName', 'lastName', 'email']
        },
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name', 'color']
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Tâche créée avec succès',
      data: {
        task: fullTask
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/tasks/:id
 * @desc    Mettre à jour une tâche
 * @access  Private
 */
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updates = req.body;

    const task = await Task.findByPk(id, {
      include: [{
        model: Project,
        as: 'project',
        attributes: ['id', 'ownerId']
      }]
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tâche non trouvée'
      });
    }

    // Vérifier l'accès
    const member = await ProjectMember.findOne({
      where: { projectId: task.projectId, userId }
    });

    const hasAccess = task.project.ownerId === userId ||
                     member?.role === 'manager' ||
                     member?.role === 'member' ||
                     task.assignedTo === userId;

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Vous n\'avez pas les droits pour modifier cette tâche'
      });
    }

    // Mettre à jour la tâche
    await task.update(updates);

    // Recharger avec les relations
    const updatedTask = await Task.findByPk(id, {
      include: [
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'firstName', 'lastName', 'email', 'avatar']
        },
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name', 'color']
        }
      ]
    });

    res.json({
      success: true,
      message: 'Tâche mise à jour',
      data: {
        task: updatedTask
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Supprimer une tâche
 * @access  Private
 */
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await Task.findByPk(id, {
      include: [{
        model: Project,
        as: 'project',
        attributes: ['id', 'ownerId']
      }]
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tâche non trouvée'
      });
    }

    // Vérifier les droits (owner du projet, créateur de la tâche ou manager)
    const member = await ProjectMember.findOne({
      where: { projectId: task.projectId, userId }
    });

    const canDelete = task.project.ownerId === userId ||
                     task.createdBy === userId ||
                     member?.role === 'manager';

    if (!canDelete) {
      return res.status(403).json({
        success: false,
        message: 'Vous n\'avez pas les droits pour supprimer cette tâche'
      });
    }

    await task.destroy();

    res.json({
      success: true,
      message: 'Tâche supprimée avec succès'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/tasks/stats/dashboard
 * @desc    Obtenir les statistiques des tâches pour le dashboard
 * @access  Private
 */
const getTaskStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Récupérer toutes les tâches accessibles
    const tasks = await Task.findAll({
      include: [{
        model: Project,
        as: 'project',
        attributes: ['id', 'ownerId'],
        include: [{
          model: User,
          as: 'members',
          attributes: ['id']
        }]
      }]
    });

    // Filtrer les tâches accessibles
    const accessibleTasks = tasks.filter(task =>
      task.project.ownerId === userId ||
      task.project.members.some(member => member.id === userId)
    );

    // Calculer les statistiques
    const stats = {
      total: accessibleTasks.length,
      todo: accessibleTasks.filter(t => t.status === 'todo').length,
      inProgress: accessibleTasks.filter(t => t.status === 'in_progress').length,
      review: accessibleTasks.filter(t => t.status === 'review').length,
      done: accessibleTasks.filter(t => t.status === 'done').length,
      assignedToMe: accessibleTasks.filter(t => t.assignedTo === userId).length,
      overdue: accessibleTasks.filter(t =>
        t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done'
      ).length,
      byPriority: {
        urgent: accessibleTasks.filter(t => t.priority === 'urgent').length,
        high: accessibleTasks.filter(t => t.priority === 'high').length,
        medium: accessibleTasks.filter(t => t.priority === 'medium').length,
        low: accessibleTasks.filter(t => t.priority === 'low').length
      }
    };

    res.json({
      success: true,
      data: { stats }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
};
