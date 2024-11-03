import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Event Booking API',
      version: '1.0.0',
      description: 'API documentation for the Event Booking application',
    },
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;