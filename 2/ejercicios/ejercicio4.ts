// Ejercicio 4: Clases Básicas
// Crea un archivo llamado ejercicio4.ts y realiza lo siguiente:

// Crea una clase Libro con:
// Propiedades:

// titulo: string
// autor: string
// anio: number
// disponible: boolean
// Constructor: que inicialice todas las propiedades

class Libro {
    // propiedades
    titulo: string;
    autor: string;
    anio: number;
    disponible: boolean;

    // constructor
    constructor(titulo: string, autor: string, anio: number, disponible: boolean){
        this.titulo = titulo,
        this.autor = autor,
        this.anio = anio,
        this.disponible = disponible
    }

    // metodos
}

let harryPotter = new Libro("harry potter", "jk rowling", 2000, true)
harryPotter.titulo = "Albin y las ardillas"
console.log(harryPotter.titulo)