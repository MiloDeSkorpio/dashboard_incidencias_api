import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    tags:[ 
      {
        name: 'Usuarios',
        description: 'API operations related to usuarios'
      },
      {
        name: 'Tipos de Usuario',
        description: 'API operations related to types of users'
      },
      {
        name: 'Status',
        description: 'API operations related to Status on incidences'
      },
      {
        name: 'Organismo',
        description: 'API operations related to Organismo on users'
      }
    ],
    info: {
      title: 'REST API Node.js / Express / TypeScript',
      version: "1.0.0",
      description: "Documentación for API Incidencias ORT CDMX"
    }  
  },
  apis:['./src/routes/*.routes.ts']
}
const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
  customfavIcon: '/img/log_CDMX.png',
  customCss: `
    .topbar-wrapper .link {
      content: url(https://www.ort.cdmx.gob.mx/themes/base/assets/images/logos/Logo_CDMX.png);
      height: 80px;
      width: auto;
    }
    .swagger-ui .topbar {
      background-color: #fff;
    }
  `,
  customSiteTitle: 'Documentación API Incidencias',

}

export default swaggerSpec

export {
  swaggerUiOptions
}