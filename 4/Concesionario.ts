import { Auto } from "./Auto";
import { Motor } from "./interfaces";
import { Chasis, Ruedas } from "./partes";

// Clase Concesionario
// Esta clase administra el inventario de autos: los crea, los almacena,
// los vende y mantiene un registro de los autos disponibles y vendidos.
// Demuestra el concepto de AGREGACIÓN: el concesionario contiene múltiples
// objetos Auto, pero los autos pueden existir independientemente.
export class Consecionario {
    // Puede ser un array de autos o un array vacio
    private autosDisponibles: Auto[] = []
    private autosVendidos: Auto[] = []

    // Funciona como una especie de constructor de la clase que administra
    public fabricarAuto(motor: Motor, chasis: Chasis, ruedas: Ruedas, precio: number, patente: string){
        // Creamos una nueva instancia de Auto
        const nuevoAuto = new Auto(motor, chasis, ruedas, precio, patente)
        
        // Agregamos el auto al array de disponibles usando push()
        // push() agrega un elemento al final del array
        this.autosDisponibles.push(nuevoAuto)
        
        console.log("Auto creado y agregado al inventario")
        return nuevoAuto
    }

    // Método obtenerCantidadAutos(): retorna la cantidad de autos disponibles en el inventario
    public obtenerCantidadAutos(): number{
        // length es una propiedad de los arrays que retorna la cantidad de elementos
        return this.autosDisponibles.length
    }

    // Getter getAutosDisponibles: permite acceder al array de autos disponibles desde fuera de la clase
    public get getAutosDisponibles(){
        return this.autosDisponibles
    }

    // Getter getAutosVendidos: permite acceder al array de autos vendidos desde fuera de la clase
    public get getAutosVendidos(){
        return this.autosVendidos
    }

    // Método venderAuto(): busca un auto por su patente y lo marca como vendido
    // El auto se mueve del array de disponibles al array de vendidos
    public venderAuto(patente: string): Auto | null{
        // findIndex() busca en el array y retorna el ÍNDICE del elemento que cumple la condición
        // Si no encuentra nada, retorna -1
        // IMPORTANTE: getPatente es un getter, por eso se accede SIN paréntesis
        let autoEncontrado = this.autosDisponibles.findIndex(auto => auto.getPatente === patente)
        
        // Si encontramos el auto (índice mayor o igual a 0)
        if(autoEncontrado > -1){
            // splice() elimina elementos del array y retorna un nuevo array con los elementos eliminados
            // Parámetros: (índice donde empezar, cantidad de elementos a eliminar)
            // [0] accede al primer elemento del array retornado por splice
            const autoVendido = this.autosDisponibles.splice(autoEncontrado, 1)[0]
            
            // Actualizamos la fecha de venta del auto usando el setter
            // setFechaVenta es un setter, por eso se usa con el operador de asignación =
            autoVendido.setFechaVenta = new Date()
            
            console.log(`Auto con patente ${patente} vendido`)
            
            // Agregamos el auto vendido al array de vendidos
            this.autosVendidos.push(autoVendido)
            
            return autoVendido
        }
        
        // Si no se encontró el auto
        console.log("no se encontro el auto con la patente")
        return null
    }
}