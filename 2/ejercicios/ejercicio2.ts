// Ejercicio 2: Tipado de Objetos
// Crea un archivo llamado ejercicio2.ts y realiza lo siguiente:
// Crea un tipo Estudiante usando type con:
// nombre: string
// edad: number
// activo: boolean
// email?: string (opcional)

export type Estudiante = {
    nombre: string;
    edad: number;
    activo: boolean;
    email?: string;
}

// Crea al menos 2 objetos usando el tipo Estudiante:
// Uno con todas las propiedades (incluyendo email)
// Otro sin la propiedad opcional

const estudiante1 : Estudiante = {
    nombre: "maria",
    edad: 22,
    activo: true,
    email: "maria@gmail.com"
}

const estudiante2: Estudiante = {
    nombre: "Pedro",
    edad: 20,
    activo: true
}
// Crea una interface Materia con:
// nombre: string
// codigo: string
// creditos: number
// Crea un objeto de tipo Materia

interface Materia {
    nombre: string;
    codigo: string;
    cantidadEstudiantes: number;
}

const filosofia : Materia = {
    nombre: "filosofia",
    codigo: "fil01",
    cantidadEstudiantes: 25
}

// Muestra todos los objetos con console.log()
console.log(estudiante1, estudiante2, filosofia)