/**
 * Contrôleur pour la gestion des projets
 */

const { Project, User, Task, ProjectMember } = require('../models');
const { Op } = require('sequelize');

/**
 * @route   GET /api/projects
 * @desc    Obtenir tous les projets accessibles par l'utilisateur
 * @access  Private
 */
const getProjects = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { status, priority, search } = req.query;

    // Construire les conditions de recherche
    const where = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    // Récupérer les projets dont l'utilisateur est propriétaire ou membre
    const projects = await Project.findAll({
      where,
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'firstName', 'lastName', 'email', 'avatar']
        },
        {
          model: User,
          as: 'members',
          attributes: ['id', 'firstName', 'lastName', 'email', 'avatar'],
          through: { attributes: ['role'] }
        },
        {
          model: Task,
          as: 'tasks',
          attributes: ['id', 'status']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Filtrer les projets accessibles par l'utilisateur
    const accessibleProjects = projects.filter(project =>
      project.ownerId === userId ||
      project.members.some(member => member.id === userId)
    );

    // Calculer les statistiques pour chaque projet
    const projectsWithStats = accessibleProjects.map(project => {
      const tasks = project.tasks || [];
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(task => task.status === 'done').length;
      const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      return {
        ...project.toJSON(),
        stats: {
          totalTasks,
          completedTasks,
          progress
        }
      };
    });

    res.json({
      success: true,
      count: projectsWithStats.length,
      data: {
        projects: projectsWithStats
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/projects/:id
 * @desc    Obtenir un projet par ID
 * @access  Private
 */
const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const project = await Project.findByPk(id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'firstName', 'lastName', 'email', 'avatar']
        },
        {
          model: User,
          as: 'members',
          attributes: ['id', 'firstName', 'lastName', 'email', 'avatar', 'role'],
          through: { attributes: ['role'] }
        },
        {
          model: Task,
          as: 'tasks',
          include: [
            {
              model: User,
              as: 'assignee',
              attributes: ['id', 'firstName', 'lastName', 'avatar']
            }
          ]
        }
      ]
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projet non trouvé'
      });
    }

    // Vérifier l'accès
    const hasAccess = project.ownerId === userId ||
                     project.members.some(member => member.id === userId);

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé à ce projet'
      });
    }

    res.json({
      success: true,
      data: {
        project
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/projects
 * @desc    Créer un nouveau projet
 * @access  Private
 */
const createProject = async (req, res, next) => {
  try {
    const { name, description, status, priority, startDate, endDate, color } = req.body;
    const userId = req.user.id;

    const project = await Project.create({
      name,
      description,
      status,
      priority,
      startDate,
      endDate,
      color,
      ownerId: userId
    });

    // Ajouter le créateur comme membre avec le rôle owner
    await ProjectMember.create({
      userId,
      projectId: project.id,
      role: 'owner'
    });

    // Recharger le projet avec les relations
    const fullProject = await Project.findByPk(project.id, {
      include: [
        { model: User, as: 'owner', attributes: ['id', 'firstName', 'lastName', 'email'] },
        { model: User, as: 'members', attributes: ['id', 'firstName', 'lastName', 'email'] }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Projet créé avec succès',
      data: {
        project: fullProject
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/projects/:id
 * @desc    Mettre à jour un projet
 * @access  Private
 */
const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updates = req.body;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projet non trouvé'
      });
    }

    // Vérifier que l'utilisateur est le propriétaire ou manager
    const member = await ProjectMember.findOne({
      where: { projectId: id, userId }
    });

    if (project.ownerId !== userId && (!member || member.role === 'viewer')) {
      return res.status(403).json({
        success: false,
        message: 'Vous n\'avez pas les droits pour modifier ce projet'
      });
    }

    // Mettre à jour le projet
    await project.update(updates);

    // Recharger avec les relations
    const updatedProject = await Project.findByPk(id, {
      include: [
        { model: User, as: 'owner', attributes: ['id', 'firstName', 'lastName'] },
        { model: User, as: 'members', attributes: ['id', 'firstName', 'lastName'] }
      ]
    });

    res.json({
      success: true,
      message: 'Projet mis à jour',
      data: {
        project: updatedProject
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/projects/:id
 * @desc    Supprimer un projet
 * @access  Private
 */
const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projet non trouvé'
      });
    }

    // Seul le propriétaire peut supprimer le projet
    if (project.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Seul le propriétaire peut supprimer ce projet'
      });
    }

    await project.destroy();

    res.json({
      success: true,
      message: 'Projet supprimé avec succès'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/projects/:id/members
 * @desc    Ajouter un membre au projet
 * @access  Private
 */
const addMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId: newMemberId, role } = req.body;
    const currentUserId = req.user.id;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projet non trouvé'
      });
    }

    // Vérifier les droits
    if (project.ownerId !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: 'Seul le propriétaire peut ajouter des membres'
      });
    }

    // Vérifier que l'utilisateur existe
    const userToAdd = await User.findByPk(newMemberId);
    if (!userToAdd) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    // Ajouter le membre
    await ProjectMember.create({
      userId: newMemberId,
      projectId: id,
      role: role || 'member'
    });

    res.status(201).json({
      success: true,
      message: 'Membre ajouté au projet'
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        message: 'Cet utilisateur est déjà membre du projet'
      });
    }
    next(error);
  }
};

/**
 * @route   DELETE /api/projects/:id/members/:userId
 * @desc    Retirer un membre du projet
 * @access  Private
 */
const removeMember = async (req, res, next) => {
  try {
    const { id, userId: memberIdToRemove } = req.params;
    const currentUserId = req.user.id;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projet non trouvé'
      });
    }

    // Vérifier les droits
    if (project.ownerId !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: 'Seul le propriétaire peut retirer des membres'
      });
    }

    const member = await ProjectMember.findOne({
      where: { projectId: id, userId: memberIdToRemove }
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Membre non trouvé dans ce projet'
      });
    }

    await member.destroy();

    res.json({
      success: true,
      message: 'Membre retiré du projet'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addMember,
  removeMember
};
