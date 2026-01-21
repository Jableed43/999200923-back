import {Motor} from "./interfaces"
import { TipoCombustible } from "./partes";

// Clase MotorElectrico
// Representa un motor que funciona con energía eléctrica (batería).
// Al igual que MotorDeCombustion, implementa la interfaz Motor.
// Esta clase demuestra POLIMORFISMO: aunque es diferente a MotorDeCombustion,
// puede ser usada de la misma manera porque implementa la misma interfaz.
export class MotorElectrico implements Motor{
    // Propiedades públicas con valores por defecto
    
    // El motor inicia apagado
    public estaEncendido: boolean = false;
    
    // Porcentaje de batería disponible (0-100)
    // Inicia con 100% de carga
    public porcentajeBateria: number = 100;
    
    // Tipo de combustible: siempre será BATERIA para un motor eléctrico
    public tipoCombustible: TipoCombustible = TipoCombustible.BATERIA;

    // Método arrancar(): enciende el motor eléctrico si no está ya encendido
    arrancar(): void {
        if(this.estaEncendido === true){
            console.log("El motor electrico ya se encuentra encendido")
        } else {
            this.estaEncendido = true;
            console.log("El motor electrico se ha encendido")
        }
    }

    // Método apagar(): apaga el motor eléctrico si no está ya apagado
    apagar(): void {
        if(this.estaEncendido === false){
            console.log("El motor electrico ya se encuentra apagado")
        } else {
            this.estaEncendido = false;
            console.log("El motor electrico se ha apagado")
        }
    }
}
