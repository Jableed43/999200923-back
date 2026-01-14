// Tipos
let edad: number
let precio: number
let verdadero: boolean
let nombre: string

// Podemos habilitar tipado dinamico si utilizamos any
let valorDinamico: any
valorDinamico = true
valorDinamico = 10
valorDinamico = ""
valorDinamico = undefined

// Array
let mixto: (string | number | boolean)[] = [1,2,3,4,5,6, "str", false]
let numeros: number[] = [1]
let nombres: string[] = ["javier"]

// Sintaxis generica
let arrayNombres: Array<string> = ["Ana", "Luis", "Pedro"]

// Tipar objetos

// Inline - Directo
// pro: facil // contra: no es practico porque debemos repetir codigo por cada "instancia"
let persona1 : {
    nombre: string;
    edad: number;
    activ: boolean;
} = {
    nombre: "javier",
    edad: 33,
    activ: true
}

// Type - Creamos nuestro tipo de dato
// pro: es simple y se usa comunmente para tipar objetos // contra: se suele usar en casos muy simples
type Persona = {
    nombre: string;
    edad: number;
    activo: boolean;
}
// Creo una instancia -  concreto creado a partir de una plantilla
let persona2: Persona = {
    nombre: "javier",
    edad: 33,
    activo: true
}

// Interface - Es un contrato, es un acuerdo de como algo debe ser y se debe cumplir
// molde que garantiza que cualquier objeto o clase que "implemente" la interfaz cumpla con esa forma predefinida
// los metodos no se implementan en la interface, solo se define su nombre y su existencia
// la interface no se puede instanciar, solo se utiliza para tipar
interface Persona3 {
    nombre: string;
    edad: number;
    activo: boolean;
    hobbie?: string;
    saludar?(nombre: string): string;
}

let persona3: Persona3 = {
    nombre: "javier",
    edad: 33,
    activo: true,
    hobbie: "cocinar"
}

let personas: Persona3[] = [
    {
    nombre: "javier",
    edad: 33,
    activo: true,
},
{
    nombre: "javier",
    edad: 33,
    activo: true,
    hobbie: "cocinar"
}
]

// Tipar funciones
// function saludar(persona: Persona3): string {
//     return `Hola ${persona.nombre}, ${persona.edad}, ${persona.activo}, ${persona.hobbie ? persona.hobbie : "" }`
// }

function saludar(persona: Persona3): string {
    if(persona.hobbie){
       return `Hola ${persona.nombre}, ${persona.edad}, ${persona.activo}, ${persona.hobbie}`
    } else {
       return `Hola ${persona.nombre}, ${persona.edad}, ${persona.activo}`
    }
}

console.log(saludar({
    nombre: "javier",
    edad: 33,
    activo: true,
    hobbie: "cocinar"
}))

// void es un tipo de dato que significa que no retorna nada
function saludar2(nombre: string, apellido: string): void {
     console.log(`Hola ${nombre}, ${apellido}`)
}

console.log("retorno de saludar2" ,saludar2("javier", "lopez"))