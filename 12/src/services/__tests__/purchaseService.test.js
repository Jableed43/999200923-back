import {afterEach, jest} from '@jest/globals'
import {checkModelExist} from '../../helpers/checkExist.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validateUserService } from '../userService.js'
import { createPurchaseService } from '../purchaseService.js'
import Product from '../../models/productModel.js'

// Mockear la db de mongoDB de product
jest.mock("../../models/productModel.js")

// Mockear a firebase: Evitamos conexiones reales durante estos tests
// factory function para devolver los objetos que necesitemos
// van a contener todas las funciones que usa nuestro servicio

jest.mock('firebase/app', () => ({
    initializeApp: jest.fn().mockReturnValue({})
}))
jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    // Mockeamos addDoc para que devuelva una PROMESA resuelta con un ID falso
    addDoc: jest.fn().mockResolvedValue({ id: 'mockPurchaseId' }),
    query: jest.fn(),
    orderBy: jest.fn(),
    getDocs: jest.fn(),
    where: jest.fn(),
    doc: jest.fn(),
    getDoc: jest.fn(),
    getFirestore: jest.fn().mockReturnValue({})
}))

describe('createPurchaseService', () => {
    // Deberia retornar error si al realizar la compra el array de items esta vacio
    it('should throw error if items are missing or empty', async () => {
        // Validar la entrada, array vacio o inexistente
        await expect(createPurchaseService({}))
            .rejects.toThrow('Items array is required and must not be empty')
    })

    // Deberia realizar la compra si tenemos stock disponible
    it('should create purchase is stock is available', async () => {
        const mockProduct = {
            _id: 'p1',
            name: 'Test product',
            quantity: 10,
            price: 100,
            profitRate: 1.2
        }
        Product.findById.mockResolvedValue(mockProduct)
        Product.findOneAndUpdate.mockResolvedValue({})

        const purchaseData = {
            userId: 'u1',
            items: [{productId: 'p1', quantity: 2}]
        }

        const result = await createPurchaseService(purchaseData)

        // El id devuelto es el del mock de firebase
        expect(result.id).toBe('mockPurchaseId')
        // El calculo debe ser (precio * profit) * cantidad / (100 * 1.2) * 2 = 240
        expect(result.totalAmount).toBe(240)
        // Verificamos que se descontó el stock de mongoDB
        expect(Product.findOneAndUpdate).toHaveBeenCalled()
    } )

    // Test para cuando no tenemos stock suficiente
    it('should throw error if not enough stock', async() => {
        const mockProduct = {
            _id: 'p1',
            name: 'Test product',
            quantity: 1,
            price: 100,
            profitRate: 1.2
        }

        Product.findById.mockResolvedValue(mockProduct)

        const purchaseData = {
            userId: 'u1',
            items: [{productId: 'p1', quantity: 2}]
        }

        // Utilizamos regex para que el test sea mas robusto
        // El mensaje de error contiene "Not enough stock", pero no es literalmente ese el mensaje
        await expect(createPurchaseService(purchaseData))
            .rejects.toThrow(/Not enough stock/)
    })
})