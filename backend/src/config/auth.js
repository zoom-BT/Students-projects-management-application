/**
 * Configuration pour l'authentification JWT
 */

require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'default_secret_change_in_production',
  jwtExpire: process.env.JWT_EXPIRE || '7d',

  // Options pour bcrypt
  saltRounds: 10,

  // Options JWT
  jwtOptions: {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  }
};
