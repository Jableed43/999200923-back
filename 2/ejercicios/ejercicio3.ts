import type { Estudiante } from "./ejercicio2.ts"

// Ejercicio 3: Funciones Tipadas
// Crea un archivo llamado ejercicio3.ts y realiza lo siguiente:

// Crea una función saludar que:
// Reciba un parámetro nombre de tipo string
// Retorne un string con el mensaje: "Hola, [nombre]"
// Llama a la función con tu nombre y muestra el resultado

    function saludar(nombre: string): string {
        return `Hola, ${nombre}`
    }

    console.log(saludar("javier"))

// Crea una función calcularPromedio que:
// Reciba un array de números notas: number[]
// Retorne el promedio (suma de todas las notas / cantidad)
// Prueba con el array [7, 8, 9, 6, 8]

    function calcularPromedio(notas: number[]): number {
       const suma = notas.reduce((total, nota) => total + nota, 0)
        return suma / notas.length
    }

    console.log(calcularPromedio([7, 8, 9, 6, 8]))

// Crea una función mostrarEstudiante que:
// Reciba un objeto de tipo Estudiante (del ejercicio anterior)
// No retorne nada (void)
// Use console.log() para mostrar la información del estudiante
// Si tiene email, mostrarlo; si no, mostrar "Sin email"
 function mostrarEstudiante(estudiante: Estudiante): void {
    console.log(estudiante.nombre)
    console.log(estudiante.edad)
    console.log(estudiante.activo)

    // Si tiene email, mostrarlo
    if(estudiante.email){
        console.log(estudiante.email)
    } else {
        // si no tiene email, mostrar "Sin email"
        console.log("Sin Email")
    }
 }

 let javier: Estudiante = {
    nombre: "javier",
    edad: 33,
    activo: true,
    email: "j@gmail.com"
 }

  let gabriel: Estudiante = {
    nombre: "gabriel",
    edad: 32,
    activo: true,
 }

 mostrarEstudiante(javier)
 mostrarEstudiante(gabriel)