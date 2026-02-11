# Ejercicios Prácticos - Clase 2: Operadores Lógicos y $match
## Soluciones Completas

**Base de Datos**: `escuela`  
**Colecciones**: `estudiantes` y `materias`

> **Nota**: Este archivo contiene las soluciones de todos los ejercicios. Las consignas están disponibles en `Clase-2-Ejercicios-Consignas.md`.

---

## 📑 Índice de Navegación Rápida

### Preparación
- [📋 Preparación: Set de Datos](#-preparación-set-de-datos)

### Fases de Ejercicios
- [🎯 FASE 1: Operador $and (5 ejercicios)](#-fase-1-operador-and-nivel-intermedio)
- [🎯 FASE 2: Operador $or (6 ejercicios)](#-fase-2-operador-or-nivel-intermedio)
- [🎯 FASE 3: Operadores $nor y $not (4 ejercicios)](#-fase-3-operadores-nor-y-not-nivel-avanzado)
- [🎯 FASE 4: Operador $match en Aggregation (6 ejercicios)](#-fase-4-operador-match-en-aggregation-nivel-intermedio-avanzado)
- [🎯 FASE 5: Operadores $exists, $type y $regex (9 ejercicios)](#-fase-5-operadores-exists-y-type-nivel-avanzado)
- [🎯 FASE 6: Consultas Complejas Combinadas (5 ejercicios)](#-fase-6-consultas-complejas-combinadas-nivel-avanzado)
- [🎯 FASE 7: Operadores de Expresión (47 ejercicios)](#-fase-7-operadores-de-expresión-nivel-intermedio-avanzado)
- [🎯 FASE 8: Ejercicios Combinados CRUD + Operadores (10 ejercicios)](#-fase-8-ejercicios-combinados-crud--operadores-nivel-avanzado)

### Guías y Referencias
- [📊 Resumen de Ejercicios por Fase](#-resumen-de-ejercicios-por-fase)
- [🎓 Guía de Uso para el Docente](#-guía-de-uso-para-el-docente)
- [✅ Checklist de Aprendizaje](#-checklist-de-aprendizaje)

### Archivos Relacionados
- 📖 [Material Teórico](./Clase-2-Operadores-Logicos-y-Match.md)
- 📝 [Ejercicios - Consignas](./Clase-2-Ejercicios-Consignas.md)

---

## 📋 Preparación: Set de Datos

Antes de comenzar, asegúrate de tener la base de datos `escuela` con los siguientes datos:

```javascript
// 1. Seleccionar/crear base de datos
use escuela

// 2. Insertar estudiantes
db.estudiantes.insertMany([
  {
    nombre: "Roberto",
    apellido: "Silva",
    email: "roberto.silva@example.com",
    edad: 22,
    fechaNacimiento: new Date("2002-06-10"),
    ciudad: "Buenos Aires",
    activo: true
  },
  {
    nombre: "Carmen",
    apellido: "Vargas",
    email: "carmen.vargas@example.com",
    edad: 21,
    fechaNacimiento: new Date("2003-04-22"),
    ciudad: "Córdoba",
    activo: true
  },
  {
    nombre: "Fernando",
    apellido: "Morales",
    email: "fernando.morales@example.com",
    edad: 20,
    fechaNacimiento: new Date("2004-08-15"),
    ciudad: "Buenos Aires",
    activo: true
  },
  {
    nombre: "Lucía",
    apellido: "Jiménez",
    email: "lucia.jimenez@example.com",
    edad: 19,
    fechaNacimiento: new Date("2005-02-28"),
    ciudad: "Rosario",
    activo: false
  },
  {
    nombre: "Miguel",
    apellido: "Castro",
    email: "miguel.castro@example.com",
    edad: 24,
    fechaNacimiento: new Date("2000-12-05"),
    ciudad: "Mendoza",
    activo: true
  },
  {
    nombre: "Elena",
    apellido: "Ruiz",
    email: "elena.ruiz@example.com",
    edad: 20,
    fechaNacimiento: new Date("2004-09-18"),
    ciudad: "Buenos Aires",
    activo: true
  },
  {
    nombre: "Andrés",
    apellido: "Mendoza",
    email: "andres.mendoza@example.com",
    edad: 18,
    fechaNacimiento: new Date("2006-03-12"),
    ciudad: "Córdoba",
    activo: false
  },
  {
    nombre: "Valentina",
    apellido: "Herrera",
    email: "valentina.herrera@example.com",
    edad: 21,
    fechaNacimiento: new Date("2003-11-08"),
    ciudad: "Rosario",
    activo: true
  },
  {
    nombre: "Sebastián",
    apellido: "Ortega",
    email: "sebastian.ortega@gmail.com",
    edad: 25,
    ciudad: "Buenos Aires",
    activo: true,
    telefono: "011-4567-8901"
  },
  {
    nombre: "Isabella",
    apellido: "Díaz",
    email: "isabella.diaz@example.com",
    edad: 23,
    ciudad: "Córdoba",
    activo: true,
    telefono: "0351-2345-6789"
  }
]);

// 3. Insertar materias
db.materias.insertMany([
  {
    nombre: "Física",
    codigo: "FIS201",
    creditos: 6,
    docente: "Dr. Ramírez"
  },
  {
    nombre: "Desarrollo Web",
    codigo: "WEB301",
    creditos: 8,
    docente: "Ing. Torres"
  },
  {
    nombre: "Sistemas Operativos",
    codigo: "SO401",
    creditos: 7,
    docente: "Lic. Moreno"
  },
  {
    nombre: "Estructuras de Datos",
    codigo: "ED302",
    creditos: 6,
    docente: "Dr. Suárez"
  },
  {
    nombre: "Seguridad Informática",
    codigo: "SI501",
    creditos: 5,
    docente: "Ing. Vega"
  }
]);
```

---

## 🎯 FASE 1: Operador $and (Nivel Intermedio)

### Ejercicio A1: $and Explícito
**Solución**: Buscar todos los estudiantes que están activos **Y** tienen más de 22 años, usando el operador `$and` explícitamente.

```javascript
db.estudiantes.find({
  $and: [
    { activo: true },
    { edad: { $gt: 22 } }
  ]
});
```

**Explicación**: Usamos `$and` explícitamente con un array de dos condiciones. Ambas condiciones deben cumplirse para que un documento coincida.

---

### Ejercicio A2: $and Implícito
**Solución**: Buscar todos los estudiantes que están activos **Y** tienen más de 22 años, usando `$and` implícito.

```javascript
db.estudiantes.find({
  activo: true,
  edad: { $gt: 22 }
});
```

**Explicación**: MongoDB aplica `$and` automáticamente cuando tienes múltiples condiciones en el mismo objeto. Esta consulta es equivalente a la anterior pero más legible.

---

### Ejercicio A3: Múltiples Condiciones con $and
**Solución**: Buscar estudiantes que son de "Buenos Aires" **Y** están activos **Y** tienen entre 20 y 25 años (inclusive ambos).

```javascript
db.estudiantes.find({
  $and: [
    { ciudad: "Buenos Aires" },
    { activo: true },
    { edad: { $gte: 20, $lte: 25 } }
  ]
});
```

**Alternativa con $and implícito:**
```javascript
db.estudiantes.find({
  ciudad: "Buenos Aires",
  activo: true,
  edad: { $gte: 20, $lte: 25 }
});
```

**Explicación**: Usamos `$and` con tres condiciones. Para el rango de edad, combinamos `$gte` (mayor o igual) y `$lte` (menor o igual) en el mismo campo.

---

### Ejercicio A4: $and con Mismo Campo
**Solución**: Buscar estudiantes cuya edad es mayor a 20 **Y** menor a 25, usando `$and` explícito.

```javascript
db.estudiantes.find({
  $and: [
    { edad: { $gt: 20 } },
    { edad: { $lt: 25 } }
  ]
});
```

**Alternativa más común:**
```javascript
db.estudiantes.find({
  edad: { $gt: 20, $lt: 25 }
});
```

**Explicación**: Aunque la forma más común es combinar operadores en el mismo campo, usar `$and` explícito con condiciones separadas también funciona y puede ser más claro en algunos casos.

---

### Ejercicio A5: $and Anidado con $or
**Solución**: Buscar estudiantes que están activos **Y** (son de "Buenos Aires" **O** tienen más de 25 años).

```javascript
db.estudiantes.find({
  $and: [
    { activo: true },
    {
      $or: [
        { ciudad: "Buenos Aires" },
        { edad: { $gt: 25 } }
      ]
    }
  ]
});
```

**Alternativa con $and implícito:**
```javascript
db.estudiantes.find({
  activo: true,
  $or: [
    { ciudad: "Buenos Aires" },
    { edad: { $gt: 25 } }
  ]
});
```

**Explicación**: Anidamos `$or` dentro de `$and`. La condición `$or` debe cumplirse junto con `activo: true`.

---

## 🎯 FASE 2: Operador $or (Nivel Intermedio)

### Ejercicio O1: $or Básico
**Solución**: Buscar todos los estudiantes que viven en "Buenos Aires" **O** en "Córdoba".

```javascript
db.estudiantes.find({
  $or: [
    { ciudad: "Buenos Aires" },
    { ciudad: "Córdoba" }
  ]
});
```

**Explicación**: `$or` requiere sintaxis explícita con un array de condiciones. Al menos una condición debe cumplirse.

---

### Ejercicio O2: $or con Múltiples Opciones
**Solución**: Buscar estudiantes que viven en "Buenos Aires", "Córdoba" **O** "Rosario".

```javascript
db.estudiantes.find({
  $or: [
    { ciudad: "Buenos Aires" },
    { ciudad: "Córdoba" },
    { ciudad: "Rosario" }
  ]
});
```

**Explicación**: Agregamos una tercera condición al array de `$or`. Cualquiera de las tres ciudades es válida.

---

### Ejercicio O3: $or con Diferentes Campos
**Solución**: Buscar estudiantes que están activos **O** tienen más de 25 años.

```javascript
db.estudiantes.find({
  $or: [
    { activo: true },
    { edad: { $gt: 25 } }
  ]
});
```

**Explicación**: Las condiciones en `$or` pueden ser sobre campos diferentes. Un estudiante cumple si está activo O tiene más de 25 años (o ambos).

---

### Ejercicio O4: $or vs $in
**Solución**: Buscar estudiantes de "Buenos Aires", "Córdoba" o "Rosario" usando `$in` en lugar de `$or`.

```javascript
db.estudiantes.find({
  ciudad: { $in: ["Buenos Aires", "Córdoba", "Rosario"] }
});
```

**Explicación**: `$in` es más eficiente y legible cuando todas las condiciones son de igualdad sobre el mismo campo. Es equivalente al `$or` del ejercicio O2 pero más optimizado.

---

### Ejercicio O4B: $nin - Excluir Múltiples Valores
**Solución**: Buscar estudiantes que **NO** son de "Buenos Aires", "Córdoba" ni "Rosario" usando `$nin`.

```javascript
db.estudiantes.find({
  ciudad: { $nin: ["Buenos Aires", "Córdoba", "Rosario"] }
});
```

**Explicación**: `$nin` excluye documentos donde el campo tiene alguno de los valores especificados. Es equivalente a usar `$nor` con múltiples condiciones de igualdad, pero más eficiente y legible.

---

### Ejercicio O4C: $nin vs $nor
**Solución**: Buscar estudiantes que **NO** son de "Buenos Aires" ni "Córdoba" usando `$nor` y luego comparar con `$nin`.

**Solución con $nor:**
```javascript
db.estudiantes.find({
  $nor: [
    { ciudad: "Buenos Aires" },
    { ciudad: "Córdoba" }
  ]
});
```

**Solución con $nin (más eficiente):**
```javascript
db.estudiantes.find({
  ciudad: { $nin: ["Buenos Aires", "Córdoba"] }
});
```

**Explicación**: Ambas consultas devuelven los mismos resultados. `$nin` es más eficiente y legible cuando todas las condiciones de exclusión son de igualdad sobre el mismo campo. `$nor` es más flexible y puede manejar condiciones más complejas.

---

### Ejercicio O5: $or Combinado con Otras Condiciones
**Solución**: Buscar estudiantes que están activos **Y** (son de "Buenos Aires" **O** tienen más de 25 años).

```javascript
db.estudiantes.find({
  activo: true,
  $or: [
    { ciudad: "Buenos Aires" },
    { edad: { $gt: 25 } }
  ]
});
```

**Explicación**: Combinamos una condición simple (`activo: true`) con un `$or`. El estudiante debe estar activo Y cumplir al menos una de las condiciones del `$or`.

---

### Ejercicio O6: $or Complejo
**Solución**: Buscar estudiantes que (tienen entre 20 y 22 años) **O** (son de "Mendoza" **Y** están activos).

```javascript
db.estudiantes.find({
  $or: [
    { edad: { $gte: 20, $lte: 22 } },
    {
      ciudad: "Mendoza",
      activo: true
    }
  ]
});
```

**Explicación**: Usamos `$or` con dos condiciones. La primera es un rango de edad. La segunda combina dos condiciones (usando `$and` implícito) que ambas deben cumplirse.

---

## 🎯 FASE 3: Operadores $nor y $not (Nivel Avanzado)

### Ejercicio N1: $nor Básico
**Solución**: Buscar estudiantes que **NO** son de "Buenos Aires" **Y NO** son de "Córdoba".

```javascript
db.estudiantes.find({
  $nor: [
    { ciudad: "Buenos Aires" },
    { ciudad: "Córdoba" }
  ]
});
```

**Explicación**: `$nor` devuelve documentos que NO cumplen ninguna de las condiciones. Equivale a "ni Buenos Aires ni Córdoba".

---

### Ejercicio N2: $nor con Múltiples Condiciones
**Solución**: Buscar estudiantes que **NO** están activos **Y NO** tienen más de 25 años.

```javascript
db.estudiantes.find({
  $nor: [
    { activo: true },
    { edad: { $gt: 25 } }
  ]
});
```

**Explicación**: `$nor` con condiciones sobre diferentes campos. El estudiante no debe estar activo Y no debe tener más de 25 años (es decir, debe estar inactivo Y tener 25 años o menos).

---

### Ejercicio N3: $not con Operador
**Solución**: Buscar estudiantes cuya edad **NO** es mayor a 22 años, usando `$not`.

```javascript
db.estudiantes.find({
  edad: { $not: { $gt: 22 } }
});
```

**Alternativa más común:**
```javascript
db.estudiantes.find({
  edad: { $lte: 22 }
});
```

**Explicación**: `$not` invierte la condición. Aunque funciona, es más común usar el operador inverso directamente (`$lte` en lugar de `$not: { $gt }`).

---

### Ejercicio N4: $not con Regex
**Solución**: Buscar estudiantes cuyo nombre **NO** empieza con "A", usando `$not` con `$regex`.

```javascript
db.estudiantes.find({
  nombre: { $not: { $regex: /^A/i } }
});
```

**Explicación**: `$not` es útil para negar expresiones regulares. Esta consulta encuentra estudiantes cuyo nombre no empieza con "A" (sin distinguir mayúsculas/minúsculas).

---

## 🎯 FASE 4: Operador $match en Aggregation (Nivel Intermedio-Avanzado)

### Ejercicio M1: $match Básico
**Solución**: Usar `$match` en un aggregation pipeline para filtrar estudiantes activos.

```javascript
db.estudiantes.aggregate([
  { $match: { activo: true } }
]);
```

**Explicación**: `$match` funciona igual que `find()` pero dentro de un aggregation pipeline. Esta consulta es equivalente a `db.estudiantes.find({ activo: true })`.

---

### Ejercicio M2: $match con Múltiples Condiciones
**Solución**: Usar `$match` para filtrar estudiantes activos mayores de 20 años.

```javascript
db.estudiantes.aggregate([
  {
    $match: {
      activo: true,
      edad: { $gt: 20 }
    }
  }
]);
```

**Explicación**: `$match` acepta múltiples condiciones igual que `find()`. Ambas condiciones deben cumplirse.

---

### Ejercicio M3: $match con $or
**Solución**: Usar `$match` con `$or` para filtrar estudiantes de "Buenos Aires" o "Córdoba".

```javascript
db.estudiantes.aggregate([
  {
    $match: {
      $or: [
        { ciudad: "Buenos Aires" },
        { ciudad: "Córdoba" }
      ]
    }
  }
]);
```

**Explicación**: `$match` acepta todos los operadores lógicos. Esta consulta filtra estudiantes de cualquiera de las dos ciudades.

---

### Ejercicio M4: $match seguido de $count
**Solución**: Contar cuántos estudiantes activos hay usando `$match` seguido de `$count`.

```javascript
db.estudiantes.aggregate([
  { $match: { activo: true } },
  { $count: "total_estudiantes" }
]);
```

**Explicación**: Primero filtramos con `$match`, luego contamos con `$count`. El resultado será un documento con el campo `total_estudiantes`.

---

### Ejercicio M5: $match seguido de $sort
**Solución**: Filtrar estudiantes activos mayores de 20 años y ordenarlos por edad ascendente usando `$match` y `$sort`.

```javascript
db.estudiantes.aggregate([
  {
    $match: {
      activo: true,
      edad: { $gt: 20 }
    }
  },
  {
    $sort: { edad: 1 }
  }
]);
```

**Explicación**: Primero filtramos con `$match`, luego ordenamos con `$sort`. El `1` significa orden ascendente.

---

### Ejercicio M6: $match seguido de $limit
**Solución**: Filtrar estudiantes activos, ordenarlos por edad descendente, y mostrar solo los 3 primeros usando `$match`, `$sort` y `$limit`.

```javascript
db.estudiantes.aggregate([
  { $match: { activo: true } },
  { $sort: { edad: -1 } },
  { $limit: 3 }
]);
```

**Explicación**: Orden correcto: primero `$match` (filtra), luego `$sort` (ordena), finalmente `$limit` (limita). El `-1` significa orden descendente.

---

## 🎯 FASE 5: Operadores $exists y $type (Nivel Avanzado)

### Ejercicio E1: $exists - Campo Existe
**Solución**: Buscar todos los estudiantes que tienen el campo "telefono".

```javascript
db.estudiantes.find({
  telefono: { $exists: true }
});
```

**Explicación**: `$exists: true` verifica que el campo exista en el documento, independientemente de su valor.

---

### Ejercicio E2: $exists - Campo No Existe
**Solución**: Buscar todos los estudiantes que **NO** tienen el campo "telefono".

```javascript
db.estudiantes.find({
  telefono: { $exists: false }
});
```

**Explicación**: `$exists: false` encuentra documentos donde el campo no existe o es `null`.

---

### Ejercicio E3: $exists Combinado con Otras Condiciones
**Solución**: Buscar estudiantes activos que tienen el campo "telefono".

```javascript
db.estudiantes.find({
  activo: true,
  telefono: { $exists: true }
});
```

**Explicación**: Combinamos `$exists` con otras condiciones usando `$and` implícito. El estudiante debe estar activo Y tener el campo telefono.

---

### Ejercicio T1: $type - Verificar Tipo String
**Solución**: Buscar estudiantes donde el campo "telefono" es de tipo string.

```javascript
db.estudiantes.find({
  telefono: { $type: "string" }
});
```

**Explicación**: `$type: "string"` verifica que el campo sea de tipo string. Útil para validar tipos de datos en esquemas flexibles.

---

### Ejercicio T2: $type - Verificar Tipo Number
**Solución**: Buscar estudiantes donde el campo "edad" es de tipo number.

```javascript
db.estudiantes.find({
  edad: { $type: "number" }
});
```

**Explicación**: `$type: "number"` verifica que el campo sea numérico. Útil para asegurar que los datos tienen el tipo correcto.

---

### Ejercicio R1: $regex - Validar Formato de Email
**Solución**: Buscar estudiantes cuyo email tiene un formato válido usando `$regex`.

```javascript
db.estudiantes.find({
  email: { $regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i }
});
```

**Explicación**: Este patrón regex valida el formato básico de email:
- `^` - Inicio de string
- `[^\s@]+` - Uno o más caracteres que no sean espacio ni @
- `@` - El símbolo @ literal
- `[^\s@]+` - Uno o más caracteres que no sean espacio ni @
- `\.` - Un punto literal (escapado)
- `[^\s@]+` - Uno o más caracteres que no sean espacio ni @
- `$` - Fin de string
- `i` - Case insensitive (no distingue mayúsculas/minúsculas)

Este es un patrón común para validar el formato básico de emails en MongoDB.

---

### Ejercicio R2: $regex - Buscar Nombres que Empiezan con Letra Específica
**Solución**: Buscar estudiantes cuyo nombre empieza con "M" o "L" usando `$regex`.

```javascript
db.estudiantes.find({
  nombre: { $regex: /^[ML]/i }
});
```

**Explicación**: Este patrón regex busca nombres que empiezan con M o L:
- `^` - Inicio de string
- `[ML]` - Cualquier carácter que sea M o L
- `i` - Case insensitive (no distingue mayúsculas/minúsculas)

Este es un patrón útil para buscar por patrones de inicio de string, común en búsquedas de nombres o códigos.

---

### Ejercicio R3: $regex - Buscar Apellidos que Terminan con Texto
**Solución**: Buscar estudiantes cuyo apellido termina con "ez" usando `$regex`.

```javascript
db.estudiantes.find({
  apellido: { $regex: /ez$/i }
});
```

**Explicación**: 
- `ez` - El texto literal "ez"
- `$` - Indica el fin del string (el apellido debe terminar con "ez")
- `i` - Case insensitive (no distingue mayúsculas/minúsculas)

Este patrón es útil para buscar apellidos que terminan con un sufijo específico, como "Pérez", "González", "López", etc. El símbolo `$` ancla la búsqueda al final del string, asegurando que "ez" esté al final y no en medio del apellido.

---

### Ejercicio R4: $regex - Buscar Texto que Contiene Patrón
**Solución**: Buscar estudiantes cuyo email contiene "gmail" en cualquier posición usando `$regex`.

```javascript
db.estudiantes.find({
  email: { $regex: /gmail/i }
});
```

**Explicación**: 
- `gmail` - El texto literal "gmail"
- Sin `^` ni `$` - Busca el patrón en cualquier posición del string (inicio, medio o final)
- `i` - Case insensitive

Este es el patrón más común para búsquedas de texto, ya que busca la palabra en cualquier parte del campo, no solo al inicio o al final. Es equivalente a una búsqueda de "contiene" en interfaces de usuario.

**Diferencia clave:**
- Con `^gmail`: Solo emails que empiezan con "gmail"
- Con `gmail$`: Solo emails que terminan con "gmail"
- Con `gmail` (sin anclajes): Emails que contienen "gmail" en cualquier posición

---

## 🎯 FASE 6: Consultas Complejas Combinadas (Nivel Avanzado)

### Ejercicio C1: Consulta Compleja 1
**Solución**: Buscar estudiantes que:
- Están activos **Y**
- (Son de "Buenos Aires" **O** "Córdoba") **Y**
- Tienen entre 20 y 25 años (inclusive)

```javascript
db.estudiantes.find({
  activo: true,
  $or: [
    { ciudad: "Buenos Aires" },
    { ciudad: "Córdoba" }
  ],
  edad: { $gte: 20, $lte: 25 }
});
```

**Explicación**: Combinamos `$and` implícito con `$or` y un rango. Todas las condiciones deben cumplirse.

---

### Ejercicio C2: Consulta Compleja 2
**Solución**: Buscar estudiantes que:
- (Están activos **O** tienen más de 25 años) **Y**
- **NO** son de "Rosario"

```javascript
db.estudiantes.find({
  $or: [
    { activo: true },
    { edad: { $gt: 25 } }
  ],
  ciudad: { $ne: "Rosario" }
});
```

**Explicación**: Usamos `$or` para la primera condición y `$ne` (not equal) para excluir Rosario. El estudiante debe cumplir el `$or` Y no ser de Rosario.

---

### Ejercicio C3: Consulta Compleja 3
**Solución**: Usar `$match` en aggregation para filtrar estudiantes que:
- Están activos **Y**
- Tienen el campo "telefono" **Y**
- (Son de "Buenos Aires" **O** tienen más de 23 años)

Luego ordenar por edad descendente y mostrar solo los primeros 5.

```javascript
db.estudiantes.aggregate([
  {
    $match: {
      activo: true,
      telefono: { $exists: true },
      $or: [
        { ciudad: "Buenos Aires" },
        { edad: { $gt: 23 } }
      ]
    }
  },
  {
    $sort: { edad: -1 }
  },
  {
    $limit: 5
  }
]);
```

**Explicación**: Combinamos `$match` con `$exists`, `$or`, luego `$sort` y `$limit`. El orden es importante: primero filtrar, luego ordenar, finalmente limitar.

---

### Ejercicio C4: Consulta Compleja 4
**Solución**: Usar `$match` con `$nor` para encontrar estudiantes que:
- **NO** están inactivos **Y**
- **NO** tienen menos de 18 años

Luego contar cuántos hay.

```javascript
db.estudiantes.aggregate([
  {
    $match: {
      $nor: [
        { activo: false },
        { edad: { $lt: 18 } }
      ]
    }
  },
  {
    $count: "total"
  }
]);
```

**Explicación**: `$nor` encuentra documentos que NO cumplen ninguna de las condiciones. Esto equivale a estudiantes activos mayores o iguales a 18 años. Luego contamos con `$count`.

**Alternativa más clara:**
```javascript
db.estudiantes.aggregate([
  {
    $match: {
      activo: true,
      edad: { $gte: 18 }
    }
  },
  {
    $count: "total"
  }
]);
```

---

### Ejercicio C5: Comparación find() vs aggregate()
**Solución**: 
1. Consulta con `find()` para estudiantes activos mayores de 20 años, ordenados por edad.
2. Misma consulta usando `aggregate()` con `$match` y `$sort`.
3. Comparar los resultados (deberían ser iguales).

**Solución 1: Con find()**
```javascript
db.estudiantes.find({
  activo: true,
  edad: { $gt: 20 }
}).sort({ edad: 1 });
```

**Solución 2: Con aggregate()**
```javascript
db.estudiantes.aggregate([
  {
    $match: {
      activo: true,
      edad: { $gt: 20 }
    }
  },
  {
    $sort: { edad: 1 }
  }
]);
```

**Explicación**: Ambas consultas devuelven los mismos resultados. `find()` es más simple para consultas básicas, pero `aggregate()` es más poderoso cuando necesitas procesar datos después de filtrar.

---

## 🎯 FASE 7: Operadores de Expresión (Nivel Intermedio-Avanzado)

### Ejercicio EX1: $sum - Contar Documentos
**Solución**: Usar `$group` con `$sum` para contar cuántos estudiantes hay en cada ciudad.

```javascript
db.estudiantes.aggregate([
  {
    $group: {
      _id: "$ciudad",
      totalEstudiantes: { $sum: 1 }
    }
  }
]);
```

**Explicación**: `$group` agrupa documentos por ciudad. `$sum: 1` suma 1 por cada documento en cada grupo, contando así el total.

---

### Ejercicio EX2: $avg - Promedio de Edad
**Solución**: Calcular el promedio de edad de todos los estudiantes usando `$group` con `$avg`.

```javascript
db.estudiantes.aggregate([
  {
    $group: {
      _id: null,
      promedioEdad: { $avg: "$edad" }
    }
  }
]);
```

**Explicación**: `_id: null` agrupa todos los documentos en un solo grupo. `$avg: "$edad"` calcula el promedio de todas las edades.

---

### Ejercicio EX3: $min y $max - Edad Mínima y Máxima
**Solución**: Encontrar la edad mínima y máxima de los estudiantes por ciudad usando `$group` con `$min` y `$max`.

```javascript
db.estudiantes.aggregate([
  {
    $group: {
      _id: "$ciudad",
      edadMinima: { $min: "$edad" },
      edadMaxima: { $max: "$edad" }
    }
  }
]);
```

**Explicación**: Agrupamos por ciudad y calculamos tanto el mínimo como el máximo de edad en cada grupo.

---

### Ejercicio EX4: $count - Contar con Etapa
**Solución**: Contar cuántos estudiantes activos hay usando `$match` seguido de `$count`.

```javascript
db.estudiantes.aggregate([
  { $match: { activo: true } },
  { $count: "total" }
]);
```

**Explicación**: Primero filtramos con `$match`, luego `$count` cuenta los documentos resultantes. El resultado será `{ total: número }`.

---

### Ejercicio EX5: $add - Sumar Valores
**Solución**: Usar `$project` con `$add` para crear un campo que muestre la edad del estudiante más 5 años.

```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      edad: 1,
      edadEn5Anos: { $add: ["$edad", 5] }
    }
  }
]);
```

**Explicación**: `$add` suma la edad actual más 5. Usamos `$project` para seleccionar campos existentes y crear el nuevo campo calculado.

---

### Ejercicio EX6: $multiply - Multiplicar Créditos
**Solución**: Usar `$project` con `$multiply` para crear un campo que muestre los créditos de cada materia multiplicados por 2.

```javascript
db.materias.aggregate([
  {
    $project: {
      nombre: 1,
      codigo: 1,
      creditos: 1,
      creditosDobles: { $multiply: ["$creditos", 2] }
    }
  }
]);
```

**Explicación**: `$multiply` multiplica los créditos por 2, creando un nuevo campo calculado.

---

### Ejercicio EX7: $concat - Nombre Completo
**Solución**: Usar `$project` con `$concat` para crear un campo "nombreCompleto" que una nombre y apellido con un espacio entre ellos.

```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombreCompleto: {
        $concat: ["$nombre", " ", "$apellido"]
      },
      email: 1
    }
  }
]);
```

**Explicación**: `$concat` une los strings en el orden especificado. Incluimos un espacio `" "` entre nombre y apellido.

---

### Ejercicio EX8: $toUpper - Nombre en Mayúsculas
**Solución**: Usar `$project` con `$toUpper` para crear un campo que muestre el nombre del estudiante en mayúsculas.

```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      nombreMayusculas: { $toUpper: "$nombre" }
    }
  }
]);
```

**Explicación**: `$toUpper` convierte todo el string a mayúsculas, útil para normalizar datos.

---

### Ejercicio EX9: $cond - Categoría por Edad
**Solución**: Usar `$project` con `$cond` para crear un campo "categoria" que sea "Mayor" si la edad es >= 21, o "Menor" si es < 21.

```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      edad: 1,
      categoria: {
        $cond: {
          if: { $gte: ["$edad", 21] },
          then: "Mayor",
          else: "Menor"
        }
      }
    }
  }
]);
```

**Explicación**: `$cond` evalúa la condición `$gte` (mayor o igual). Si es verdadera, devuelve "Mayor", si no, "Menor".

---

### Ejercicio EX10: $ifNull - Valor por Defecto
**Solución**: Usar `$project` con `$ifNull` para mostrar el teléfono del estudiante, o "Sin teléfono" si no tiene.

```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      telefono: {
        $ifNull: ["$telefono", "Sin teléfono"]
      }
    }
  }
]);
```

**Explicación**: `$ifNull` devuelve el primer valor si no es null, de lo contrario devuelve el segundo valor (valor por defecto).

---

### Ejercicio EX11: $group Completo - Estadísticas por Ciudad
**Solución**: Usar `$group` para calcular por ciudad: total de estudiantes, promedio de edad, edad mínima y edad máxima. Luego ordenar por total descendente.

```javascript
db.estudiantes.aggregate([
  {
    $group: {
      _id: "$ciudad",
      totalEstudiantes: { $sum: 1 },
      promedioEdad: { $avg: "$edad" },
      edadMinima: { $min: "$edad" },
      edadMaxima: { $max: "$edad" }
    }
  },
  {
    $sort: { totalEstudiantes: -1 }
  }
]);
```

**Explicación**: `$group` calcula múltiples estadísticas por ciudad. Luego `$sort` ordena los resultados por total de estudiantes descendente.

---

### Ejercicio EX12: $project Completo - Transformar Datos
**Solución**: Usar `$project` para crear un documento con:
- nombreCompleto (concat de nombre y apellido)
- edad
- edadEn10Anos (edad + 10)
- categoria (Mayor si >= 21, Menor si < 21)
- telefono (con valor por defecto si no existe)

```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombreCompleto: {
        $concat: ["$nombre", " ", "$apellido"]
      },
      edad: 1,
      edadEn10Anos: {
        $add: ["$edad", 10]
      },
      categoria: {
        $cond: {
          if: { $gte: ["$edad", 21] },
          then: "Mayor",
          else: "Menor"
        }
      },
      telefono: {
        $ifNull: ["$telefono", "Sin teléfono"]
      }
    }
  }
]);
```

**Explicación**: Combinamos múltiples operadores de expresión en un solo `$project` para transformar completamente los datos.

---

### Ejercicio EX13: $match + $group - Estadísticas de Activos
**Solución**: Filtrar estudiantes activos con `$match`, luego agrupar por ciudad y calcular total y promedio de edad.

```javascript
db.estudiantes.aggregate([
  {
    $match: { activo: true }
  },
  {
    $group: {
      _id: "$ciudad",
      total: { $sum: 1 },
      promedioEdad: { $avg: "$edad" }
    }
  }
]);
```

**Explicación**: Primero filtramos con `$match` (optimización importante), luego agrupamos y calculamos estadísticas solo sobre los estudiantes activos.

---

### Ejercicio EX14: $group + $project - Transformar Resultados
**Solución**: Agrupar materias para calcular total de créditos y promedio, luego usar `$project` para renombrar `_id` a "resumen" y mostrar el promedio.

```javascript
db.materias.aggregate([
  {
    $group: {
      _id: null,
      totalCreditos: { $sum: "$creditos" },
      promedioCreditos: { $avg: "$creditos" }
    }
  },
  {
    $project: {
      resumen: "Estadísticas Generales",
      totalCreditos: 1,
      promedioCreditos: 1
    }
  }
]);
```

**Explicación**: Primero agrupamos todas las materias (con `_id: null`), luego usamos `$project` para transformar y renombrar campos. El promedio se calcula en `$group` y se mantiene en `$project`.

---

### Ejercicio EX15: Pipeline Completo - Top Ciudades
**Solución**: Crear un pipeline que:
1. Filtre estudiantes activos
2. Agrupe por ciudad contando total
3. Ordene por total descendente
4. Limite a las 3 ciudades con más estudiantes

```javascript
db.estudiantes.aggregate([
  {
    $match: { activo: true }
  },
  {
    $group: {
      _id: "$ciudad",
      total: { $sum: 1 }
    }
  },
  {
    $sort: { total: -1 }
  },
  {
    $limit: 3
  }
]);
```

**Explicación**: Pipeline completo que demuestra el flujo típico: filtrar → agrupar → ordenar → limitar. Este es un patrón muy común en aggregation.

---

### Ejercicio EX16: $sum - Sumar Créditos por Docente
**Solución**: Agrupar materias por docente y sumar todos los créditos que imparte cada docente usando `$sum` con un campo.

```javascript
db.materias.aggregate([
  {
    $group: {
      _id: "$docente",
      totalCreditos: { $sum: "$creditos" }
    }
  }
]);
```

**Explicación**: Agrupamos por docente y sumamos todos los créditos de las materias que imparte cada docente. Esto nos muestra la carga total de créditos por docente.

---

### Ejercicio EX17: $sum - Sumar Múltiples Valores en $project
**Solución**: Usar `$project` con `$sum` para crear un campo que sume la edad del estudiante más 10 más 5 (edad + 10 + 5).

```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      edad: 1,
      total: { $sum: ["$edad", 10, 5] }
    }
  }
]);
```

**Explicación**: `$sum` puede sumar múltiples valores en un array. Esto calcula edad + 10 + 5 = edad + 15.

---

### Ejercicio EX18: $avg - Promedio de Créditos por Docente
**Solución**: Agrupar materias por docente y calcular el promedio de créditos que imparte cada docente.

```javascript
db.materias.aggregate([
  {
    $group: {
      _id: "$docente",
      promedioCreditos: { $avg: "$creditos" }
    }
  }
]);
```

**Explicación**: Agrupamos por docente y calculamos el promedio de créditos de todas sus materias. Esto nos muestra la carga promedio de créditos por docente.

---

### Ejercicio EX19: $avg - Promedio de Edad por Estado
**Solución**: Agrupar estudiantes por estado (activo/inactivo) y calcular el promedio de edad de cada grupo.

```javascript
db.estudiantes.aggregate([
  {
    $group: {
      _id: "$activo",
      promedioEdad: { $avg: "$edad" }
    }
  }
]);
```

**Explicación**: Agrupamos por el campo booleano `activo` (true/false) y calculamos el promedio de edad para estudiantes activos e inactivos por separado.

---

### Ejercicio EX20: $min - Créditos Mínimos por Docente
**Solución**: Agrupar materias por docente y encontrar la materia con menos créditos que imparte cada docente.

```javascript
db.materias.aggregate([
  {
    $group: {
      _id: "$docente",
      minimoCreditos: { $min: "$creditos" }
    }
  }
]);
```

**Explicación**: Agrupamos por docente y encontramos el valor mínimo de créditos entre todas sus materias. Esto muestra la materia con menos carga de créditos por docente.

---

### Ejercicio EX21: $max - Edad Máxima por Ciudad y Estado
**Solución**: Agrupar estudiantes por ciudad y estado activo, y encontrar la edad máxima en cada combinación.

```javascript
db.estudiantes.aggregate([
  {
    $group: {
      _id: {
        ciudad: "$ciudad",
        activo: "$activo"
      },
      edadMaxima: { $max: "$edad" }
    }
  }
]);
```

**Explicación**: Agrupamos por un objeto compuesto que incluye ciudad y estado activo. Esto nos permite ver la edad máxima para cada combinación de ciudad y estado.

---

### Ejercicio EX22: $count - Contar Materias con Más de 6 Créditos
**Solución**: Filtrar materias con más de 6 créditos y contar cuántas hay usando `$match` y `$count`.

```javascript
db.materias.aggregate([
  {
    $match: { creditos: { $gt: 6 } }
  },
  {
    $count: "total"
  }
]);
```

**Explicación**: Primero filtramos materias con más de 6 créditos, luego contamos cuántas cumplen esa condición.

---

### Ejercicio EX23: $count - Contar Estudiantes por Rango de Edad
**Solución**: Filtrar estudiantes entre 20 y 25 años (inclusive) y contar cuántos hay.

```javascript
db.estudiantes.aggregate([
  {
    $match: {
      edad: { $gte: 20, $lte: 25 }
    }
  },
  {
    $count: "total"
  }
]);
```

**Explicación**: Filtramos estudiantes en el rango de edad especificado y contamos el total.

---

### Ejercicio EX24: $subtract - Calcular Diferencia de Edad
**Solución**: Usar `$project` con `$subtract` para crear un campo que calcule cuántos años faltan para llegar a 30 años (30 - edad).

```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      edad: 1,
      añosPara30: { $subtract: [30, "$edad"] }
    }
  }
]);
```

**Explicación**: `$subtract` resta el segundo valor del primero. Calculamos 30 - edad para saber cuántos años faltan para llegar a 30.

---

### Ejercicio EX25: $subtract - Diferencia entre Créditos y Mínimo
**Solución**: Usar `$project` para calcular cuántos créditos más tiene cada materia respecto a 5 créditos (creditos - 5).

```javascript
db.materias.aggregate([
  {
    $project: {
      nombre: 1,
      creditos: 1,
      creditosExtra: { $subtract: ["$creditos", 5] }
    }
  }
]);
```

**Explicación**: Calculamos la diferencia entre los créditos de la materia y 5, mostrando cuántos créditos adicionales tiene.

---

### Ejercicio EX26: $divide - Calcular Créditos por Semestre
**Solución**: Usar `$project` con `$divide` para calcular cuántos créditos por semestre tiene cada materia (asumiendo que un semestre tiene 2 créditos base, dividir créditos entre 2).

```javascript
db.materias.aggregate([
  {
    $project: {
      nombre: 1,
      creditos: 1,
      creditosPorSemestre: { $divide: ["$creditos", 2] }
    }
  }
]);
```

**Explicación**: Dividimos los créditos entre 2 para calcular cuántos "semestres" representa cada materia.

---

### Ejercicio EX27: $divide - Calcular Porcentaje de Edad
**Solución**: Usar `$project` para calcular qué porcentaje representa la edad del estudiante respecto a 100 años (edad / 100).

```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      edad: 1,
      porcentajeEdad: { $divide: ["$edad", 100] }
    }
  }
]);
```

**Explicación**: Dividimos la edad entre 100 para obtener un valor decimal que representa el porcentaje (ej: 20 años = 0.20 = 20%).

---

### Ejercicio EX28: $toLower - Email Normalizado
**Solución**: Usar `$project` con `$toLower` para crear un campo "emailNormalizado" que muestre el email del estudiante en minúsculas.

```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      email: 1,
      emailNormalizado: { $toLower: "$email" }
    }
  }
]);
```

**Explicación**: `$toLower` convierte todo el string a minúsculas, útil para normalizar emails que pueden tener diferentes mayúsculas/minúsculas.

---

### Ejercicio EX29: $toLower - Nombre Completo en Minúsculas
**Solución**: Usar `$project` para crear un campo "nombreCompletoMinusculas" que concatene nombre y apellido, y luego convertir todo a minúsculas usando `$toLower` con `$concat`.

```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombreCompletoMinusculas: {
        $toLower: {
          $concat: ["$nombre", " ", "$apellido"]
        }
      }
    }
  }
]);
```

**Explicación**: Anidamos `$toLower` con `$concat`. Primero concatenamos nombre y apellido, luego convertimos el resultado a minúsculas.

---

### Ejercicio EX30: $substr - Extraer Código de Materia
**Solución**: Usar `$project` con `$substr` para extraer las primeras 3 letras del código de cada materia (por ejemplo, "MAT" de "MAT101").

```javascript
db.materias.aggregate([
  {
    $project: {
      nombre: 1,
      codigo: 1,
      prefijoCodigo: { $substr: ["$codigo", 0, 3] }
    }
  }
]);
```

**Explicación**: `$substr` extrae una porción del string. Extraemos desde la posición 0 (inicio) con longitud 3, obteniendo el prefijo del código.

---

### Ejercicio EX31: $substr - Iniciales del Nombre
**Solución**: Usar `$project` para crear un campo "inicial" que extraiga solo la primera letra del nombre del estudiante.

```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      inicial: { $substr: ["$nombre", 0, 1] }
    }
  }
]);
```

**Explicación**: Extraemos solo el primer carácter del nombre (posición 0, longitud 1), obteniendo la inicial.

---

### Ejercicio EX32: $cond - Clasificación de Créditos
**Solución**: Usar `$project` con `$cond` para crear un campo "nivel" que sea "Alto" si los créditos son >= 7, "Medio" si son >= 5, o "Bajo" si son < 5. Usa `$cond` anidado.

```javascript
db.materias.aggregate([
  {
    $project: {
      nombre: 1,
      creditos: 1,
      nivel: {
        $cond: {
          if: { $gte: ["$creditos", 7] },
          then: "Alto",
          else: {
            $cond: {
              if: { $gte: ["$creditos", 5] },
              then: "Medio",
              else: "Bajo"
            }
          }
        }
      }
    }
  }
]);
```

**Explicación**: Anidamos `$cond` para crear múltiples condiciones. Primero verificamos si es >= 7 (Alto), si no, verificamos si es >= 5 (Medio), si no, es Bajo.

---

### Ejercicio EX33: $cond - Rango de Edad con Múltiples Categorías
**Solución**: Usar `$project` con `$cond` anidado para crear un campo "rangoEdad" que sea:
- "Joven" si edad < 20
- "Adulto" si edad >= 20 y < 25
- "Mayor" si edad >= 25

```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      edad: 1,
      rangoEdad: {
        $cond: {
          if: { $gte: ["$edad", 25] },
          then: "Mayor",
          else: {
            $cond: {
              if: { $gte: ["$edad", 20] },
              then: "Adulto",
              else: "Joven"
            }
          }
        }
      }
    }
  }
]);
```

**Explicación**: Anidamos `$cond` para crear tres categorías. Primero verificamos si es >= 25 (Mayor), si no, verificamos si es >= 20 (Adulto), si no, es Joven.

---

### Ejercicio EX34: $ifNull - Ciudad con Valor por Defecto
**Solución**: Usar `$project` con `$ifNull` para mostrar la ciudad del estudiante, o "No especificada" si no tiene ciudad.

```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      ciudad: {
        $ifNull: ["$ciudad", "No especificada"]
      }
    }
  }
]);
```

**Explicación**: `$ifNull` devuelve la ciudad si existe, o "No especificada" si el campo es null o no existe.

---

### Ejercicio EX35: $ifNull - Email con Valor por Defecto
**Solución**: Usar `$project` para crear un campo "emailContacto" que muestre el email del estudiante, o un email genérico "sin-email@escuela.com" si no tiene email.

```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      emailContacto: {
        $ifNull: ["$email", "sin-email@escuela.com"]
      }
    }
  }
]);
```

**Explicación**: `$ifNull` proporciona un email por defecto cuando el campo email es null o no existe, útil para mantener un formato consistente.

---

### Ejercicio EX36: Operadores de Comparación - Verificar Mayoría de Edad
**Solución**: Usar `$project` con operadores de comparación para crear un campo booleano "esMayorDeEdad" que sea `true` si la edad es >= 18, o `false` si no.

```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      edad: 1,
      esMayorDeEdad: {
        $gte: ["$edad", 18]
      }
    }
  }
]);
```

**Explicación**: Los operadores de comparación en expresiones devuelven un valor booleano. `$gte` devuelve `true` si la edad es mayor o igual a 18.

---

### Ejercicio EX37: Operadores de Comparación - Comparar Créditos
**Solución**: Usar `$project` para crear un campo booleano "tieneMuchosCreditos" que sea `true` si los créditos son > 6, o `false` si no.

```javascript
db.materias.aggregate([
  {
    $project: {
      nombre: 1,
      creditos: 1,
      tieneMuchosCreditos: {
        $gt: ["$creditos", 6]
      }
    }
  }
]);
```

**Explicación**: `$gt` en expresiones devuelve `true` si los créditos son mayores que 6, `false` en caso contrario. Útil para crear campos calculados booleanos.

---

### Ejercicio EX38: $gt - Verificar Edad Mayor
**Solución**: Usar `$project` con `$gt` para crear un campo booleano "esMayorDe25" que sea `true` si la edad es mayor a 25, o `false` si no.

```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      edad: 1,
      esMayorDe25: {
        $gt: ["$edad", 25]
      }
    }
  }
]);
```

**Explicación**: `$gt` devuelve `true` si la edad es estrictamente mayor que 25. Útil para clasificar estudiantes por rangos de edad.

---

### Ejercicio EX39: $gte - Verificar Créditos Mínimos
**Solución**: Usar `$project` con `$gte` para crear un campo booleano "cumpleMinimo" que sea `true` si los créditos son >= 6, o `false` si no.

```javascript
db.materias.aggregate([
  {
    $project: {
      nombre: 1,
      codigo: 1,
      creditos: 1,
      cumpleMinimo: {
        $gte: ["$creditos", 6]
      }
    }
  }
]);
```

**Explicación**: `$gte` devuelve `true` si los créditos son mayores o iguales a 6. Útil para validar si una materia cumple con el mínimo requerido.

---

### Ejercicio EX40: $lt - Verificar Edad Menor
**Solución**: Usar `$project` con `$lt` para crear un campo booleano "esMenorDe21" que sea `true` si la edad es menor a 21, o `false` si no.

```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      edad: 1,
      esMenorDe21: {
        $lt: ["$edad", 21]
      }
    }
  }
]);
```

**Explicación**: `$lt` devuelve `true` si la edad es estrictamente menor que 21. Útil para identificar estudiantes jóvenes.

---

### Ejercicio EX41: $lt - Verificar Créditos Bajos
**Solución**: Usar `$project` con `$lt` para crear un campo booleano "tienePocosCreditos" que sea `true` si los créditos son < 6, o `false` si no.

```javascript
db.materias.aggregate([
  {
    $project: {
      nombre: 1,
      creditos: 1,
      tienePocosCreditos: {
        $lt: ["$creditos", 6]
      }
    }
  }
]);
```

**Explicación**: `$lt` devuelve `true` si los créditos son menores que 6. Útil para identificar materias con carga baja.

---

### Ejercicio EX42: $lte - Verificar Edad Máxima
**Solución**: Usar `$project` con `$lte` para crear un campo booleano "esMenorOIgualA22" que sea `true` si la edad es <= 22, o `false` si no.

```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      edad: 1,
      esMenorOIgualA22: {
        $lte: ["$edad", 22]
      }
    }
  }
]);
```

**Explicación**: `$lte` devuelve `true` si la edad es menor o igual a 22. Útil para establecer límites máximos.

---

### Ejercicio EX43: $lte - Verificar Créditos Máximos
**Solución**: Usar `$project` con `$lte` para crear un campo booleano "dentroDelLimite" que sea `true` si los créditos son <= 7, o `false` si no.

```javascript
db.materias.aggregate([
  {
    $project: {
      nombre: 1,
      creditos: 1,
      dentroDelLimite: {
        $lte: ["$creditos", 7]
      }
    }
  }
]);
```

**Explicación**: `$lte` devuelve `true` si los créditos son menores o iguales a 7. Útil para validar que las materias no excedan un límite.

---

### Ejercicio EX44: $eq - Verificar Igualdad de Edad
**Solución**: Usar `$project` con `$eq` para crear un campo booleano "tiene20Anos" que sea `true` si la edad es exactamente 20, o `false` si no.

```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      edad: 1,
      tiene20Anos: {
        $eq: ["$edad", 20]
      }
    }
  }
]);
```

**Explicación**: `$eq` devuelve `true` si la edad es exactamente igual a 20. Útil para buscar valores específicos.

---

### Ejercicio EX45: $eq - Verificar Créditos Exactos
**Solución**: Usar `$project` con `$eq` para crear un campo booleano "tiene6Creditos" que sea `true` si los créditos son exactamente 6, o `false` si no.

```javascript
db.materias.aggregate([
  {
    $project: {
      nombre: 1,
      creditos: 1,
      tiene6Creditos: {
        $eq: ["$creditos", 6]
      }
    }
  }
]);
```

**Explicación**: `$eq` devuelve `true` si los créditos son exactamente 6. Útil para identificar materias con un valor específico.

---

### Ejercicio EX46: $ne - Verificar Diferencia de Edad
**Solución**: Usar `$project` con `$ne` para crear un campo booleano "noTiene20Anos" que sea `true` si la edad NO es 20, o `false` si es 20.

```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      edad: 1,
      noTiene20Anos: {
        $ne: ["$edad", 20]
      }
    }
  }
]);
```

**Explicación**: `$ne` devuelve `true` si la edad NO es igual a 20. Útil para excluir valores específicos.

---

### Ejercicio EX47: $ne - Verificar Diferencia de Créditos
**Solución**: Usar `$project` con `$ne` para crear un campo booleano "noTiene6Creditos" que sea `true` si los créditos NO son 6, o `false` si son 6.

```javascript
db.materias.aggregate([
  {
    $project: {
      nombre: 1,
      creditos: 1,
      noTiene6Creditos: {
        $ne: ["$creditos", 6]
      }
    }
  }
]);
```

**Explicación**: `$ne` devuelve `true` si los créditos NO son iguales a 6. Útil para identificar materias que no tienen un valor estándar.

---

## 🎯 FASE 8: Ejercicios Combinados CRUD + Operadores (Nivel Avanzado)

### Ejercicio CO1: Consulta Compleja con Actualización
**Solución**: 
1. Buscar todos los estudiantes activos mayores de 22 años usando `find()`.
2. Luego actualizar a esos estudiantes agregándoles un campo "categoria" con valor "avanzado" usando `updateMany()`.

**Paso 1: Consulta para verificar**
```javascript
db.estudiantes.find({
  activo: true,
  edad: { $gt: 22 }
});
```

**Paso 2: Actualización**
```javascript
db.estudiantes.updateMany(
  {
    activo: true,
    edad: { $gt: 22 }
  },
  {
    $set: { categoria: "avanzado" }
  }
);
```

**Explicación**: Primero verificamos con `find()` qué estudiantes cumplen la condición, luego usamos la misma condición en `updateMany()` para actualizarlos. Es importante verificar antes de actualizar.

---

### Ejercicio CO2: Pipeline con Transformación y Actualización
**Solución**: 
1. Usar `aggregate()` con `$match` y `$project` para encontrar estudiantes activos y crear un campo calculado "edadEn5Anos" (edad + 5).
2. Luego, basándote en los resultados, actualizar esos estudiantes agregándoles el campo "edadFutura" con el valor calculado.

**Paso 1: Pipeline para ver resultados**
```javascript
db.estudiantes.aggregate([
  {
    $match: { activo: true }
  },
  {
    $project: {
      nombre: 1,
      edad: 1,
      edadEn5Anos: {
        $add: ["$edad", 5]
      }
    }
  }
]);
```

**Paso 2: Actualización usando operador de expresión**
```javascript
db.estudiantes.updateMany(
  { activo: true },
  [
    {
      $set: {
        edadFutura: {
          $add: ["$edad", 5]
        }
      }
    }
  ]
);
```

**Explicación**: Usamos la sintaxis de pipeline en `updateMany()` (array) para poder usar operadores de expresión como `$add`. Esto calcula edad + 5 y lo guarda en el campo "edadFutura".

---

### Ejercicio CO3: Agrupar, Filtrar y Actualizar
**Solución**: 
1. Agrupar estudiantes por ciudad y calcular el promedio de edad por ciudad.
2. Identificar las ciudades con promedio mayor a 21 años.
3. Actualizar a todos los estudiantes de esas ciudades agregándoles un campo "ciudadDestacada" con valor `true`.

**Paso 1: Agrupar y calcular promedios**
```javascript
db.estudiantes.aggregate([
  {
    $group: {
      _id: "$ciudad",
      promedioEdad: { $avg: "$edad" }
    }
  },
  {
    $match: {
      promedioEdad: { $gt: 21 }
    }
  }
]);
```

**Paso 2: Identificar ciudades (ejemplo: Buenos Aires, Córdoba)**
```javascript
// Supongamos que las ciudades encontradas son "Buenos Aires" y "Córdoba"
db.estudiantes.updateMany(
  {
    ciudad: { $in: ["Buenos Aires", "Córdoba"] }
  },
  {
    $set: { ciudadDestacada: true }
  }
);
```

**Explicación**: Primero agrupamos y calculamos promedios, luego filtramos ciudades con promedio > 21. Finalmente actualizamos estudiantes de esas ciudades usando `$in` con la lista de ciudades encontradas.

---

### Ejercicio CO4: Consulta con Eliminación Condicional
**Solución**: 
1. Buscar estudiantes que NO están activos Y tienen más de 25 años usando `find()`.
2. Verificar cuántos son con `countDocuments()`.
3. Eliminar esos estudiantes usando `deleteMany()`.

**Paso 1: Consulta para verificar**
```javascript
db.estudiantes.find({
  activo: false,
  edad: { $gt: 25 }
});
```

**Paso 2: Contar**
```javascript
db.estudiantes.countDocuments({
  activo: false,
  edad: { $gt: 25 }
});
```

**Paso 3: Eliminar**
```javascript
db.estudiantes.deleteMany({
  activo: false,
  edad: { $gt: 25 }
});
```

**Explicación**: Siempre es buena práctica verificar con `find()` y contar con `countDocuments()` antes de eliminar documentos. Esto previene eliminaciones accidentales.

---

### Ejercicio CO5: Pipeline Completo con Estadísticas y Actualización
**Solución**: 
1. Crear un pipeline que agrupe materias por docente, calcule total de créditos y promedio.
2. Filtrar docentes con promedio de créditos >= 6.
3. Para cada materia de esos docentes, actualizar agregando un campo "docenteDestacado" con valor `true`.

**Paso 1: Pipeline de análisis**
```javascript
db.materias.aggregate([
  {
    $group: {
      _id: "$docente",
      totalCreditos: { $sum: "$creditos" },
      promedioCreditos: { $avg: "$creditos" }
    }
  },
  {
    $match: {
      promedioCreditos: { $gte: 6 }
    }
  }
]);
```

**Paso 2: Actualizar materias de docentes destacados**
```javascript
// Supongamos que los docentes encontrados son "Dr. García" y "Ing. Martínez"
db.materias.updateMany(
  {
    docente: { $in: ["Dr. García", "Ing. Martínez"] }
  },
  {
    $set: { docenteDestacado: true }
  }
);
```

**Explicación**: Agrupamos por docente, calculamos estadísticas, filtramos docentes con promedio >= 6, y luego actualizamos todas las materias de esos docentes usando `$in`.

---

### Ejercicio CO6: Transformación Compleja con Actualización
**Solución**: 
1. Usar `aggregate()` con `$project` para crear documentos con nombreCompleto (concat), categoria (cond por edad), y telefono (ifNull).
2. Basándote en los resultados, actualizar los estudiantes:
   - Si no tienen telefono, agregarles "telefono" con valor "000-0000-0000"
   - Si tienen categoria "Mayor" (edad >= 21), agregarles "descuento" con valor 10

**Paso 1: Pipeline de transformación**
```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombreCompleto: {
        $concat: ["$nombre", " ", "$apellido"]
      },
      categoria: {
        $cond: {
          if: { $gte: ["$edad", 21] },
          then: "Mayor",
          else: "Menor"
        }
      },
      telefono: {
        $ifNull: ["$telefono", "Sin teléfono"]
      }
    }
  }
]);
```

**Paso 2: Actualización 1 - Agregar teléfono a quienes no lo tienen**
```javascript
db.estudiantes.updateMany(
  {
    telefono: { $exists: false }
  },
  {
    $set: { telefono: "000-0000-0000" }
  }
);
```

**Paso 3: Actualización 2 - Agregar descuento a mayores de 21**
```javascript
db.estudiantes.updateMany(
  {
    edad: { $gte: 21 }
  },
  {
    $set: { descuento: 10 }
  }
);
```

**Explicación**: Primero visualizamos los datos transformados con el pipeline. Luego hacemos dos actualizaciones separadas: una para estudiantes sin teléfono, otra para estudiantes mayores de 21 años.

---

### Ejercicio CO7: Consulta, Conteo y Eliminación Selectiva
**Solución**: 
1. Buscar estudiantes que tienen el campo "telefono" Y son de "Buenos Aires" usando `find()`.
2. Contar cuántos son.
3. Eliminar solo los que tienen más de 24 años de ese grupo.

**Paso 1: Consulta para verificar**
```javascript
db.estudiantes.find({
  telefono: { $exists: true },
  ciudad: "Buenos Aires"
});
```

**Paso 2: Contar**
```javascript
db.estudiantes.countDocuments({
  telefono: { $exists: true },
  ciudad: "Buenos Aires"
});
```

**Paso 3: Eliminar selectivamente**
```javascript
db.estudiantes.deleteMany({
  telefono: { $exists: true },
  ciudad: "Buenos Aires",
  edad: { $gt: 24 }
});
```

**Explicación**: Combinamos múltiples condiciones: existencia de teléfono, ciudad específica, y edad mayor a 24. Siempre verificamos y contamos antes de eliminar.

---

### Ejercicio CO8: Estadísticas por Grupo y Actualización Masiva
**Solución**: 
1. Agrupar estudiantes por ciudad y calcular estadísticas (total, promedio, min, max de edad).
2. Identificar la ciudad con más estudiantes.
3. Incrementar la edad de todos los estudiantes de esa ciudad en 1 año.

**Paso 1: Agrupar y calcular estadísticas**
```javascript
db.estudiantes.aggregate([
  {
    $group: {
      _id: "$ciudad",
      total: { $sum: 1 },
      promedioEdad: { $avg: "$edad" },
      edadMinima: { $min: "$edad" },
      edadMaxima: { $max: "$edad" }
    }
  },
  {
    $sort: { total: -1 }
  },
  {
    $limit: 1
  }
]);
```

**Paso 2: Incrementar edad (supongamos que "Buenos Aires" es la ciudad con más estudiantes)**
```javascript
db.estudiantes.updateMany(
  { ciudad: "Buenos Aires" },
  { $inc: { edad: 1 } }
);
```

**Explicación**: Agrupamos, calculamos estadísticas, ordenamos por total descendente y limitamos a 1 para encontrar la ciudad con más estudiantes. Luego incrementamos la edad de todos los estudiantes de esa ciudad.

---

### Ejercicio CO9: Pipeline con Filtrado y Actualización Condicional
**Solución**: 
1. Filtrar estudiantes activos mayores de 20 años.
2. Agrupar por ciudad y calcular promedio de edad.
3. Para ciudades con promedio >= 22, actualizar a todos sus estudiantes agregándoles "ciudadPromedioAlto" con valor `true`.

**Paso 1: Pipeline de análisis**
```javascript
db.estudiantes.aggregate([
  {
    $match: {
      activo: true,
      edad: { $gt: 20 }
    }
  },
  {
    $group: {
      _id: "$ciudad",
      promedioEdad: { $avg: "$edad" }
    }
  },
  {
    $match: {
      promedioEdad: { $gte: 22 }
    }
  }
]);
```

**Paso 2: Actualizar estudiantes de ciudades con promedio alto**
```javascript
// Supongamos que las ciudades encontradas son "Buenos Aires" y "Córdoba"
db.estudiantes.updateMany(
  {
    ciudad: { $in: ["Buenos Aires", "Córdoba"] }
  },
  {
    $set: { ciudadPromedioAlto: true }
  }
);
```

**Explicación**: Filtramos primero con `$match`, luego agrupamos y calculamos promedios, filtramos ciudades con promedio >= 22, y finalmente actualizamos estudiantes de esas ciudades.

---

### Ejercicio CO10: Consulta Compleja, Transformación y Eliminación
**Solución**: 
1. Buscar estudiantes que (son activos O tienen más de 25 años) Y NO son de "Rosario".
2. Usar `aggregate()` con `$project` para crear un campo "riesgo" que sea "alto" si edad > 24, "medio" si edad >= 20, o "bajo" si no.
3. Eliminar todos los estudiantes con "riesgo" = "alto" (usando la condición de edad directamente en `deleteMany()`).

**Paso 1: Consulta compleja**
```javascript
db.estudiantes.find({
  $or: [
    { activo: true },
    { edad: { $gt: 25 } }
  ],
  ciudad: { $ne: "Rosario" }
});
```

**Paso 2: Pipeline con transformación**
```javascript
db.estudiantes.aggregate([
  {
    $match: {
      $or: [
        { activo: true },
        { edad: { $gt: 25 } }
      ],
      ciudad: { $ne: "Rosario" }
    }
  },
  {
    $project: {
      nombre: 1,
      edad: 1,
      riesgo: {
        $cond: {
          if: { $gt: ["$edad", 24] },
          then: "alto",
          else: {
            $cond: {
              if: { $gte: ["$edad", 20] },
              then: "medio",
              else: "bajo"
            }
          }
        }
      }
    }
  }
]);
```

**Paso 3: Eliminar estudiantes de riesgo alto**
```javascript
db.estudiantes.deleteMany({
  $or: [
    { activo: true },
    { edad: { $gt: 25 } }
  ],
  ciudad: { $ne: "Rosario" },
  edad: { $gt: 24 }
});
```

**Explicación**: Combinamos `$or` con `$ne` para la consulta inicial. En el pipeline, usamos `$cond` anidado para clasificar por riesgo. Finalmente, eliminamos estudiantes que cumplen todas las condiciones Y tienen edad > 24 (riesgo alto).

---

## 📊 Resumen de Ejercicios por Fase

| Fase | Nivel | Operadores | Cantidad | Conceptos Clave |
|------|-------|------------|----------|-----------------|
| **FASE 1** | Intermedio | $and | 5 ejercicios | $and explícito, $and implícito, anidación |
| **FASE 2** | Intermedio | $or, $in, $nin | 8 ejercicios | $or básico, $or vs $in, $nin para exclusiones, $nin vs $nor, combinaciones |
| **FASE 3** | Avanzado | $nor, $not | 4 ejercicios | Negación lógica, $not con regex |
| **FASE 4** | Intermedio-Avanzado | $match | 6 ejercicios | Aggregation pipeline, $match con otras etapas |
| **FASE 5** | Avanzado | $exists, $type, $regex | 9 ejercicios | Verificar existencia y tipo de campos, validación con regex, búsquedas de texto (comienza con, termina con, contiene) |
| **FASE 6** | Avanzado | Combinados | 5 ejercicios | Consultas complejas, find() vs aggregate() |
| **FASE 7** | Intermedio-Avanzado | Operadores de Expresión | 47 ejercicios | $sum, $avg, $min, $max, $count, $add, $subtract, $multiply, $divide, $concat, $toUpper, $toLower, $substr, $cond, $ifNull, operadores de comparación ($gt, $gte, $lt, $lte, $eq, $ne), $group, $project |
| **FASE 8** | Avanzado | Combinados CRUD + Operadores | 10 ejercicios | Consultas complejas, actualizaciones basadas en consultas, eliminaciones condicionales, pipelines con transformaciones |

**Total**: 94 ejercicios prácticos resueltos

---

## 🎓 Guía de Uso para el Docente

### Tiempo Estimado
- **FASE 1 ($and)**: 30-40 minutos
- **FASE 2 ($or)**: 40-50 minutos
- **FASE 3 ($nor, $not)**: 30-40 minutos
- **FASE 4 ($match)**: 40-50 minutos
- **FASE 5 ($exists, $type, $regex)**: 50-60 minutos
- **FASE 6 (Complejas)**: 40-50 minutos
- **FASE 7 (Operadores de Expresión)**: 90-120 minutos
- **FASE 8 (Combinados CRUD + Operadores)**: 60-75 minutos
- **Total**: 6-7 horas

### Recomendación de Flujo

1. **Primera parte de la clase (teoría)**: Explicar operadores lógicos y $match
2. **FASE 1 y 2**: Realizar ejercicios de $and y $or (operadores más comunes)
3. **FASE 3**: Si hay tiempo, introducir $nor y $not
4. **FASE 4**: Enseñar $match en aggregation pipeline
5. **FASE 5**: Operadores adicionales útiles
6. **FASE 6**: Consultas complejas combinadas
7. **FASE 7**: Operadores de expresión (todos los tipos)
8. **FASE 8**: Ejercicios combinados CRUD + operadores (casos reales)

### Puntos Clave a Enfatizar

- ✅ **$and es implícito**: No necesitas escribirlo cuando tienes múltiples condiciones
- ✅ **$or debe ser explícito**: Siempre requiere sintaxis `$or: [...]`
- ✅ **$match optimiza**: Colócalo al inicio del pipeline
- ✅ **find() vs aggregate()**: Usa find() para lectura simple, aggregate() para procesamiento
- ✅ **Construye paso a paso**: Empieza simple y agrega complejidad
- ✅ **Operadores de expresión**: Anida operadores para crear cálculos complejos
- ✅ **$group vs $project**: Usa $group para agregar, $project para transformar

### Errores Comunes a Prevenir

1. ❌ Usar `$and` innecesariamente cuando es implícito
2. ❌ Olvidar que `$or` debe ser explícito
3. ❌ Colocar `$match` después de otras etapas en el pipeline
4. ❌ Confundir `$nor` con `$not`
5. ❌ No optimizar consultas colocando `$match` primero
6. ❌ Confundir sintaxis de operadores de expresión (usar `$` para campos)
7. ❌ No anidar `$cond` correctamente para múltiples condiciones
8. ❌ Actualizar o eliminar sin verificar primero con `find()` o `countDocuments()`
9. ❌ No usar pipeline syntax en `updateMany()` cuando se necesitan operadores de expresión

---

## 📚 Ejercicios Adicionales

Para más ejercicios y práctica adicional, los estudiantes pueden:
- Modificar las consultas existentes con diferentes condiciones
- Crear sus propias consultas complejas
- Experimentar combinando diferentes operadores
- Comparar rendimiento entre find() y aggregate()

---

## ✅ Checklist de Aprendizaje

Al finalizar estos ejercicios, el estudiante debería poder:

- [ ] Usar `$and` explícito e implícito correctamente
- [ ] Construir consultas con `$or` para condiciones alternativas
- [ ] Usar `$in` para búsquedas por múltiples valores del mismo campo
- [ ] Usar `$nin` para excluir múltiples valores del mismo campo
- [ ] Entender y usar `$nor` y `$not` cuando sea necesario
- [ ] Entender la diferencia entre `$nin` y `$nor` para exclusiones múltiples
- [ ] Combinar múltiples operadores lógicos en consultas complejas
- [ ] Usar `$match` en aggregation pipeline
- [ ] Entender la diferencia entre `find()` y `aggregate()` con `$match`
- [ ] Usar `$exists` para verificar existencia de campos
- [ ] Usar `$type` para verificar tipos de datos
- [ ] Optimizar consultas colocando `$match` al inicio del pipeline
- [ ] Construir consultas complejas paso a paso
- [ ] Usar operadores de agregación (`$sum`, `$avg`, `$min`, `$max`, `$count`) en `$group`
- [ ] Usar operadores aritméticos (`$add`, `$subtract`, `$multiply`, `$divide`) en `$project`
- [ ] Usar operadores de string (`$concat`, `$toUpper`, `$toLower`, `$substr`) para transformar texto
- [ ] Usar operadores condicionales (`$cond` anidado, `$ifNull`) para lógica condicional
- [ ] Usar operadores de comparación en expresiones (`$gt`, `$gte`, `$lt`, `$lte`, `$eq`, `$ne`)
- [ ] Combinar múltiples etapas del pipeline (`$match`, `$group`, `$project`, `$sort`, `$limit`)
- [ ] Anidar operadores de expresión para crear cálculos complejos
- [ ] Combinar consultas complejas con operaciones de actualización
- [ ] Usar pipelines de agregación para analizar datos antes de actualizar
- [ ] Verificar y contar documentos antes de eliminar
- [ ] Usar sintaxis de pipeline en `updateMany()` para operadores de expresión