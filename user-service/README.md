# User Service

Microservicio de gestión de usuarios para TechDeros.

## Endpoints

- **POST /api/users/register**: Registro de usuario
- **POST /api/users/login**: Autenticación
- **GET /api/users/profile**: Perfil de usuario autenticado
- **GET /api/users**: Listar usuarios (admin)
- **GET /api/users/verify/:token**: Verificar email
- **POST /api/users/forgot-password**: Solicitar restablecer contraseña
- **PUT /api/users/reset-password/:token**: Restablecer contraseña
- **PUT /api/users/:id/password**: Cambiar contraseña (admin)

## Documentación Swagger

La documentación OpenAPI se genera a partir de comentarios JSDoc en las rutas y modelos.

- URL de documentación UI: `http://localhost:5000/api/docs`
- Configuración base: `src/config/swagger.js`

### Añadir nuevos endpoints

1. Define tu esquema en `components.schemas` dentro de `swagger.js`.
2. Anota tus rutas con comentarios JSDoc:

```js
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 _id:
 *                   type: string
 */
router.post('/register', ...);
```

3. Añade el archivo o patrón que contiene tus comentarios en `apis` dentro de `swagger.js`.

## Uso para otros microservicios

1. Instala:
   ```sh
   npm install swagger-jsdoc swagger-ui-express
   ```
2. Crea `src/config/swagger.js` copiando este ejemplo y ajustando `title`, `version` y `servers`.
3. En `src/index.js` importa y monta:
   ```js
   const swaggerUi = require('swagger-ui-express');
   const swaggerSpec = require('./config/swagger');
   app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
   ```
4. Anota rutas y modelos con JSDoc siguiendo el estándar OpenAPI.
5. Documentación disponible en `/api/docs`.

---

_TechDeros - Microservicio de Usuarios_
