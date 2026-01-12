# Ejercicios de Repaso - JavaScript

## Instrucciones

1. Resuelve cada ejercicio en orden
2. Usa `console.log()` para ver los resultados
3. Comenta tu código cuando sea necesario
4. Prueba con diferentes valores
5. Si te atascas, revisa los ejemplos de la teoría

---

## Ejercicio 1: Variables y Tipos

```javascript
// 1. Declara tres variables:
//    - Una variable "edad" con valor 20 (puede cambiar)
//    - Una constante "nombre" con valor "María" (no puede cambiar)
//    - Una variable "activo" con valor true (puede cambiar)

// 2. Usa console.log para mostrar el tipo de cada variable usando typeof

// 3. Cambia el valor de "edad" a 21 y muestra el nuevo valor
```

---

## Ejercicio 2: Estructuras de Control - if/else

```javascript
// 1. Crea una función "esMayorDeEdad" que reciba una edad
//    y retorne true si es >= 18, false si no

// 2. Crea una función "clasificarNota" que reciba una nota y retorne:
//    - "Excelente" si nota >= 9
//    - "Muy bueno" si nota >= 7
//    - "Bueno" si nota >= 6
//    - "Regular" si nota >= 4
//    - "Insuficiente" si nota < 4

// 3. Prueba ambas funciones con diferentes valores
```

---

## Ejercicio 3: Arrays y Bucles - for

```javascript
// Dado este array:
let estudiantes = ["Ana", "Luis", "María", "Carlos"];

// 1. Usa un bucle for para imprimir cada nombre

// 2. Usa un bucle for para imprimir cada nombre con su índice
//    Ejemplo: "0: Ana", "1: Luis", etc.

// 3. Crea un nuevo array "estudiantesMayusculas" que contenga
//    todos los nombres en mayúsculas (usa un bucle for)
```

---

## Ejercicio 4: Arrays y Bucles - forEach

```javascript
// Dado este array:
let notas = [8, 7, 9, 5, 6];

// 1. Usa forEach para imprimir cada nota

// 2. Usa forEach para imprimir "Aprobó" o "Desaprobó" según cada nota
//    (aprueba con nota >= 6)

// 3. Usa forEach para sumar todas las notas y mostrar el total
```

---

## Ejercicio 5: Arrays y map

```javascript
// Dado este array:
let alumnos = [
    { nombre: "Ana", nota: 8 },
    { nombre: "Luis", nota: 5 },
    { nombre: "María", nota: 9 }
];

// 1. Usa map para crear un nuevo array con solo los nombres

// 2. Usa map para crear un nuevo array donde cada nota esté aumentada en 1

// 3. Usa map para agregar la propiedad "aprobado" a cada alumno
//    (true si nota >= 6, false si no)
```

---

## Ejercicio 6: Arrays y filter

```javascript
// Dado este array:
let alumnos = [
    { nombre: "Ana", nota: 8 },
    { nombre: "Luis", nota: 5 },
    { nombre: "María", nota: 9 },
    { nombre: "Carlos", nota: 4 },
    { nombre: "Sofía", nota: 7 }
];

// 1. Usa filter para obtener solo los alumnos que aprobaron (nota >= 6)

// 2. Usa filter para obtener solo los alumnos con nota >= 8

// 3. Usa filter para obtener solo los alumnos cuyo nombre empieza con "A"
```

---

## Ejercicio 7: Funciones

```javascript
// 1. Crea una función "sumar" que reciba dos números y retorne su suma

// 2. Crea una función flecha "multiplicar" que reciba dos números y retorne su multiplicación

// 3. Crea una función "calcularPromedio" que reciba un array de números
//    y retorne el promedio

// 4. Prueba todas las funciones
```

---

## Ejercicio 8: Objetos

```javascript
// 1. Crea un objeto "estudiante" con las propiedades:
//    - nombre: "Juan"
//    - edad: 20
//    - curso: "JavaScript"
//    - activo: true

// 2. Agrega un método "presentarse" que imprima:
//    "Hola, soy [nombre] y tengo [edad] años"

// 3. Accede a las propiedades usando notación de punto y corchetes

// 4. Agrega una nueva propiedad "nota" con valor 8 después de crear el objeto

// 5. Llama al método "presentarse"
```

---

## Ejercicio 9: Arrays de Objetos

