const IP_SERVER = process.env.IP_SERVER;
const PORT = process.env.APP_ENV == 'development' ? `:${process.env.PORT || 8080}` : '';
const SCHEMA =  process.env.APP_ENV == 'development' ? 'http' : 'https';
const API_API = process.env.API_API;
const API_VERSION = process.env.API_VERSION;

// @ts-ignore
export const options = {
    definition: {
      openapi: "3.0.1",
      info: {
        title: "Vehicle Test API",
        version: "1.0.0",
        description: "Vehicle api documentation",
      },
      servers: [
        {
          url:`${SCHEMA}://${IP_SERVER}${PORT}/${API_API}/${API_VERSION}/`,
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          }
        }
      },
      security: [{
        bearerAuth: [] as string[]
      }]
    },
    apis: ["./src/controllers/*.ts"],
  };
