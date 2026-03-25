import {afterEach, jest} from '@jest/globals'
import {checkModelExist} from '../../helpers/checkExist.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validateUserService } from '../userService.js'

    // Describe agrupa un conjunto de pruebas relacionadas
    // It/test: Define una prueba individual. Debe leerse como "it should ..."

//1. Mockear dependencias. Reemplazamos modulos reales por versiones falsas controladas
jest.mock("../../models/userModel.js")
jest.mock('bcrypt')
jest.mock('jsonwebtoken')
jest.mock('../../helpers/checkExist.js', () => ({
    checkModelExist: jest.fn()
}))

describe('userService Unit Tests', () => {
    //2.Limpieza: Luego de cada test, limpiamos los mocks para que no arrastren info de tests anteriores
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('validateUserService', () => {
        // Validamos si email o password son faltantes, relacionado al login
        it('should throw error if email or password missing', async () => {
            // No importa que el test falle, lo que importa es que la expectativa se cumpla
            // Si yo espero que falle y falla, entonces el test es correcto
            await expect(validateUserService({email: 'test@test.com'}))
                .rejects.toThrow("There's a missing field")
        } )

        // Validamos si al recibir los datos, las credenciales son correctas
        // ademas deberia retornar el token
        it('should login and return token if credentials are correct', async () => {
            // AAA
            // ARRANGE
            const mockUser = {
                _id: '123',
                email: 'test@test.com',
                password: 'hashedPassword',
                role: "ADMIN"
            }

            // Simulo que el usuario existe en la db, que la pass coincide y que se genera un token
            checkModelExist.mockResolvedValue(mockUser)
            bcrypt.compareSync.mockReturnValue(true)
            jwt.sign.mockReturnValue('mockToken')

            // ACT: ejecutamos el servicio
            const result = await validateUserService({
                email: 'test@test.com',
                password: 'password123'
            })

            // ASSERT: verificamos que el resultado sea el esperado
            expect(result).toEqual({
                message: "Logged In",
                token: 'mockToken'
            })
            // Verificamos que se haya llamado a la funcion de JWT
            expect(jwt.sign).toHaveBeenCalled()
        })

        it('should throw error if password is incorrect', async() => {
            // ARRANGE: Preparacion del usuario
            const mockUser = {
                _id: '123',
                email: 'test@test.com',
                password: 'hashedPassword',
                role: "ADMIN"
            }

            checkModelExist.mockResolvedValue(mockUser)
            bcrypt.compareSync.mockReturnValue(false)

            // ACT y ASSERT
            await expect(validateUserService({
                email: 'test@test.com',
                password: 'wrongPassword',
            })).rejects.toThrow("User or password are incorrect")
        })
    })
})