import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    tags:[ 
      {
        name: 'Usuarios',
        description: 'API operations related to usuarios'
      }
    ],
    info: {
      title: 'REST API Node.js / Express / TypeScript',
      version: "1.0.0",
      description: "API DOCS for Usuarios"
    }  
  },
  apis:['./src/routes/Usuario.routes.ts']
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