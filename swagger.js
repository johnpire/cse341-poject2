const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Test API',
        description: 'Testing API documentation generation with Swagger'
    },
    host: 'localhost:3090',
    schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);