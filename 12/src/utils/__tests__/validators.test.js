import { isGoodPassword } from "../validators";
// Texto alfanumerico entre 6 a 12 caracteres, 
// una letra al menos, una mayuscula y una minuscula
// un numero al menos
describe('Validators unit tests', () => {
    describe('isGoodPassword', () => {
        // En este test vamos a testear un metodo que no tiene dependencias

        it('should return true for valid passwords', () => {
            // Caso de exito
            expect(isGoodPassword('Password123')).toBe(true)
            expect(isGoodPassword('A1b2c3')).toBe(true)
        })

        it('should return false if too short', () => {
            expect(isGoodPassword('Pas1')).toBe(false)
        })

        it('should return false if too long', () => {
            expect(isGoodPassword('Password123456789')).toBe(false)
        })

        it('should return false if missing digits', () => {
            expect(isGoodPassword('Password')).toBe(false)
        })

        it('should return false if missing uppercase', () => {
            expect(isGoodPassword('password123')).toBe(false)
        })

        it('should return false if missing uppercase', () => {
            expect(isGoodPassword('PASSWORD123')).toBe(false)
        })
    })
})