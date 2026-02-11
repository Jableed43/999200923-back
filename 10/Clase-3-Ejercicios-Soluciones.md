# Ejercicios Prácticos - Clase 3: Operadores Aritméticos y Pipeline Básico
## Soluciones Completas

**Base de Datos**: `escuela`  
**Colecciones**: `estudiantes`, `materias`, `examenes`, `faltas`, `tareas`, `entregas`

> **Nota**: Este archivo contiene las soluciones de todos los ejercicios. Las consignas están disponibles en `Clase-3-Ejercicios-Consignas.md`.

---

## 📑 Índice de Navegación Rápida

### Preparación
- [📋 Preparación: Set de Datos](#-preparación-set-de-datos)

### Fases de Ejercicios
- [🎯 FASE 1: Pipeline Básico - $sort, $limit, $count (6 ejercicios)](#-fase-1-pipeline-básico---sort-limit-count)
- [🎯 FASE 2: Operadores Aritméticos Básicos (8 ejercicios)](#-fase-2-operadores-aritméticos-básicos)
- [🎯 FASE 3: Operadores Aritméticos Avanzados (8 ejercicios)](#-fase-3-operadores-aritméticos-avanzados)
- [🎯 FASE 4: $lookup Básico (5 ejercicios)](#-fase-4-lookup-básico)
- [🎯 FASE 5: $lookup con Aggregate Pipelines (5 ejercicios)](#-fase-5-lookup-con-aggregate-pipelines)

### Guías y Referencias
- [📊 Resumen de Ejercicios por Fase](#-resumen-de-ejercicios-por-fase)
- [🎓 Guía de Uso para el Docente](#-guía-de-uso-para-el-docente)
- [✅ Checklist de Aprendizaje](#-checklist-de-aprendizaje)

### Archivos Relacionados
- 📖 [Material Teórico](./Clase-3-Aggregation-Pipeline-Avanzado.md)
- 📝 [Ejercicios - Consignas](./Clase-3-Ejercicios-Consignas.md)

---

## 📋 Preparación: Set de Datos

Antes de comenzar, asegúrate de tener la base de datos `escuela` con los siguientes datos:

> **Nota importante**: Después de ejecutar `use escuela`, todas las consultas en los ejercicios usan `db.coleccion` (por ejemplo, `db.estudiantes.aggregate()`), no `db.escuela.coleccion`. Esto es porque `use escuela` establece el contexto de la base de datos activa.

```javascript
// 1. Seleccionar/crear base de datos
use escuela

// 2. Insertar estudiantes
db.estudiantes.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439041"),
    nombre: "María",
    apellido: "González",
    edad: 22,
    ciudad: "Buenos Aires",
    activo: true,
    materiasInscritas: [ObjectId("507f1f77bcf86cd799439011"), ObjectId("507f1f77bcf86cd799439012")]
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439042"),
    nombre: "Juan",
    apellido: "Pérez",
    edad: 20,
    ciudad: "Córdoba",
    activo: true,
    materiasInscritas: [ObjectId("507f1f77bcf86cd799439011")]
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439043"),
    nombre: "Ana",
    apellido: "Martínez",
    edad: 25,
    ciudad: "Buenos Aires",
    activo: false,
    materiasInscritas: [ObjectId("507f1f77bcf86cd799439012"), ObjectId("507f1f77bcf86cd799439013")]
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439044"),
    nombre: "Carlos",
    apellido: "López",
    edad: 19,
    ciudad: "Rosario",
    activo: true,
    materiasInscritas: []
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439045"),
    nombre: "Laura",
    apellido: "Fernández",
    edad: 23,
    ciudad: "Buenos Aires",
    activo: true,
    materiasInscritas: [ObjectId("507f1f77bcf86cd799439011"), ObjectId("507f1f77bcf86cd799439012"), ObjectId("507f1f77bcf86cd799439013")]
  }
]);

// 3. Insertar materias
db.materias.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439011"),
    nombre: "Programación",
    creditos: 6,
    activa: true,
    docente: "Ing. Rodríguez"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439012"),
    nombre: "Base de Datos",
    creditos: 4,
    activa: true,
    docente: "Ing. Martínez"
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439013"),
    nombre: "Algoritmos",
    creditos: 5,
    activa: true,
    docente: "Ing. López"
  }
]);

// 4. Insertar exámenes
db.examenes.insertMany([
  {
    materiaId: ObjectId("507f1f77bcf86cd799439011"),
    estudianteId: ObjectId("507f1f77bcf86cd799439041"),
    fecha: new Date("2025-01-15"),
    nota: 8,
    notaMaxima: 10,
    tipo: "parcial",
    peso: 0.3
  },
  {
    materiaId: ObjectId("507f1f77bcf86cd799439011"),
    estudianteId: ObjectId("507f1f77bcf86cd799439042"),
    fecha: new Date("2025-01-15"),
    nota: 6,
    notaMaxima: 10,
    tipo: "parcial",
    peso: 0.3
  },
  {
    materiaId: ObjectId("507f1f77bcf86cd799439012"),
    estudianteId: ObjectId("507f1f77bcf86cd799439041"),
    fecha: new Date("2025-01-20"),
    nota: 9,
    notaMaxima: 10,
    tipo: "parcial",
    peso: 0.3
  },
  {
    materiaId: ObjectId("507f1f77bcf86cd799439012"),
    estudianteId: ObjectId("507f1f77bcf86cd799439043"),
    fecha: new Date("2025-01-20"),
    nota: 7,
    notaMaxima: 10,
    tipo: "parcial",
    peso: 0.3
  }
]);

// 5. Insertar faltas
db.faltas.insertMany([
  {
    estudianteId: ObjectId("507f1f77bcf86cd799439041"),
    materiaId: ObjectId("507f1f77bcf86cd799439011"),
    fecha: new Date("2025-01-10"),
    justificada: false,
    tipo: "falta"
  },
  {
    estudianteId: ObjectId("507f1f77bcf86cd799439041"),
    materiaId: ObjectId("507f1f77bcf86cd799439011"),
    fecha: new Date("2025-01-12"),
    justificada: true,
    tipo: "falta"
  },
  {
    estudianteId: ObjectId("507f1f77bcf86cd799439042"),
    materiaId: ObjectId("507f1f77bcf86cd799439011"),
    fecha: new Date("2025-01-10"),
    justificada: false,
    tipo: "llegada tarde"
  },
  {
    estudianteId: ObjectId("507f1f77bcf86cd799439043"),
    materiaId: ObjectId("507f1f77bcf86cd799439012"),
    fecha: new Date("2025-01-15"),
    justificada: false,
    tipo: "falta"
  }
]);

// 6. Insertar tareas
db.tareas.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439051"),
    materiaId: ObjectId("507f1f77bcf86cd799439011"),
    titulo: "Proyecto Final - API REST",
    descripcion: "Desarrollar una API REST completa con Node.js y Express",
    fechaLimite: new Date("2025-02-15"),
    puntosMaximos: 100
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439052"),
    materiaId: ObjectId("507f1f77bcf86cd799439012"),
    titulo: "Diseño de Base de Datos",
    descripcion: "Diseñar el esquema de una base de datos para un sistema de gestión",
    fechaLimite: new Date("2025-02-20"),
    puntosMaximos: 80
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439053"),
    materiaId: ObjectId("507f1f77bcf86cd799439013"),
    titulo: "Análisis de Algoritmos",
    descripcion: "Analizar la complejidad temporal y espacial de algoritmos dados",
    fechaLimite: new Date("2025-02-25"),
    puntosMaximos: 90
  }
]);

// 7. Insertar entregas
db.entregas.insertMany([
  {
    estudianteId: ObjectId("507f1f77bcf86cd799439041"),
    tareaId: ObjectId("507f1f77bcf86cd799439051"),
    fechaEntrega: new Date("2025-02-14"),
    nota: 85,
    archivo: "proyecto-api.zip"
  },
  {
    estudianteId: ObjectId("507f1f77bcf86cd799439042"),
    tareaId: ObjectId("507f1f77bcf86cd799439051"),
    fechaEntrega: new Date("2025-02-16"),
    nota: 92,
    archivo: "api-rest.zip"
  },
  {
    estudianteId: ObjectId("507f1f77bcf86cd799439041"),
    tareaId: ObjectId("507f1f77bcf86cd799439052"),
    fechaEntrega: new Date("2025-02-18"),
    nota: 78,
    archivo: "diseño-bd.pdf"
  },
  {
    estudianteId: ObjectId("507f1f77bcf86cd799439043"),
    tareaId: ObjectId("507f1f77bcf86cd799439053"),
    fechaEntrega: new Date("2025-02-24"),
    nota: 88,
    archivo: "analisis-algoritmos.pdf"
  }
]);
```

---

## 🎯 FASE 1: Pipeline Básico - $sort, $limit, $count

### Ejercicio P1: Ordenar estudiantes por edad
**Solución**: Usa `$sort` para ordenar por edad ascendente.

```javascript
db.estudiantes.aggregate([
  { $sort: { edad: 1 } }
]);
```

**Explicación**: `$sort` ordena los documentos por el campo especificado. `1` = ascendente.

---

### Ejercicio P2: Ordenar por múltiples campos
**Solución**: Usa `$sort` con múltiples campos.

```javascript
db.estudiantes.aggregate([
  {
    $sort: {
      ciudad: 1,
      edad: -1
    }
  }
]);
```

**Explicación**: Primero ordena por ciudad (ascendente), luego por edad (descendente) cuando hay empates.

---

### Ejercicio P3: Top 3 estudiantes más jóvenes
**Solución**: Combina `$sort` y `$limit`.

```javascript
db.estudiantes.aggregate([
  { $sort: { edad: 1 } },
  { $limit: 3 }
]);
```

**Explicación**: Primero ordenamos por edad ascendente, luego limitamos a 3 documentos.

---

### Ejercicio P4: Contar estudiantes activos
**Solución**: Usa `$match` seguido de `$count`.

```javascript
db.estudiantes.aggregate([
  { $match: { activo: true } },
  { $count: "totalActivos" }
]);
```

**Explicación**: Filtramos estudiantes activos y luego contamos con `$count`.

---

### Ejercicio P5: Contar ciudades diferentes
**Solución**: Agrupa por ciudad y luego cuenta los grupos.

```javascript
db.estudiantes.aggregate([
  {
    $group: {
      _id: "$ciudad"
    }
  },
  { $count: "totalCiudades" }
]);
```

**Explicación**: Agrupamos por ciudad (obteniendo ciudades únicas) y luego contamos los grupos.

---

### Ejercicio P6: Top 5 exámenes con mejor nota
**Solución**: Ordena por nota descendente y limita.

```javascript
db.examenes.aggregate([
  { $sort: { nota: -1 } },
  { $limit: 5 }
]);
```

**Explicación**: Ordenamos por nota descendente y tomamos los 5 primeros.

---

## 🎯 FASE 2: Operadores Aritméticos Básicos

### Ejercicio A1: Calcular edad en 10 años
**Solución**: Usa `$add` para calcular la edad que tendrán los estudiantes en 10 años.

**Sintaxis del operador:**
```javascript
{ $add: ["$edad", 10] }  // edad + 10
```

**Uso en un pipeline (ejemplo):**
```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      edad: 1,
      edadEn10Anos: { $add: ["$edad", 10] }
    }
  }
]);
```

**Explicación**: `$add` suma 10 a la edad actual. El operador se usa dentro de `$project` o `$group`.

---

### Ejercicio A2: Calcular nota final con bono
**Solución**: Usa `$add` para calcular la nota final sumando la nota base y un bono fijo de 2 puntos.

**Sintaxis del operador:**
```javascript
{ $add: ["$nota", 2] }  // nota + 2
```

**Uso en un pipeline (ejemplo):**
```javascript
db.examenes.aggregate([
  {
    $project: {
      estudianteId: 1,
      materiaId: 1,
      nota: 1,
      notaFinal: { $add: ["$nota", 2] }  // Bono fijo de 2 puntos
    }
  }
]);
```

**Explicación**: `$add` suma la nota base y un bono fijo de 2 puntos. El operador se usa dentro de `$project` o `$group`.

---

### Ejercicio A3: Calcular diferencia de créditos
**Solución**: Usa `$subtract` para calcular cuántos créditos le faltan a cada materia para llegar a 6 créditos.

**Sintaxis del operador:**
```javascript
{ $subtract: [6, "$creditos"] }  // 6 - créditos
```

**Uso en un pipeline (ejemplo):**
```javascript
db.materias.aggregate([
  {
    $project: {
      nombre: 1,
      creditos: 1,
      diferencia: { $subtract: [6, "$creditos"] }
    }
  }
]);
```

**Explicación**: `$subtract` resta los créditos actuales de 6. El operador se usa dentro de `$project` o `$group`.

---

### Ejercicio A4: Calcular diferencia de nota
**Solución**: Usa `$subtract` para calcular la diferencia entre la nota máxima y la nota obtenida.

**Sintaxis del operador:**
```javascript
{ $subtract: ["$notaMaxima", "$nota"] }  // notaMaxima - nota
```

**Uso en un pipeline (ejemplo):**
```javascript
db.examenes.aggregate([
  {
    $project: {
      estudianteId: 1,
      materiaId: 1,
      nota: 1,
      notaMaxima: 1,
      diferencia: { $subtract: ["$notaMaxima", "$nota"] }
    }
  }
]);
```

**Explicación**: `$subtract` calcula la diferencia entre nota máxima y nota obtenida. El operador se usa dentro de `$project` o `$group`.

---

### Ejercicio A5: Calcular porcentaje de nota
**Solución**: Usa `$multiply` y `$divide` para calcular el porcentaje del promedio de notas obtenido por cada estudiante (asumiendo nota máxima de 10).

**Sintaxis del operador:**
```javascript
{
  $multiply: [
    { $divide: ["$promedio", 10] },
    100
  ]
}  // (promedio / 10) * 100
```

**Uso en un pipeline (ejemplo):**
```javascript
db.entregas.aggregate([
  {
    $group: {
      _id: "$estudianteId",
      promedio: { $avg: "$nota" }
    }
  },
  {
    $project: {
      estudianteId: "$_id",
      promedio: 1,
      porcentaje: {
        $multiply: [
          { $divide: ["$promedio", 10] },
          100
        ]
      }
    }
  }
]);
```

**Explicación**: Primero agrupamos las entregas por estudiante y calculamos el promedio de sus notas. Luego calculamos el porcentaje dividiendo el promedio entre 10 (nota máxima) y multiplicando por 100. Los operadores se usan dentro de `$project` o `$group`.

---

### Ejercicio A6: Calcular nota con penalización
**Solución**: Usa `$lookup` para traer la fecha límite de la tarea, luego `$cond` y `$multiply` para aplicar una penalización del 10% solo si la entrega está atrasada.

**Sintaxis del operador:**
```javascript
{
  $cond: {
    if: { $gt: ["$fechaEntrega", "$fechaLimite"] },
    then: {
      $multiply: [
        "$nota",
        { $subtract: [1, 0.1] }
      ]
    },
    else: "$nota"
  }
}  // Si fechaEntrega > fechaLimite: nota * 0.9, sino: nota
```

**Uso en un pipeline (ejemplo):**
```javascript
db.entregas.aggregate([
  {
    $lookup: {
      from: "tareas",
      localField: "tareaId",
      foreignField: "_id",
      as: "tareaInfo"
    }
  },
  {
    $unwind: "$tareaInfo"
  },
  {
    $project: {
      estudianteId: 1,
      tareaId: 1,
      fechaEntrega: 1,
      "tareaInfo.fechaLimite": 1,
      nota: 1,
      notaFinal: {
        $cond: {
          if: { $gt: ["$fechaEntrega", "$tareaInfo.fechaLimite"] },
          then: {
            $multiply: [
              "$nota",
              { $subtract: [1, 0.1] }  // Penalización del 10% si está atrasada
            ]
          },
          else: "$nota"
        }
      }
    }
  }
]);
```

**Explicación**: Primero hacemos un `$lookup` para traer la fecha límite de la tarea. Luego usamos `$cond` para verificar si `fechaEntrega > fechaLimite`. Si está atrasada, aplicamos una penalización del 10% multiplicando la nota por 0.9. Si no está atrasada, mantenemos la nota original. Los operadores se usan dentro de `$project` o `$group`.

---

### Ejercicio A7: Calcular promedio de notas
**Solución**: Usa `$group` y `$avg` para calcular el promedio de notas de las entregas de cada estudiante.

**Sintaxis del operador:**
```javascript
{ $avg: "$nota" }  // Promedio de las notas
```

**Uso en un pipeline (ejemplo):**
```javascript
db.entregas.aggregate([
  {
    $group: {
      _id: "$estudianteId",
      promedio: { $avg: "$nota" },
      totalEntregas: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "estudiantes",
      localField: "_id",
      foreignField: "_id",
      as: "estudianteInfo"
    }
  },
  {
    $project: {
      estudianteId: "$_id",
      "estudianteInfo.nombre": 1,
      "estudianteInfo.apellido": 1,
      promedio: { $round: ["$promedio", 2] },
      totalEntregas: 1
    }
  }
]);
```

**Explicación**: Agrupamos las entregas por estudiante y calculamos el promedio de sus notas usando `$avg`. Luego hacemos un `$lookup` para traer información del estudiante y proyectamos los campos necesarios. El operador `$avg` se usa dentro de `$group`.

---

### Ejercicio A8: Calcular promedio de nota por examen
**Solución**: Usa `$divide` para calcular el promedio de notas de los exámenes de cada materia.

**Sintaxis del operador:**
```javascript
{ $divide: ["$totalNotas", "$cantidadExamenes"] }  // totalNotas / cantidadExamenes
```

**Uso en un pipeline (ejemplo):**
```javascript
db.examenes.aggregate([
  {
    $group: {
      _id: "$materiaId",
      totalNotas: { $sum: "$nota" },
      cantidadExamenes: { $sum: 1 }
    }
  },
  {
    $project: {
      materiaId: "$_id",
      cantidadExamenes: 1,
      promedio: {
        $cond: {
          if: { $eq: ["$cantidadExamenes", 0] },
          then: null,
          else: { $divide: ["$totalNotas", "$cantidadExamenes"] }
        }
      }
    }
  }
]);
```

**Explicación**: `$divide` calcula el promedio dividiendo total de notas por cantidad. Usamos `$cond` para manejar división por cero.

---

## 🎯 FASE 3: Operadores Aritméticos Avanzados

### Ejercicio A9: Identificar números pares
**Solución**: Usa `$mod` para identificar si la edad es par o impar.

**Sintaxis del operador:**
```javascript
{ $mod: ["$edad", 2] }  // edad % 2
```

**Uso en un pipeline (ejemplo):**
```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      edad: 1,
      esPar: { $eq: [{ $mod: ["$edad", 2] }, 0] }
    }
  }
]);
```

**Explicación**: `$mod` calcula el resto de la división. Si el resto es 0, entonces es par. El operador se usa dentro de `$project` o `$group`.

---

### Ejercicio A10: Agrupar por rangos de edad
**Solución**: Usa `$floor`, `$divide` y `$multiply` para agrupar por rangos de 10 años.

**Sintaxis del operador:**
```javascript
{
  $multiply: [
    { $floor: { $divide: ["$edad", 10] } },
    10
  ]
}  // floor(edad / 10) * 10
```

**Uso en un pipeline (ejemplo):**
```javascript
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      edad: 1,
      grupoEdad: {
        $multiply: [
          { $floor: { $divide: ["$edad", 10] } },
          10
        ]
      }
    }
  }
]);
```

**Explicación**: Combinamos `$divide`, `$floor` y `$multiply` para obtener rangos (0-9 → 0, 10-19 → 10, etc.).

---

### Ejercicio A11: Calcular diferencia absoluta de notas
**Solución**: Usa `$abs` y `$subtract` para calcular la diferencia absoluta entre nota y nota máxima.

**Sintaxis del operador:**
```javascript
{ $abs: { $subtract: ["$notaMaxima", "$nota"] } }  // |notaMaxima - nota|
```

**Uso en un pipeline (ejemplo):**
```javascript
db.examenes.aggregate([
  {
    $project: {
      estudianteId: 1,
      materiaId: 1,
      nota: 1,
      notaMaxima: 1,
      diferenciaAbsoluta: {
        $abs: { $subtract: ["$notaMaxima", "$nota"] }
      }
    }
  }
]);
```

**Explicación**: Combinamos `$subtract` y `$abs` para obtener la diferencia absoluta. El operador se usa dentro de `$project` o `$group`.

---

### Ejercicio A12: Calcular promedio ponderado
**Solución**: Calcula el promedio ponderado de exámenes usando peso.

**Sintaxis del operador:**
```javascript
{ $divide: ["$sumaNotaPeso", "$sumaPeso"] }  // sumaNotaPeso / sumaPeso
```

**Uso en un pipeline (ejemplo):**
```javascript
db.examenes.aggregate([
  {
    $group: {
      _id: "$estudianteId",
      sumaNotaPeso: {
        $sum: { $multiply: ["$nota", "$peso"] }
      },
      sumaPeso: { $sum: "$peso" }
    }
  },
  {
    $project: {
      estudianteId: "$_id",
      promedioPonderado: {
        $cond: {
          if: { $eq: ["$sumaPeso", 0] },
          then: null,
          else: { $divide: ["$sumaNotaPeso", "$sumaPeso"] }
        }
      }
    }
  }
]);
```

**Explicación**: `$divide` calcula el promedio ponderado. Primero agrupamos y sumamos (nota × peso) y pesos, luego dividimos.

---

### Ejercicio A13: Calcular distancia euclidiana
**Solución**: Usa `$sqrt`, `$pow` y `$add` para calcular la distancia desde el origen.

**Sintaxis del operador:**
```javascript
{
  $sqrt: {
    $add: [
      { $pow: ["$x", 2] },
      { $pow: ["$y", 2] }
    ]
  }
}  // √(x² + y²)
```

**Uso en un pipeline (ejemplo):**
```javascript
// Primero agregar coordenadas
db.estudiantes.updateMany(
  { nombre: "María" },
  { $set: { x: 3, y: 4 } }
);
db.estudiantes.updateMany(
  { nombre: "Juan" },
  { $set: { x: 5, y: 12 } }
);

// Calcular distancia
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      x: 1,
      y: 1,
      distanciaDesdeOrigen: {
        $sqrt: {
          $add: [
            { $pow: ["$x", 2] },
            { $pow: ["$y", 2] }
          ]
        }
      }
    }
  }
]);
```

**Explicación**: Combinamos `$pow`, `$add` y `$sqrt` para calcular la distancia euclidiana. Los operadores se usan dentro de `$project` o `$group`.

---

### Ejercicio A14: Redondear notas hacia arriba
**Solución**: Usa `$ceil` para redondear la nota hacia arriba.

**Sintaxis del operador:**
```javascript
{ $ceil: "$nota" }  // Redondea hacia arriba
```

**Uso en un pipeline (ejemplo):**
```javascript
db.examenes.aggregate([
  {
    $project: {
      estudianteId: 1,
      materiaId: 1,
      nota: 1,
      notaRedondeada: { $ceil: "$nota" }
    }
  }
]);
```

**Explicación**: `$ceil` redondea hacia arriba al entero más cercano (4.2 → 5, 4.8 → 5). El operador se usa dentro de `$project` o `$group`.

---

### Ejercicio A15: Calcular años completos de experiencia
**Solución**: Usa `$floor`, `$divide` y `$subtract` para calcular años completos.

**Sintaxis del operador:**
```javascript
{
  $floor: {
    $divide: [
      { $subtract: [new Date(), "$fechaIngreso"] },
      365 * 24 * 60 * 60 * 1000
    ]
  }
}  // floor((hoy - fechaIngreso) / milisegundosEnUnAño)
```

**Uso en un pipeline (ejemplo):**
```javascript
// Primero agregar fechaIngreso
db.estudiantes.updateMany(
  { nombre: "María" },
  { $set: { fechaIngreso: new Date("2020-01-15") } }
);

// Calcular años completos
db.estudiantes.aggregate([
  {
    $project: {
      nombre: 1,
      fechaIngreso: 1,
      añosExperiencia: {
        $floor: {
          $divide: [
            { $subtract: [new Date(), "$fechaIngreso"] },
            365 * 24 * 60 * 60 * 1000
          ]
        }
      }
    }
  }
]);
```

**Explicación**: Combinamos `$subtract`, `$divide` y `$floor` para calcular años completos. Los operadores se usan dentro de `$project` o `$group`.

---

### Ejercicio A16: Redondear promedio a 2 decimales
**Solución**: Usa `$round` para redondear el promedio de notas de entregas a 2 decimales.

**Sintaxis del operador:**
```javascript
{
  $round: [
    { $avg: "$nota" },
    2
  ]
}  // round(promedio, 2)
```

**Uso en un pipeline (ejemplo):**
```javascript
db.entregas.aggregate([
  {
    $group: {
      _id: "$estudianteId",
      promedio: { $avg: "$nota" }
    }
  },
  {
    $lookup: {
      from: "estudiantes",
      localField: "_id",
      foreignField: "_id",
      as: "estudianteInfo"
    }
  },
  {
    $project: {
      estudianteId: "$_id",
      "estudianteInfo.nombre": 1,
      "estudianteInfo.apellido": 1,
      promedio: {
        $round: ["$promedio", 2]
      }
    }
  }
]);
```

**Explicación**: Agrupamos las entregas por estudiante y calculamos el promedio usando `$avg`. Luego usamos `$round` para redondear el promedio a 2 decimales. Hacemos un `$lookup` para traer información del estudiante y proyectamos los campos necesarios.

---

## 🎯 FASE 4: $lookup Básico

### Ejercicio L1: Entregas con información de tarea
**Solución**: Usa `$lookup` para traer información de la tarea y del estudiante, luego `$project` para mostrar los campos solicitados.

```javascript
db.entregas.aggregate([
  {
    $lookup: {
      from: "tareas",
      localField: "tareaId",
      foreignField: "_id",
      as: "tareaInfo"
    }
  },
  {
    $lookup: {
      from: "estudiantes",
      localField: "estudianteId",
      foreignField: "_id",
      as: "estudianteInfo"
    }
  },
  {
    $project: {
      "estudianteInfo.nombre": 1,
      "estudianteInfo.apellido": 1,
      fechaEntrega: 1,
      "tareaInfo.titulo": 1,
      "tareaInfo.descripcion": 1,
      "tareaInfo.fechaLimite": 1,
      "tareaInfo.puntosMaximos": 1,
      nota: 1
    }
  }
]);
```

**Explicación**: 
1. Primer `$lookup`: Busca en la colección "tareas" documentos donde `_id` coincida con el campo `tareaId` de la entrega.
2. Segundo `$lookup`: Busca en la colección "estudiantes" documentos donde `_id` coincida con el campo `estudianteId` de la entrega.
3. `$project`: Selecciona los campos solicitados: información del estudiante (nombre, apellido), fecha de entrega y datos de la tarea (titulo, descripcion, fechaLimite, puntosMaximos).

---

### Ejercicio L2: Exámenes con información de materia
**Solución**: Usa dos `$lookup` para traer información de la materia y del estudiante, luego `$project` para mostrar los campos solicitados.

```javascript
db.examenes.aggregate([
  {
    $lookup: {
      from: "materias",
      localField: "materiaId",
      foreignField: "_id",
      as: "materiaInfo"
    }
  },
  {
    $lookup: {
      from: "estudiantes",
      localField: "estudianteId",
      foreignField: "_id",
      as: "estudianteInfo"
    }
  },
  {
    $project: {
      "estudianteInfo.nombre": 1,
      "estudianteInfo.apellido": 1,
      fecha: 1,
      "materiaInfo.nombre": 1,
      "materiaInfo.creditos": 1,
      "materiaInfo.docente": 1,
      nota: 1,
      notaMaxima: 1,
      tipo: 1
    }
  }
]);
```

**Explicación**: 
1. Primer `$lookup`: Busca en la colección "materias" documentos donde `_id` coincida con el campo `materiaId` del examen.
2. Segundo `$lookup`: Busca en la colección "estudiantes" documentos donde `_id` coincida con el campo `estudianteId` del examen.
3. `$project`: Selecciona los campos solicitados: información del estudiante (nombre, apellido), fecha del examen y datos de la materia (nombre, creditos), además de nota, notaMaxima y tipo.

---

### Ejercicio L4: Entregas con tareas básico
**Solución**: Usa `$lookup` para traer información de tareas.

```javascript
db.entregas.aggregate([
  {
    $lookup: {
      from: "tareas",
      localField: "tareaId",
      foreignField: "_id",
      as: "tareaInfo"
    }
  }
]);
```

**Explicación**: `$lookup` busca en la colección "tareas" documentos donde `_id` coincida con el campo `tareaId` de la entrega.

---

### Ejercicio L5: Exámenes con materias básico
**Solución**: Usa `$lookup` para traer información de materias.

```javascript
db.examenes.aggregate([
  {
    $lookup: {
      from: "materias",
      localField: "materiaId",
      foreignField: "_id",
      as: "materiaInfo"
    }
  }
]);
```

**Explicación**: `$lookup` busca en la colección "materias" documentos donde `_id` coincida con el campo `materiaId` del examen.

---

### Ejercicio L6: Estudiantes con materias básico
**Solución**: Usa `$lookup` para traer información de materias.

```javascript
db.estudiantes.aggregate([
  {
    $lookup: {
      from: "materias",
      localField: "materiasInscritas",
      foreignField: "_id",
      as: "materiasInfo"
    }
  }
]);
```

**Explicación**: Trae todas las materias cuyos `_id` están en el array `materiasInscritas` del estudiante.

---

## 🎯 FASE 5: $lookup con Aggregate Pipelines

### Ejercicio L7: Entregas con tareas y proyección
**Solución**: Combina `$lookup` con `$project` para mostrar información del estudiante, tarea y nota.

```javascript
db.entregas.aggregate([
  {
    $lookup: {
      from: "tareas",
      localField: "tareaId",
      foreignField: "_id",
      as: "tarea"
    }
  },
  {
    $lookup: {
      from: "estudiantes",
      localField: "estudianteId",
      foreignField: "_id",
      as: "estudiante"
    }
  },
  {
    $project: {
      "estudiante.nombre": 1,
      "estudiante.apellido": 1,
      "tarea.titulo": 1,
      "tarea.puntosMaximos": 1,
      nota: 1,
      _id: 0
    }
  }
]);
```

**Explicación**: Hacemos dos lookups: uno para traer información de la tarea y otro para traer información del estudiante. Luego proyectamos solo los campos que necesitamos: nombre y apellido del estudiante, título y puntos máximos de la tarea, y la nota.

---

### Ejercicio L8: Exámenes con materias filtrados y ordenados
**Solución**: Combina `$lookup` con `$match` y `$sort`.

```javascript
db.examenes.aggregate([
  {
    $lookup: {
      from: "materias",
      localField: "materiaId",
      foreignField: "_id",
      as: "materiaInfo"
    }
  },
  {
    $match: {
      nota: { $gte: 7 }
    }
  },
  {
    $sort: { nota: -1 }
  }
]);
```

**Explicación**: Traemos las materias, filtramos exámenes con nota >= 7, y ordenamos por nota descendente.

---

### Ejercicio L9: Promedio de notas por materia con $lookup
**Solución**: Combina `$lookup` con `$group` y `$project`.

```javascript
db.examenes.aggregate([
  {
    $lookup: {
      from: "materias",
      localField: "materiaId",
      foreignField: "_id",
      as: "materiaInfo"
    }
  },
  {
    $group: {
      _id: "$materiaId",
      promedioNota: { $avg: "$nota" },
      totalExamenes: { $sum: 1 },
      // $first: Toma el primer elemento del array. Como agrupamos por materiaId,
      // todos los documentos del grupo tienen la misma materiaInfo, así que tomamos el primero.
      materiaInfo: { $first: "$materiaInfo" }
    }
  },
  {
    $project: {
      // $arrayElemAt: Extrae un elemento de un array en una posición específica.
      // ["$materiaInfo.nombre", 0] obtiene el primer elemento (índice 0) del array de nombres.
      // Como $lookup devuelve un array, necesitamos extraer el primer elemento para obtener el nombre.
      materia: { $arrayElemAt: ["$materiaInfo.nombre", 0] },
      promedioNota: { $round: ["$promedioNota", 2] },
      totalExamenes: 1,
      _id: 0
    }
  },
  {
    $sort: { promedioNota: -1 }
  }
]);
```

**Explicación**: 
1. `$lookup`: Traemos la información de las materias para cada examen
2. `$group`: Agrupamos por `materiaId` y calculamos:
   - `promedioNota`: Promedio de todas las notas de esa materia
   - `totalExamenes`: Cantidad de exámenes
   - `materiaInfo`: Usamos `$first` para tomar el primer elemento del array (todos los documentos del grupo tienen la misma materia)
3. `$project`: Formateamos el resultado:
   - `materia`: Usamos `$arrayElemAt` para extraer el nombre de la materia del array (índice 0)
   - `promedioNota`: Redondeamos a 2 decimales
   - `totalExamenes`: Mantenemos el total
4. `$sort`: Ordenamos por promedio descendente

---

### Ejercicio L10: Top 5 estudiantes con mejor promedio de entregas
**Solución**: Combina `$group`, `$sort` y `$limit` para calcular el promedio de entregas por estudiante.

```javascript
db.entregas.aggregate([
  {
    $group: {
      _id: "$estudianteId",
      promedioNota: { $avg: "$nota" },
      totalEntregas: { $sum: 1 }
    }
  },
  {
    $sort: { promedioNota: -1 }
  },
  {
    $limit: 5
  }
]);
```

**Explicación**: Agrupamos las entregas por estudiante, calculamos el promedio de notas usando `$avg`, ordenamos por promedio descendente y limitamos a los top 5 estudiantes.

---

### Ejercicio L11: Contar estudiantes con más de 10 créditos
**Solución**: Combina `$lookup` con `$project`, `$match` y `$count`.

```javascript
db.estudiantes.aggregate([
  {
    $lookup: {
      from: "materias",
      localField: "materiasInscritas",
      foreignField: "_id",
      as: "materiasInfo"
    }
  },
  {
    $project: {
      nombre: 1,
      totalCreditos: {
        $sum: "$materiasInfo.creditos"
      }
    }
  },
  {
    $match: {
      totalCreditos: { $gte: 10 }
    }
  },
  {
    $count: "estudiantesConCreditos"
  }
]);
```

**Explicación**: Traemos las materias, calculamos total de créditos, filtramos estudiantes con >= 10 créditos, y contamos.

---

## 📊 Resumen de Ejercicios por Fase

| Fase | Tema | Cantidad | Nivel |
|------|------|----------|-------|
| FASE 1 | Pipeline Básico ($sort, $limit, $count) | 6 | Intermedio |
| FASE 2 | Operadores Aritméticos Básicos | 8 | Intermedio |
| FASE 3 | Operadores Aritméticos Avanzados | 8 | Avanzado |
| FASE 4 | $lookup Básico | 5 | Intermedio-Avanzado |
| FASE 5 | $lookup con Aggregate Pipelines | 5 | Avanzado |
| **TOTAL** | | **32** | |

---

## 🎓 Guía de Uso para el Docente

### Orden Sugerido de Ejecución

1. **FASE 1**: Comenzar con pipeline básico ($sort, $limit, $count) - continúa de la clase anterior
2. **FASE 2**: Introducir operadores aritméticos básicos (solo sintaxis, sin aggregate completo)
3. **FASE 3**: Avanzar a operadores aritméticos avanzados
4. **FASE 4**: Introducir $lookup básico
5. **FASE 5**: Combinar $lookup con pipelines para cerrar el tema

### Puntos Clave a Enfatizar

- Los operadores aritméticos se usan dentro de `$project` o `$group`, pero aquí se ven de forma aislada para entender su sintaxis
- El orden de las etapas en el pipeline es crucial
- `$lookup` siempre devuelve un array y se puede combinar con otras etapas del pipeline
- Manejar casos especiales (división por cero, valores nulos)

---

## ✅ Checklist de Aprendizaje

Al finalizar estos ejercicios, el estudiante debe poder:

- [ ] Usar todos los operadores aritméticos básicos ($add, $subtract, $multiply, $divide)
- [ ] Usar operadores aritméticos avanzados ($mod, $abs, $pow, $sqrt, $ceil, $floor, $round, $trunc)
- [ ] Ordenar documentos con $sort
- [ ] Limitar resultados con $limit
- [ ] Contar documentos con $count
- [ ] Combinar múltiples etapas en un pipeline
- [ ] Usar $lookup para combinar datos de múltiples colecciones
- [ ] Manejar casos especiales (división por cero, arrays vacíos)

---

## 📚 Recursos Adicionales

- [Documentación oficial de MongoDB - Operadores Aritméticos](https://www.mongodb.com/docs/manual/reference/operator/aggregation/#arithmetic-expression-operators)
- [Documentación oficial de MongoDB - Aggregation Pipeline](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)
- [Documentación oficial de MongoDB - $lookup](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/)
