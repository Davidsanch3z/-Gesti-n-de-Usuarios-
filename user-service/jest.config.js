module.exports = {
  testEnvironment: 'node',
  // Variables de entorno para tests
  setupFiles: ['<rootDir>/tests/setupEnv.js'],
  // Configuración de MongoMemory y hooks Jest
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  // Ignorar tests de Cypress
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
  verbose: true,
  testTimeout: 30000
};
