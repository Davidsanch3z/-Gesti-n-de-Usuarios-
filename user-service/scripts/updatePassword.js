require('dotenv').config();
const { sequelize } = require('../src/config/db');
const { User } = require('../src/models/User');

async function main() {
  const [,, rawEmail, newPassword] = process.argv;
  // Normalizar email eliminando posibles '<' y '>' incluidos por el usuario
  const email = rawEmail.trim().replace(/^[<>]+|[<>]+$/g, '');
  console.log('Email recibido:', email);
  console.log('Nueva contraseña recibida:', newPassword);

  if (!email || !newPassword) {
    console.error('Uso: node updatePassword.js <email> <newPassword>');
    process.exit(1);
  }

  try {
    console.log('Conectando a DB (Sequelize SQLite)');
    await sequelize.authenticate();
    console.log('Conexión establecida');
    console.log('Buscando usuario con email:', email);
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.error('Usuario no encontrado:', email);
      process.exit(1);
    }
    console.log(`Usuario encontrado: ${email}`);
    // Actualizar contraseña (el hook beforeSave la hashea)
    user.password = newPassword;
    await user.save();
    console.log(`Contraseña actualizada para ${email}`);
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('Error actualizando contraseña:', error);
    process.exit(1);
  }
}

main();
