// swagger-autogen.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API Tienda Online',
    description: 'Documentación automática generada con swagger-autogen',
  },
  host: 'api-tienda-online-production.up.railway.app',
  schemes: ['https'], // Railway usa HTTPS
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js']; // apunta al archivo principal donde importas las rutas

swaggerAutogen(outputFile, endpointsFiles, doc);
