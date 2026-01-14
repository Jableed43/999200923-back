# 🎯 Ejercicios Prácticos: TypeScript

## 📝 Introducción

Estos ejercicios te ayudarán a practicar los conceptos básicos de TypeScript que vimos en clase. **No es obligatorio**, pero te recomendamos hacerlos para reforzar lo aprendido.

---

## 🚀 Ejercicio 1: Tipos Básicos

Crea un archivo llamado `ejercicio1.ts` y realiza lo siguiente:

1. Declara variables con tipos explícitos:
   - `nombre`: string con tu nombre
   - `edad`: number con tu edad
   - `esEstudiante`: boolean (true o false)
   - `nota`: number con un valor decimal (ej: 8.5)

2. Crea un array de números llamado `calificaciones` con al menos 3 notas

3. Crea un array de strings llamado `materias` con nombres de materias

4. Usa `console.log()` para mostrar todas las variables

**Ejemplo de salida esperada:**
```
Mi nombre es: Juan
Mi edad es: 25
Soy estudiante: true
Mi nota promedio es: 8.5
Calificaciones: [7, 8, 9]
Materias: ["Matemáticas", "Programación", "Base de Datos"]
```

---

## 🎨 Ejercicio 2: Tipado de Objetos

Crea un archivo llamado `ejercicio2.ts` y realiza lo siguiente:

1. Crea un tipo `Estudiante` usando `type` con:
   - `nombre`: string
   - `edad`: number
   - `activo`: boolean
   - `email?`: string (opcional)

2. Crea al menos 2 objetos usando el tipo `Estudiante`:
   - Uno con todas las propiedades (incluyendo email)
   - Otro sin la propiedad opcional

3. Crea una interface `Materia` con:
   - `nombre`: string
   - `codigo`: string
   - `creditos`: number

4. Crea un objeto de tipo `Materia`

5. Muestra todos los objetos con `console.log()`

---

## 🔧 Ejercicio 3: Funciones Tipadas

Crea un archivo llamado `ejercicio3.ts` y realiza lo siguiente:

1. Crea una función `saludar` que:
   - Reciba un parámetro `nombre` de tipo string
   - Retorne un string con el mensaje: `"Hola, [nombre]"`
   - Llama a la función con tu nombre y muestra el resultado

2. Crea una función `calcularPromedio` que:
   - Reciba un array de números `notas: number[]`
   - Retorne el promedio (suma de todas las notas / cantidad)
   - Prueba con el array `[7, 8, 9, 6, 8]`

3. Crea una función `mostrarEstudiante` que:
   - Reciba un objeto de tipo `Estudiante` (del ejercicio anterior)
   - No retorne nada (`void`)
   - Use `console.log()` para mostrar la información del estudiante
   - Si tiene email, mostrarlo; si no, mostrar "Sin email"

---

## 🏗️ Ejercicio 4: Clases Básicas

Crea un archivo llamado `ejercicio4.ts` y realiza lo siguiente:

1. Crea una clase `Libro` con:
   - **Propiedades:**
     - `titulo`: string
     - `autor`: string
     - `anio`: number
     - `disponible`: boolean
   
   - **Constructor:** que inicialice todas las propiedades
   
   - **Métodos:**
     - `prestar()`: void
       - Cambia `disponible` a `false`
       - Muestra: `"El libro [titulo] ha sido prestado"`
     
     - `devolver()`: void
       - Cambia `disponible` a `true`
       - Muestra: `"El libro [titulo] ha sido devuelto"`
     
     - `obtenerInfo()`: string
       - Retorna: `"[titulo] - [autor] ([anio]) - Disponible: [disponible]"`

2. Crea al menos 2 instancias de la clase `Libro`

3. Prueba todos los métodos:
   - Presta un libro
   - Devuelve un libro
   - Muestra la información de ambos libros

**Ejemplo de salida esperada:**
```
El libro El Quijote ha sido prestado
El libro Cien años de soledad ha sido devuelto
El Quijote - Miguel de Cervantes (1605) - Disponible: false
Cien años de soledad - Gabriel García Márquez (1967) - Disponible: true
```

---

## 📁 Estructura de Archivos

Crea los siguientes archivos en tu carpeta:

```
tu-carpeta/
├── ejercicio1.ts
├── ejercicio2.ts
├── ejercicio3.ts
├── ejercicio4.ts
└── tsconfig.json (ya existe)
```

---

## ✅ Cómo Ejecutar tus Ejercicios

### Opción 1: Con ts-node (Recomendado)
```bash
npx ts-node ejercicio1.ts
npx ts-node ejercicio2.ts
npx ts-node ejercicio3.ts
npx ts-node ejercicio4.ts
```

### Opción 2: Compilar y Ejecutar
```bash
# Compilar
tsc ejercicio1.ts

# Ejecutar
node ejercicio1.js
```

---

## 💡 Tips Útiles

- ✅ Usa `console.log()` para ver los resultados
- ✅ Si tienes errores, TypeScript te mostrará qué está mal
- ✅ Revisa los ejemplos de clase en `index.ts`, `Planeta.ts` y `poo.ts`
- ✅ Las propiedades opcionales se verifican con `if`: `if (estudiante.email) { ... }`
- ✅ Recuerda que `void` significa que la función no retorna nada

---

## 🎓 Conceptos que Estarás Practicando

- ✅ Tipos básicos (`string`, `number`, `boolean`)
- ✅ Arrays tipados
- ✅ Tipado de objetos con `type` e `interface`
- ✅ Propiedades opcionales (`?`)
- ✅ Funciones con tipos de retorno
- ✅ Funciones `void`
- ✅ Clases con propiedades y métodos
- ✅ Constructor
- ✅ Crear instancias de clases

---

## ❓ ¿Necesitas Ayuda?

Si tienes dudas:
1. Revisa los archivos de ejemplo de clase
2. Consulta el resumen de la clase
3. Pregunta en el próximo encuentro

---

## 🎉 ¡Diviértete Programando!

Recuerda: **La práctica hace al maestro**. Estos ejercicios te ayudarán a sentirte más cómodo con TypeScript.

**¡Éxitos! 🚀**

