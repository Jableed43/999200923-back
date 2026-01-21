import { TipoCombustible } from "./partes";

// INTERFACES
// Una interfaz es como un "contrato" que define qué métodos y propiedades
// DEBE tener una clase que la implemente.
// En este caso, cualquier clase que implemente la interfaz Motor DEBE tener:
// - Un método arrancar() que no retorna nada (void)
// - Un método apagar() que no retorna nada (void)
// - Una propiedad estaEncendido de tipo boolean
// - Una propiedad tipoCombustible de tipo TipoCombustible
// Esto permite POLIMORFISMO: diferentes clases (MotorDeCombustion, MotorElectrico)
// pueden ser usadas de la misma manera porque implementan la misma interfaz.

// Interfaz Motor: define el contrato que deben cumplir todos los tipos de motores
interface Motor{
    arrancar(): void; // Método que enciende el motor
    apagar(): void; // Método que apaga el motor
    estaEncendido: boolean; // Estado actual del motor (true = encendido, false = apagado)
    tipoCombustible: TipoCombustible; // Tipo de combustible que usa el motor
}

export {Motor}