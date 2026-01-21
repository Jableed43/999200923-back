import {Motor} from "./interfaces"
import { TipoCombustible } from "./partes";

// Clase MotorDeCombustion
// Representa un motor que funciona con combustión (nafta o diesel).
// Implementa la interfaz Motor, lo que significa que DEBE tener todos
// los métodos y propiedades definidos en esa interfaz.
// Esto demuestra el concepto de POLIMORFISMO: diferentes tipos de motores
// pueden ser usados de la misma manera porque implementan la misma interfaz.
export class MotorDeCombustion implements Motor{
    // Propiedades públicas: pueden ser accedidas desde fuera de la clase
    
    // Valor por defecto: el motor inicia apagado
    // Asignar valores por defecto nos permite inicializar propiedades sin constructor
    public estaEncendido: boolean = false;
    
    // Tipo de combustible que usa este motor (NAFTA o DIESEL)
    public tipoCombustible: TipoCombustible;

    // Constructor: recibe el tipo de combustible que usará el motor
    constructor(tipoCombustible: TipoCombustible){
        this.tipoCombustible = tipoCombustible;
    }

    // Método arrancar(): enciende el motor si no está ya encendido
    // Demuestra el uso de condicionales para evitar acciones innecesarias
    arrancar(): void {
        if(this.estaEncendido === true){
            console.log("El motor ya se encuentra encendido")
        } else {
            // Cambiamos el estado del motor a encendido
            this.estaEncendido = true;
            console.log("El motor de combustion se ha encendido")
        }
    }

    // Método apagar(): apaga el motor si no está ya apagado
    apagar(): void {
        if(this.estaEncendido === false){
            console.log("El motor ya se encuentra apagado")
        } else {
            // Cambiamos el estado del motor a apagado
            this.estaEncendido = false;
            console.log("El motor de combustion se ha apagado")
        }
    }
}
