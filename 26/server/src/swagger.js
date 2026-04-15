import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Sistema de Turnos API',
    version: '1.0.0',
    description: 'Documentación Swagger para la API del Sistema de Turnos',
    contact: {
      name: 'Seprise API',
      email: 'soporte@seprise.local'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      AuthCredentials: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', example: 'test@seprise.com' },
          password: { type: 'string', example: 'secret123' }
        }
      },
      RegisterPaciente: {
        type: 'object',
        required: ['nombre', 'apellido', 'email', 'password'],
        properties: {
          nombre: { type: 'string', example: 'Ana' },
          apellido: { type: 'string', example: 'Pérez' },
          email: { type: 'string', example: 'ana@seprise.com' },
          password: { type: 'string', example: 'secret123' }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: { type: 'string' }
        }
      },
      TurnoRequest: {
        type: 'object',
        required: ['fecha', 'hora', 'pacienteId', 'profesionalId', 'creadoPor', 'onModel'],
        properties: {
          fecha: { type: 'string', format: 'date', example: '2026-04-13' },
          hora: { type: 'string', example: '09:00' },
          pacienteId: { type: 'string', example: '642f866d1b2c3a0012345678' },
          profesionalId: { type: 'string', example: '642f866d1b2c3a0087654321' },
          motivo: { type: 'string', example: 'Consulta general' },
          creadoPor: { type: 'string', example: '642f866d1b2c3a0012345678' },
          onModel: { type: 'string', example: 'Paciente' }
        }
      }
    }
  },
  paths: {
    '/': {
      get: {
        tags: ['General'],
        summary: 'Mensaje de bienvenida',
        responses: {
          '200': {
            description: 'Mensaje de estado de la API',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    version: { type: 'string' },
                    status: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Iniciar sesión',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AuthCredentials' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Token de autenticación',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: { type: 'string' },
                    user: { type: 'object' }
                  }
                }
              }
            }
          },
          '401': { description: 'Credenciales inválidas', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
        }
      }
    },
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Registrar paciente',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterPaciente' }
            }
          }
        },
        responses: {
          '201': { description: 'Paciente registrado correctamente' },
          '400': { description: 'Email ya registrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
        }
      }
    },
    '/api/profesionales': {
      get: {
        tags: ['Profesionales'],
        summary: 'Listar profesionales',
        responses: {
          '200': { description: 'Lista de profesionales' }
        }
      },
      post: {
        tags: ['Profesionales'],
        summary: 'Crear profesional',
        security: [{ bearerAuth: [] }],
        responses: {
          '201': { description: 'Profesional creado' },
          '401': { description: 'No autorizado' }
        }
      }
    },
    '/api/turnos/disponibles': {
      get: {
        tags: ['Turnos'],
        summary: 'Obtener turnos disponibles',
        parameters: [
          { name: 'profesionalId', in: 'query', required: true, schema: { type: 'string' } },
          { name: 'fecha', in: 'query', required: true, schema: { type: 'string', format: 'date' } }
        ],
        responses: {
          '200': { description: 'Turnos disponibles' }
        }
      }
    },
    '/api/turnos/reservar': {
      post: {
        tags: ['Turnos'],
        summary: 'Reservar un turno',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/TurnoRequest' }
            }
          }
        },
        responses: {
          '201': { description: 'Turno reservado' },
          '409': { description: 'Turno ya reservado' }
        }
      }
    }
  }
};

const options = {
  definition: swaggerDefinition,
  apis: []
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
