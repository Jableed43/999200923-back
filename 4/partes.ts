// ARCHIVO: partes.ts
// Este archivo contiene las clases Chasis y Ruedas, además de los enums
// TipoRueda y TipoCombustible.
// ¿Por qué Chasis y Ruedas son clases y no simples propiedades?
// Porque necesitamos encapsular datos (color, rodado, tipo) y proporcionar
// métodos (getters/setters) para acceder y modificar esos datos de forma controlada.

// Clase Chasis
// Representa el chasis de un auto. Tiene una propiedad privada (color)
// que solo puede ser accedida o modificada mediante getters y setters.
// Esto demuestra ENCAPSULACIÓN.
class Chasis{
    // Propiedad privada: solo accesible desde dentro de la clase
    private color: string;

    // Constructor: recibe el color inicial del chasis
    constructor(color: string){
        this.color = color;
    }

    // Setter setColor: permite cambiar el color del chasis
    // Al cambiar el color, muestra un mensaje informativo
    public set setColor(color: string){
        console.log(`Color ${this.color} ha cambiado a ${color}`)
        this.color = color
    }

    // Getter getColor: permite leer el color actual del chasis
    public get getColor(){
        return this.color
    }
}

// Enum TipoRueda
// Un enum (enumeración) es una forma de definir un conjunto de valores constantes.
// En lugar de usar strings libres como "Deportiva", usamos un enum para evitar
// errores de tipeo y tener opciones limitadas y controladas.
// Ejemplo de uso: TipoRueda.DEPORTIVA
enum TipoRueda {
    DEPORTIVA = "Deportiva",
    TODO_TERRENO = "Todo terreno",
    CALLE = "Calle"
}

// Enum TipoCombustible
// Define los tipos de combustible disponibles en el sistema.
// Ejemplo de uso: TipoCombustible.NAFTA
enum TipoCombustible {
    BATERIA = "Bateria",
    NAFTA = "Nafta",
    DIESEL = "Diesel"
}

// Clase Ruedas
// Representa las ruedas de un auto. Tiene propiedades privadas (rodado y tipo)
// que solo pueden ser accedidas mediante getters y setters.
// Esto demuestra ENCAPSULACIÓN: protegemos los datos internos y controlamos
// cómo se accede a ellos desde fuera de la clase.
class Ruedas{
    // Propiedades privadas: no pueden ser accedidas directamente desde fuera
    private rodado: number; // Tamaño de la rueda (ej: 15, 17, 18 pulgadas)
    private tipo: TipoRueda; // Tipo de rueda según el enum

    // Constructor: recibe el rodado (tamaño) y el tipo de rueda
    constructor(rodado: number, tipo: TipoRueda){
        this.rodado = rodado;
        this.tipo = tipo;
    }

    // Getter getRodado: permite leer el rodado de las ruedas
    public get getRodado(){
        return this.rodado
    }

    // Setter setRodado: permite modificar el rodado de las ruedas
    public set setRodado(rodado: number){
        this.rodado = rodado
    }

    // Getter getTipo: permite leer el tipo de ruedas
    public get getTipo(){
        return this.tipo
    }

    // Setter setTipo: permite modificar el tipo de ruedas
    public set setTipo(tipo: TipoRueda){
        this.tipo = tipo
    }
}

export { Chasis, TipoRueda, Ruedas, TipoCombustible }