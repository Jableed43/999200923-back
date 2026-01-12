//1 - Variables y tipos
let edad = 20
const nombre = "Javier"
let estaActivo = true

console.log("Tipo de edad", typeof edad)
console.log("Tipo de nombre", typeof nombre)
console.log("Tipo de estaActivo", typeof estaActivo)

// imprimir por consola el tipo de cada variable
console.log({
    edad: typeof edad,
    nombre: typeof nombre,
    estaActivo: typeof estaActivo
})

// Crea una funcion que determine si un estudiante aprobo
function aprobo(nota) {
    if(nota >= 6){
        return true
    } else {
        return false
    }
}

console.log(aprobo(7))
console.log(aprobo(4))
console.log(aprobo(10))

const alumnos = [
    { nombre: "Walter", nota: 10, aprobado: null },
    { nombre: "Javier", nota: 4, aprobado: null },
    { nombre: "Alanis", nota: 8, aprobado: null },
    { nombre: "Lucas", nota: 8, aprobado: null },
    { nombre: "Sofia", nota: 9, aprobado: null },
    { nombre: "Mateo", nota: 3, aprobado: null },
    { nombre: "Valentina", nota: 7, aprobado: null },
    { nombre: "Diego", nota: 5, aprobado: null },
    { nombre: "Camila", nota: 6, aprobado: null },
    { nombre: "Nicolas", nota: 2, aprobado: null },
    { nombre: "Isabella", nota: 10, aprobado: null },
    { nombre: "Julian", nota: 4, aprobado: null },
    { nombre: "Martina", nota: 8, aprobado: null },
    { nombre: "Sebastian", nota: 1, aprobado: null },
    { nombre: "Luciana", nota: 9, aprobado: null },
    { nombre: "Gabriel", nota: 5, aprobado: null },
    { nombre: "Victoria", nota: 7, aprobado: null },
    { nombre: "Bastian", nota: 3, aprobado: null },
    { nombre: "Antonella", nota: 6, aprobado: null },
    { nombre: "Felipe", nota: 8, aprobado: null },
    { nombre: "Renata", nota: 10, aprobado: null },
    { nombre: "Tomas", nota: 4, aprobado: null },
    { nombre: "Elena", nota: 9, aprobado: null },
    { nombre: "Samuel", nota: 2, aprobado: null },
    { nombre: "Florencia", nota: 7, aprobado: null },
    { nombre: "Iker", nota: 5, aprobado: null },
    { nombre: "Aitana", nota: 8, aprobado: null },
    { nombre: "Agustin", nota: 6, aprobado: null },
    { nombre: "Micaela", nota: 3, aprobado: null },
    { nombre: "Joaquin", nota: 9, aprobado: null },
    { nombre: "Delfina", nota: 4, aprobado: null },
    { nombre: "Santiago", nota: 7, aprobado: null },
    { nombre: "Zoe", nota: 10, aprobado: null },
    { nombre: "Benjamin", nota: 5, aprobado: null }
];

// Modifica el array original
let result = alumnos.map(function(alumno) {
    // Modifico el array de alumnos
    let calificacion = aprobo(alumno.nota)
    alumno.aprobado = calificacion
    return calificacion
} )

console.log(alumnos)
console.log(result)

// Queremos calcular el promedio de las notas de los estudiantes
// Metodo de array reduce, permite reducir en un solo valor otros y luego calcular promedios
function calcularPromedio(alumnos) {
    // Acumulador es quien va a acumular los valores que se van sumando
    // Alumno es el valor actual que debo sumar a mi acululador
    let sumaNotas = alumnos.reduce(function(acumulador, alumno) {
       return acumulador + alumno.nota
    }, 0)

    return sumaNotas / alumnos.length

}
let promedio = calcularPromedio(alumnos)
console.log("Promedio de notas", Number(promedio.toFixed(2)))

// True - Truthy
    let truthy = [ "hola", " ", true, 1, -20, {}, [], function(){}, Symbol('id') ]
// False - Falsy
    let falsy = [ false, 0, -0, "", null, undefined, NaN ]

// Queremos contar cuantos aprobaron y cuantos desaprobaron
function contarAprobados(alumnos) {
    let aprobados = 0
    let desaprobados = 0
    let totalAlumnos = alumnos.length

    alumnos.forEach(function(alumno) {
        if(alumno.aprobado){
            // aprobados = aprobados + 1
            aprobados++
        } else {
            desaprobados++
        }
    })

    return {
        aprobados: aprobados,
        desaprobados: desaprobados,
        total: totalAlumnos,
        porcentajeAprobados: (aprobados / totalAlumnos) * 100,
        porcentajeDesaprobados: (desaprobados / totalAlumnos) * 100
    }
}

let estadisticas = contarAprobados(alumnos)
console.log("Aprobados", estadisticas.aprobados)
console.log("Desaprobados", estadisticas.desaprobados)
console.log("Total alumnos", estadisticas.total)
console.log("Porcentaje alumnos aprobados", parseInt(estadisticas.porcentajeAprobados.toFixed(2)))
console.log("Porcentaje alumnos desaprobados", Number(estadisticas.porcentajeDesaprobados.toFixed(2)))

// Queremos saber la frecuencia de las notas
// Cuantos sacaron 5, cuantos sacaron 9, cuantos sacaron 10

let frecuencia = {}

alumnos.forEach(function(alumno) {
    if(frecuencia[alumno.nota]){
        frecuencia[alumno.nota]++
    } else {
        frecuencia[alumno.nota] = 1
    }
})

let resultado = []
for (let nota in frecuencia){
    resultado.push({
        nota: Number(nota),
        incidencia: frecuencia[nota]
    })
}

console.log(resultado)