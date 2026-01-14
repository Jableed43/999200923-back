// La clase si puede contener la implementacion de los metodos a diferencia de la interface
// Ademas puedo utilizar una interface para tipar mi clase

class Planeta {
    // Atributos/ Propiedades -> cuales y que tipo tiene cada uno
    nombre: string;
    masaKg: number;
    radioKm: number;
    tieneAtmosfera: boolean;
    tipo: string;

    // Constructor -> Inicializa las propiedades al crear el objeto (instancia de una clase)
    // Similar a los parametros de una funcion, funcionan como inputs o datos de entrada
    // Parametro es la definicion del nombre y tipo del dato de entrada
    constructor(nombre: string, masaKg: number, radioKm: number, tieneAtmosfera: boolean, tipo: string){
        // El constructor recibe los argumentos y los asigna a las propiedades del objeto
        // Argumento es el valor del parametro
        this.nombre = nombre;
        this.masaKg = masaKg;
        this.radioKm = radioKm;
        this.tieneAtmosfera = tieneAtmosfera;
        this.tipo = tipo;
    }

    // Metodos, definen el comportamiento del objeto - Muchas veces utilizan los datos internos
    calcularVolumen(): number{
        return (4/3) * Math.PI * Math.pow(this.radioKm, 3)
    }

}

// New significa creacion de instancia
let saturno = new Planeta("Saturno", 200, 200, true, "planeta")

console.log(saturno.nombre)
console.log(saturno.calcularVolumen())