require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('Define MONGO_URI en .env');
    process.exit(1);
  }
  try {
    console.log('Conectando a DB:', uri);
    await mongoose.connect(uri);
    console.log('Conexión establecida');
    const users = await User.find().select('-password -__v').lean();
    console.log('Usuarios registrados:');
    console.table(users);
    process.exit(0);
  } catch (error) {
    console.error('Error listando usuarios:', error);
    process.exit(1);
  }
}

main();
