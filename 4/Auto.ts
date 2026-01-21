import {Motor} from "./interfaces"
import { MotorDeCombustion } from "./MotorDeCombustion";
import { MotorElectrico } from "./MotorElectrico";
import { Chasis, Ruedas, TipoCombustible } from "./partes";

// Clase Auto - Clase Base
// Representa un vehículo automotor con sus componentes principales.
// Esta clase demuestra el concepto de COMPOSICIÓN: el auto está compuesto
// por otras clases (Motor, Chasis, Ruedas).
export class Auto{
    // Propiedades privadas: solo pueden ser accedidas desde dentro de la clase
    // Esto es ENCAPSULACIÓN - protegemos los datos internos del objeto
    private motor: Motor;
    private precio: number;
    private fechaAlta: Date = new Date(); // Se inicializa automáticamente con la fecha actual
    private fechaVenta: Date | null = null; // null hasta que el auto sea vendido
    private patente: string; // Identificador único del vehículo

    // Propiedades públicas: pueden ser accedidas desde fuera de la clase
    // Estas propiedades son públicas porque necesitamos acceder a sus métodos (getters/setters)
    // desde otras clases. Aunque sean públicas, las propiedades internas de Chasis y Ruedas
    // siguen siendo privadas, lo que mantiene la encapsulación.
    public chasis: Chasis;
    public ruedas: Ruedas;

    // Constructor
    constructor(motor: Motor, chasis: Chasis, ruedas: Ruedas, precio: number, patente: string){
         // Validación: un motor de combustión no puede usar batería
         if (motor instanceof MotorDeCombustion && motor.tipoCombustible === TipoCombustible.BATERIA) {
            throw new Error("Un motor de combustión no puede usar combustible eléctrico. Use Nafta o Diesel.");
        }
        
        // Validación: un motor eléctrico solo puede usar batería
        if (motor instanceof MotorElectrico && motor.tipoCombustible !== TipoCombustible.BATERIA && motor.tipoCombustible !== undefined) {
            throw new Error("Un motor eléctrico solo puede usar combustible eléctrico.");
        }

        // Asignamos los valores recibidos a las propiedades de la clase
        this.motor = motor;
        this.chasis = chasis;
        this.ruedas = ruedas;
        this.precio = precio;
        this.patente = patente;
    }

    // Método encender(): enciende el motor del auto
    // Este método delega la acción al objeto motor, demostrando cómo un objeto
    // puede trabajar con otros objetos (composición)
    public encender(): void{
        console.log("Arrancar motor")
        this.motor.arrancar() // Delegamos la acción al motor
    }

    // Método apagar(): apaga el motor del auto
    // Similar a encender(), delega la acción al objeto motor
    public apagar(): void{
        console.log("Apagar motor")
        this.motor.apagar() // Delegamos la acción al motor
    }

    // Método conducir(): permite conducir el auto, pero solo si el motor está encendido
    // Demuestra el uso de condicionales y acceso a propiedades de objetos relacionados
    public conducir(): void{
        // Verificamos el estado del motor antes de conducir
        if(this.motor.estaEncendido){
            console.log("El auto esta en movimiento")
        } else {
            console.log("Debes encender el motor primero")
        }
    }

    // GETTERS y SETTERS
    // Los getters y setters son métodos especiales que permiten acceder y modificar
    // propiedades privadas desde fuera de la clase, manteniendo el control sobre cómo
    // se accede a los datos (encapsulación).
    // En TypeScript, los getters se acceden SIN paréntesis: auto.getPrecio (no auto.getPrecio())
    // Los setters se usan con el operador de asignación: auto.setPrecio = 5000000

    // Getter: permite leer el precio del auto
    public get getPrecio(){
        return this.precio
    }

    // Setter: permite modificar el precio del auto
    public set setPrecio(precio: number){
        this.precio = precio
    }

    // Getter: permite leer la fecha de alta del auto
    public get getFechaAlta(){
        return this.fechaAlta
    }

    // Setter: permite establecer la fecha de venta del auto
    // Se usa cuando el auto es vendido: auto.setFechaVenta = new Date()
    public set setFechaVenta(fecha: Date){
        this.fechaVenta = fecha
    }

    // Getter: permite leer la fecha de venta (puede ser null si no se ha vendido)
    public get getFechaVenta(){
        return this.fechaVenta
    }

    // Setter: permite modificar la patente del auto
    public set setPatente(patente: string){
        this.patente = patente
    }

    // Getter: permite leer la patente del auto
    // IMPORTANTE: Como es un getter, se accede SIN paréntesis: auto.getPatente
    public get getPatente(){
        return this.patente
    }
}

