/**
 * Configuration de la connexion à la base de données PostgreSQL avec Sequelize
 */

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Création de l'instance Sequelize avec les paramètres de connexion
const sequelize = new Sequelize(
  process.env.DB_NAME || 'project_manager',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

/**
 * Teste la connexion à la base de données
 */
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données établie avec succès.');
    return true;
  } catch (error) {
    console.error('❌ Impossible de se connecter à la base de données:', error.message);
    return false;
  }
};

/**
 * Synchronise les modèles avec la base de données
 * @param {boolean} force - Si true, supprime et recrée les tables
 */
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log(`✅ Base de données synchronisée ${force ? '(tables recréées)' : ''}`);
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error.message);
    throw error;
  }
};

module.exports = {
  sequelize,
  testConnection,
  syncDatabase
};
