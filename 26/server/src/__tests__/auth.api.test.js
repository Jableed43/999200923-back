import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';
import Paciente from '../models/Paciente.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await Paciente.deleteMany({});
});

describe('API Auth y rutas públicas', () => {
  test('GET / should return API status', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({ status: 'OK' });
  });

  test('POST /api/auth/register should create a paciente and return a token', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        nombre: 'Paciente',
        apellido: 'Test',
        email: 'paciente@test.com',
        password: 'contra1234'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe('paciente@test.com');
  });

  test('POST /api/auth/register should reject duplicate email', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        nombre: 'Paciente',
        apellido: 'Test',
        email: 'paciente@test.com',
        password: 'contra1234'
      });

    const duplicate = await request(app)
      .post('/api/auth/register')
      .send({
        nombre: 'Paciente2',
        apellido: 'Test2',
        email: 'paciente@test.com',
        password: 'contra1234'
      });

    expect(duplicate.statusCode).toBe(400);
    expect(duplicate.body.error).toMatch(/registrado/);
  });

  test('POST /api/auth/login should authenticate a registered paciente', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        nombre: 'Paciente',
        apellido: 'Test',
        email: 'paciente@test.com',
        password: 'contra1234'
      });

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'paciente@test.com',
        password: 'contra1234'
      });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.token).toBeDefined();
    expect(loginResponse.body.user.email).toBe('paciente@test.com');
  });

  test('GET /api/profesionales should return a list even when empty', async () => {
    const response = await request(app).get('/api/profesionales');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
