/**
 * Point d'entrée du serveur
 */

require('dotenv').config();
const app = require('./src/app');
const { testConnection, syncDatabase } = require('./src/config/database');

const PORT = process.env.PORT || 5000;

/**
 * Démarrer le serveur
 */
const startServer = async () => {
  try {
    // Tester la connexion à la base de données
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('❌ Impossible de démarrer le serveur sans connexion à la base de données');
      process.exit(1);
    }

    // Synchroniser la base de données (créer les tables si nécessaire)
    // En production, utilisez des migrations au lieu de sync()
    await syncDatabase(process.env.DB_FORCE_SYNC === 'true');

    // Démarrer le serveur Express
    const server = app.listen(PORT, () => {
      console.log('');
      console.log('═══════════════════════════════════════════');
      console.log(`🚀 Serveur démarré en mode ${process.env.NODE_ENV || 'development'}`);
      console.log(`📡 API disponible sur: http://localhost:${PORT}`);
      console.log(`💾 Base de données: ${process.env.DB_NAME}`);
      console.log('═══════════════════════════════════════════');
      console.log('');
      console.log('Endpoints disponibles:');
      console.log(`  ✓ GET  http://localhost:${PORT}/`);
      console.log(`  ✓ GET  http://localhost:${PORT}/health`);
      console.log(`  ✓ POST http://localhost:${PORT}/api/auth/register`);
      console.log(`  ✓ POST http://localhost:${PORT}/api/auth/login`);
      console.log('');
    });

    // Gestion de l'arrêt gracieux
    const gracefulShutdown = () => {
      console.log('\n🛑 Arrêt du serveur en cours...');
      server.close(() => {
        console.log('✅ Serveur arrêté proprement');
        process.exit(0);
      });
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);

  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

// Démarrer le serveur
startServer();
