// En tests, forzar entorno y no cargar .env para no sobrescribir NODE_ENV
process.env.NODE_ENV = 'test';
// require('dotenv').config();
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  // Cerrar cualquier conexión previa antes de conectar al MemoryServer
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  process.env.MONGO_URI = mongoServer.getUri();
  // Asegurar JWT_SECRET para tests
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret';
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

// Mantener datos entre tests para flujo de registro -> login -> profile
// afterEach(async () => {
//   const collections = mongoose.connection.collections;
//   for (const key in collections) {
//     await collections[key].deleteMany({});
//   }
//});
