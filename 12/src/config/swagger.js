import swaggerJSDoc from 'swagger-jsdoc'
import {PORT} from "./config.js"

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Documentacion de API - proyecto UTN",
            version: "1.0.0",
            description: "Api para la gestion integral de un sistema de E-commerce",
            contact: {
                name: 'Soporte tecnico API',
                email: "soporte@tuProyecto.com"
            }
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: "Servidor de desarrollo local"
            }
        ],
        components: {
            securitySchemes:{
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ["./src/routes/*.js"]
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec