/**
 * Point d'entrée pour tous les modèles et leurs associations
 */

const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');

// Définition des associations entre les modèles

// Un utilisateur peut créer plusieurs projets
User.hasMany(Project, {
  foreignKey: 'ownerId',
  as: 'ownedProjects'
});
Project.belongsTo(User, {
  foreignKey: 'ownerId',
  as: 'owner'
});

// Table intermédiaire pour les membres d'un projet (many-to-many)
const ProjectMember = require('./ProjectMember');
User.belongsToMany(Project, {
  through: ProjectMember,
  foreignKey: 'userId',
  as: 'memberProjects'
});
Project.belongsToMany(User, {
  through: ProjectMember,
  foreignKey: 'projectId',
  as: 'members'
});

// Un projet a plusieurs tâches
Project.hasMany(Task, {
  foreignKey: 'projectId',
  as: 'tasks'
});
Task.belongsTo(Project, {
  foreignKey: 'projectId',
  as: 'project'
});

// Une tâche est assignée à un utilisateur
Task.belongsTo(User, {
  foreignKey: 'assignedTo',
  as: 'assignee'
});
User.hasMany(Task, {
  foreignKey: 'assignedTo',
  as: 'assignedTasks'
});

// Une tâche est créée par un utilisateur
Task.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator'
});
User.hasMany(Task, {
  foreignKey: 'createdBy',
  as: 'createdTasks'
});

module.exports = {
  User,
  Project,
  Task,
  ProjectMember
};
