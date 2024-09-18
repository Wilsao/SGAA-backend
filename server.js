const app = require('./src/app.js');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentação da API SGAA',
      contact: {
        name: '',
        email: ''
      },
      servers: ['http://localhost:3001'],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  apis: ['./src/routers/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const PORT = 3001;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.listen(PORT, () => {
  console.log(`Executando em http://localhost:${PORT}`);
  console.log(`Documentação da API disponível em http://localhost:${PORT}/api-docs`);
});