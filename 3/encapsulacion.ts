// Encapsulacion
// Modificadores de acceso (clases) - Seguridad - Palabras reservadas que definen el tipo de acceso
// public (por defecto) -> Accesible desde cualquier lugar. Permite lectura y escritura directa de las propiedades.
// private -> Solo se accede desde dentro de la clase. Ocultar detalles de la implementacion.
// como extra private puede utilizar "_" // "#" lo define como privado realmente
// protected -> Se puede acceder desde dentro de la clase y sus clases hijas (subclases)
// readonly -> solo de lectura, solo se asigna el valor una vez (declaracion o constructor), no modificable
// La idea es proveerle al usuario lo que realmente necesita de la clase
// a la vez restringirle lo que no necesita y asi tambien disminuir la complejidad 

class Planeta {
    public nombre: string;
    private _masaKg: number;
    protected radioKm: number;

    constructor(nombre: string, _masaKg: number, radioKm: number){
        this.nombre = nombre;
        this._masaKg = _masaKg;
        this.radioKm = radioKm
    }

    // Metodos
    // setters -> definir/ configurar/ asignar un valor
    // getters -> traer/ obtener/ leer/ recuperar un valor
    // Buena practica colocar set o get delante del metodo
    // los setters y getters pueden llamarse igual

    public get masaKg(): number {
        console.log(`Desde el metodo publico -> accedemos a la masaKg de ${this.nombre}`)
        return this._masaKg
    }

    // Un set no usa retorno
    public set masaKg(nuevaMasa: number) {
        if(nuevaMasa <= 0){
            throw new Error ("La masa debe ser mayor a 0")
        }
        console.log(`Cambiando la masa`)
        this._masaKg = nuevaMasa
    }

    // Si necesita ejecucion
    public getMasaKg(): number {
        // utilizando metodo privado, son utilizados desde dentro de la clase
        this.metodoPrivado()
        return this._masaKg
    }

    public setRadioKm(radio: number): string{
        this.radioKm = radio
        return `Modificando radioKm a ${this.radioKm}`
    }
    
    // metodo interno
    private metodoPrivado(): void{
        console.log(`Desde un metodo privado -> soy un metodo interno de ${this.nombre}`)
    }
}

let saturno = new Planeta("saturno", 300000, 200000)
console.log(saturno.nombre)
// console.log(saturno._masaKg)
// console.log(saturno.radioKm)

// Como modificamos o leemos lo protegido/privado si solo es accesible desde la clase o sus hijos?
// 1. Desde el constructor
// 2. Metodos Setters y Getters
// Getter
console.log(saturno.masaKg)
// Setter - necesita asignacion, no hace falta ejecutar el metodo
saturno.masaKg = 7000
console.log(saturno.masaKg)

// Sin utilizar setter ni getters, no es buena practica pero funciona
console.log("getMasaKg", saturno.getMasaKg());
console.log("setRadioKm", saturno.setRadioKm(5100));

// Metodo privado, no se puede ejecutar desde afuera de la clase
// Son privados para: dismuniuir complejidad de la clase, porque sirven internamente para su funcionamiento,
// siendo mal utilizados podrian "romper" la clase
// saturno.metodoPrivado()

// Al usuario que utiliza la clase no le importa como esta construido el software, le importa para que lo puede utilizar