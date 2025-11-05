/**
 * Configuration principale de l'application Express
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Initialiser Express
const app = express();

// Middlewares de sécurité et de logging
app.use(helmet());
app.use(morgan('dev'));

// CORS - Autoriser les requêtes depuis le frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Parser le body des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de santé (health check)
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

// Documentation de l'API (route racine)
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Bienvenue sur l\'API du Gestionnaire de Projets',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      projects: '/api/projects',
      tasks: '/api/tasks',
      health: '/health'
    },
    documentation: 'Consultez le README.md pour plus d\'informations'
  });
});

// Gestion des routes non trouvées
app.use(notFound);

// Gestionnaire d'erreurs global
app.use(errorHandler);

module.exports = app;
