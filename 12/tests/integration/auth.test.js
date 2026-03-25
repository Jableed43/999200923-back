// Este test es de integracion
import request from 'supertest'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import app from '../../index.js'
import User from '../../src/models/userModel.js'

//1. Configuramos la base de datos en memoria
// crea una base de datos real pero que vive solo en la ram
// permite rests aislados

let mongoServer;

beforeAll(async () => {
    // Iniciamos el servidor de mongoDB en memoria antes de todos los tests
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri)
})

afterAll(async () => {
    // nos desconectamos de la base de datos
    await mongoose.disconnect()
    // detenemos el servidor de la base de datos
    await mongoServer.stop()
})

describe('Auth integration Tests', () => {
    beforeEach(async () => {
        // Limpiamos la coleccion de usuarios antes de cada test, para evitar colisiones
        await User.deleteMany({})
    })

    describe('POST /api/user/register' , () => {
    it('should register a new user successfully', async () => {
        const userData = {
            email: 'test@test.com',
            password: 'Password123',
            name: 'Test user',
            lastName: 'doe',
            role: "CUSTOMER"
        }

        const response = await request(app)
            .post("/api/user/register")
            .send(userData)

            // El codigo 201 significa creado
            expect(response.status).toBe(201)
            // Valido si los datos realmente se escribieron
            expect(response.body.email).toBe(userData.email)

            // Verificamos si el usuario completo impacto en la base de datos
            const userInDB = await User.findOne({email: userData.email})
            expect(userInDB).not.toBeNull()
    })
})
})