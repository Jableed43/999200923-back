// Estructuras de control
// Permiten modificar el flujo de ejecucion de un programa

// let temperatura = 15
// if(temperatura > 20){
//     console.log("Temperatura calida")
// } 

// let temperatura = 15
// if(temperatura > 20){
//     console.log("Temperatura calida")
// } else {
//     console.log("Temperatura fria")
// }

let temperatura = 15

if(typeof temperatura === "number" ){
    if(temperatura > 25){
    console.log("Temperatura calida")
    } else if(temperatura < 25 && temperatura > 10) {
        console.log("Temperatura templada")
    } else {
        console.log("Temperatura fria")
    }
} else {
    console.log("ingrese un numero")
}


// If ternario , permite armar sentencias logicas en poco espacio

let resultado = temperatura > 25 ? "Temperatura calida" : "Temperatura fria"
console.log(resultado)

let resultado2 = temperatura > 25 ? "Temperatura calida" : temperatura < 25 && temperatura > 10 ? "Temperatura templada" : "Temperatura fria"
console.log(resultado2)

// Switch, se orienta a mas casos posibles 
// Cuando trabajamos con operadores es necesario que en el switch se coloque un booleano

switch (true) {
    case temperatura > 25:
        console.log("Temperatura calida")
        break;

    case temperatura < 25 && temperatura > 10:
    console.log("Temperatura templada")
        break;

    case temperatura < 10:
    console.log("Temperatura fria")
        break;

    default:
    console.log("Ingrese valor correcto")
        break;
}

// Operadores
// Aritmeticos
let a = 10
let b = 3

console.log(a + b)
console.log(a - b)
console.log(a * b)
console.log(a / b)
console.log(a % b)
console.log(a ** b)

// Operadores de asignacion
let c = 5

// c = c + 3
c += 3
console.log(c)

// c = c - 3
c -= 2
console.log(c)

// c = c * 3
c *= 2
console.log(c)

// c = c / 3
c /= 3
console.log(c)

// Operadores de comparacion
let x = "5"
let y = 5

// Igualdad de valores, solo compara valor no tipo
console.log(x == y)

// Igualdad estricta, compara valor y tipo
console.log(x === y)

// Desigualdad
console.log(x != y)
console.log(x !== y)


// Operadores logicos
// AND - && - Para que and sea true todos los valores deben dar true

// Planetas
let tieneAtmosfera = false
let temperaturaAdecuada = true
let tieneAgua = false

if(tieneAtmosfera && temperaturaAdecuada){
    console.log("Es habitable")
} else {
    console.log("No es habitable")
}

// OR - || - Para que or sea true uno de los valores debe ser true
if(temperaturaAdecuada || tieneAgua){
    console.log("Es habitable")
} else {
    console.log("No es habitable")
}

// NOT - ! - Niega la condicion
console.log(!true)

if(!(temperaturaAdecuada || tieneAgua)){
    console.log("No es habitable")
} else {
    console.log("No es habitable")
}

// Bucles
let array = [1,2,3,4,5,6,7,8,9,10]
for (let index = 0; index < array.length; index++) {
    const element = array[index];
    console.log(element)
}

// Metodos de array
// ForEach - Por cada valor del array ejecuta una funcion/callback
array.forEach(num => (console.log(num * 2)))

// Map - Genera un nuevo array con los valores
const duplicados = array.map(num => (num * 2))
console.log(duplicados)

// Filter -> Genera un nuevo array con los valores que cumplan la condicion
// Encuentra numeros pares
const pares = array.filter(num => (num % 2 === 0))
console.log(pares)

// Find -> Retorna el primer valor que cumpla la condicion
const par = array.find(num => (num % 2 === 0))
console.log(par)

