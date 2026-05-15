const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Aura Grand Hotel API',
      version: '1.0.0',
      description: 'API documentation for the hotel reservation backend'
    }
  },
  apis: ['./src/routes/*.js', './src/models/*.js']
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
