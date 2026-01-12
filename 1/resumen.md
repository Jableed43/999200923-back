Que es js?
- Lenguaje de programacion de alto nivel, interpretado y orientado a objetos
- Es uno de los mas utilizados en desarrollo web front (react, angular, vue, next) + back (express, nest)
- Multiplataforma (navegadores y servidor)
- Tipado dinamico. let variable = true -> variable = 0

Tipos de datos
- Primitivos: number, string, boolean, undefined, null, symbol
- Complejos: objeto, array, function 

Variables
var: 
- Scope de bloque o global
- Puede ser redeclarada // var javier , var javier
- Puede causar problemas en bucles

let: 
- Scope de bloque
- No puede ser redeclarada en el mismo scope
- ideal para bucles y condicionales
- se puede reasignar

global dentro del archivo sin estar dentro de funcion, objeto
 let resultado = 0

local, en bloque, dentro de llaves u objetos
function sumar (a, b){
    let resultado = a + b
}

const:
- Scope de bloque
- No puede ser reasignada
- No puede ser redeclarada
- Al declararla hay que inicializarla (darle valor)
- Si es objeto/array el contenido puede modificarse
- ideal para valores que no cambian (puertos, funciones, archivos)

- Estructuras de control
- Operadores