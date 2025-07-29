'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('usuarioNuevo123', 10);

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Usuario Nuevo',
        email: 'nuevo@example.com',
        password: hashedPassword,
        role: 'tendero',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { email: 'nuevo@example.com' }, {});
  }
};
