require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize } = require('../src/config/db');
const { User } = require('../src/models/User');

async function main() {
  const [,, rawName, rawEmail, rawPassword, rawRole] = process.argv;
  const name = rawName?.trim();
  const email = rawEmail?.trim();
  const password = rawPassword;
  const rawRoleArg = rawRole?.trim();

  // Normalizar rol y eliminar corchetes si se incluyen
  const validRoles = ['tendero', 'admin'];
  let roleInput = rawRoleArg ? rawRoleArg.toLowerCase().replace(/^[\[]|[\]]$/g, '') : 'tendero';
  if (!validRoles.includes(roleInput)) {
    console.error(`Rol no válido: ${rawRoleArg}. Roles válidos: ${validRoles.join(', ')}`);
    process.exit(1);
  }
  const role = roleInput;

  if (!name || !email || !password) {
    console.error('Uso: node addUser.js <name> <email> <password> [role]');
    process.exit(1);
  }

  try {
    console.log('Conectando a la base de datos (Sequelize SQLite)');
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida');

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.error('El usuario ya existe:', email);
      process.exit(1);
    }

    // El hook beforeSave del modelo se encargará de hashear la contraseña
    const user = await User.create({ name, email, password, role, isVerified: true });

    console.log(`Usuario creado con éxito: ${user.email} (${user.role})`);
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('Error creando usuario:', error);
    process.exit(1);
  }
}

main();
