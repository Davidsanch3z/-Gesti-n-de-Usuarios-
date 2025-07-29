const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword1 = await bcrypt.hash('admin123', 10);
    const hashedPassword2 = await bcrypt.hash('tendero123', 10);

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin Usuario',
        email: 'admin@example.com',
        password: hashedPassword1,
        role: 'admin',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tendero Demo',
        email: 'tendero@example.com',
        password: hashedPassword2,
        role: 'tendero',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