```javascript
// Dado este array:
let estudiantes = [
    { nombre: "Ana", nota: 8, edad: 20 },
    { nombre: "Luis", nota: 5, edad: 22 },
    { nombre: "María", nota: 9, edad: 21 }
];

// 1. Usa forEach para imprimir el nombre y nota de cada estudiante

// 2. Usa map para crear un array con mensajes:
//    "Ana tiene 8 de nota"

// 3. Usa filter para obtener solo los estudiantes mayores de 20 años

// 4. Calcula el promedio de todas las notas
```

---

## Ejercicio 10: Ejercicio Completo

```javascript
// Dado este array:
let alumnos = [
    { nombre: "Walter", nota: 10 },
    { nombre: "Javier", nota: 4 },
    { nombre: "Alanis", nota: 8 },
    { nombre: "Lucas", nota: 8 }
];

// 1. Agrega la propiedad "aprobado" a cada alumno usando map
//    (true si nota >= 6, false si no)

// 2. Filtra solo los aprobados y muestra sus nombres

// 3. Calcula el promedio de todas las notas

// 4. Cuenta cuántos aprobaron y cuántos desaprobaron

// 5. Muestra el porcentaje de aprobados y desaprobados
```

---

## Ejercicio 11: Bucle while

```javascript
// 1. Usa un bucle while para imprimir los números del 1 al 5

// 2. Dado este array:
let notas = [8, 7, 9, 5];
//    Usa un bucle while para sumar todas las notas

// 3. Usa un bucle while para encontrar la primera nota mayor a 8
```

---

## Ejercicio 12: switch

```javascript
// 1. Crea una función "diaSemana" que reciba un número (1-7)
//    y retorne el nombre del día usando switch:
//    1 = "Lunes", 2 = "Martes", etc.

// 2. Crea una función "estadoEstudiante" que reciba una nota
//    y retorne el estado usando switch:
//    >= 9: "Excelente"
//    >= 7: "Muy bueno"
//    >= 6: "Bueno"
//    >= 4: "Regular"
//    < 4: "Insuficiente"
```

---

## Ejercicio 13: Operadores

```javascript
// Dado:
let a = 10;
let b = 5;

// 1. Usa operadores aritméticos para calcular:
//    - suma de a y b
//    - resta de a y b
//    - multiplicación de a y b
//    - división de a y b

// 2. Usa operadores de comparación:
//    - ¿a es mayor que b?
//    - ¿a es igual a b?
//    - ¿a es diferente de b?

// 3. Usa operadores lógicos:
//    - ¿a > 5 Y b < 10?
//    - ¿a > 15 O b < 3?
```

---

## Ejercicio 14: Frecuencia Simple

```javascript
// Dado este array de notas:
let notas = [8, 7, 8, 9, 7, 8];

// 1. Crea un objeto "frecuencia" que cuente cuántas veces aparece cada nota
//    Ejemplo: { 8: 3, 7: 2, 9: 1 }

// 2. Muestra qué nota aparece más veces
```

---

## Ejercicio 15: Integración Final

```javascript
// Crea un sistema completo con este array:
let alumnos = [
    { nombre: "Ana", nota: 8 },
    { nombre: "Luis", nota: 5 },
    { nombre: "María", nota: 9 },
    { nombre: "Carlos", nota: 4 },
    { nombre: "Sofía", nota: 7 }
];

// 1. Agrega "aprobado" a cada alumno (nota >= 6)

// 2. Calcula el promedio de notas

// 3. Encuentra la nota más alta y la más baja

// 4. Muestra cuántos aprobaron y cuántos desaprobaron

// 5. Muestra el porcentaje de aprobados

// 6. Ordena los alumnos por nota (de mayor a menor)
```

---

## Tips de Ayuda

- **Variables**: Recuerda usar `let` para variables que cambian y `const` para constantes
- **Bucles**: `for` cuando sabes cuántas veces iterar, `while` cuando depende de una condición
- **Arrays**: `map` transforma, `filter` filtra, `forEach` ejecuta algo por cada elemento
- **Objetos**: Usa notación de punto (`objeto.propiedad`) o corchetes (`objeto["propiedad"]`)
- **Funciones**: Pueden retornar valores con `return` o no retornar nada (void)

---

## Recursos Adicionales

- Revisa `index.js` para ver ejemplos de código
- Usa `console.log()` para depurar y ver valores
- Prueba tus funciones con diferentes valores
- Si algo no funciona, revisa la consola del navegador o Node.js

¡Buena suerte con los ejercicios! 🚀

