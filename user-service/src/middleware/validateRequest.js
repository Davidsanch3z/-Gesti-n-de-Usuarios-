const asyncHandler = require('express-async-handler');

// Middleware genérico para validar request body con Joi schema
const validateRequest = (schema) => asyncHandler(async (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map(detail => detail.message).join(', ');
    res.status(400);
    throw new Error(messages);
  }
  next();
});

module.exports = validateRequest;
