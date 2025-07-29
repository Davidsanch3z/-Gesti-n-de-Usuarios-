const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
// Documentación Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Rutas
const authRoutes = require('./routes/auth.routes');

// Carga de variables de entorno
dotenv.config();

// Conexión a la base de datos (omitida en tests)
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

const app = express();

// Seguridad HTTP headers
app.use(helmet());
// Permitir cualquier origen (incluyendo URLs de ngrok) en desarrollo
app.use(cors({
  origin: true,
  credentials: true
}));
// Limitador de peticiones: 100 solicitudes por 15 minutos
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// Parse JSON bodies
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Middleware para parsear JSON
app.use(express.json());
// Logger de peticiones HTTP
app.use(morgan('dev'));

// Health-check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

// Root endpoint para verificar que la API responde
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API corriendo' });
});

// Rutas
app.use('/api/users', require('./routes/userRoutes'));
// Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware para rutas no encontradas y manejo de errores
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

// In test environment, app is exported without starting the server
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  // Exponer backend en toda la red local para port forwarding
  app.listen(PORT, '0.0.0.0', () => console.log(`User service running on port ${PORT}`));
}
// Export app for testing
module.exports = app;
