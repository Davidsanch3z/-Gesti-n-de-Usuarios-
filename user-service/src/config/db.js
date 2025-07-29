const { Sequelize } = require('sequelize');
const config = require('../../database/config/config.js');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    // Sincronizar modelos con la base de datos
    await sequelize.sync();
    console.log('Database connection established and models synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { connectDB, sequelize };
