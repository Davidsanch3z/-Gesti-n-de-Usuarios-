const { sequelize } = require('../config/db');
const defineUser = require('../../database/models/user');

// Inicializar el modelo Sequelize
const User = defineUser(sequelize);

module.exports = { User };
