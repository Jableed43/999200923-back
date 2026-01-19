class CuerpoCeleste{
    private nombre: string;

    constructor(nombre: string){
        this.nombre = nombre;
    }

    get readNombre(){
        return this.nombre
    }
}

let sol = new CuerpoCeleste("helios")
console.log(sol.readNombre)

// HERENCIA
class Planeta extends CuerpoCeleste{
    protected habitantes: number

    constructor(nombre: string, habitantes: number){
        // super -> superclase (habla de la clase padre)
        // super representa al constuctor de la clase padre
        // planeta necesita su propio constructor por eso tiene el parametro nombre
        super(nombre)
        // Ademas de lo heredado puede tener sus propiedades unicas
        this.habitantes = habitantes
    }
    // Ademas de lo heredado puede tener sus metodos unicos
    get readHabitantes() {
        return this.habitantes
    }
}

let tierra = new Planeta("tierra", 45000000)
console.log(tierra.readNombre)
// Podemos extender una superclase todo lo que queramos
class Estrella extends CuerpoCeleste{
    tamanio: number
    constructor(nombre: string, tamanio: number){
        super(nombre)
        this.tamanio = tamanio
    }
}

// una clase hija puede ser superclase de otra
class EnanaBlanca extends Estrella{
    edad: number
    constructor(nombre: string, tamanio: number, edad: number){
        super(nombre, tamanio)
        this.edad = edad
    }
}