# Ejercicios Prácticos - Clase 3: Operadores Aritméticos y Pipeline Básico
## Consignas para Estudiantes

**Base de Datos**: `escuela`  
**Colecciones**: `estudiantes`, `materias`, `examenes`, `faltas`, `tareas`, `entregas`

> **Nota**: Este archivo contiene las consignas de los ejercicios. Las soluciones están disponibles en `Clase-3-Ejercicios-Practicos.md`.

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

### Referencias
- [📊 Resumen de Ejercicios por Fase](#-resumen-de-ejercicios-por-fase)
- [✅ Checklist de Verificación](#-checklist-de-verificación)
- [💡 Consejos](#-consejos)

### Archivos Relacionados
- 📖 [Material Teórico](./Clase-3-Aggregation-Pipeline-Avanzado.md)
- ✅ [Ejercicios - Soluciones](./Clase-3-Ejercicios-Practicos.md)

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
    fechaEntrega: new Date("2025-02-15"),
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
Usa `$sort` para ordenar los estudiantes por edad de menor a mayor.

### Ejercicio P2: Ordenar por múltiples campos
Usa `$sort` para ordenar estudiantes primero por ciudad (ascendente) y luego por edad (descendente).

### Ejercicio P3: Top 3 estudiantes más jóvenes
Usa `$sort` y `$limit` para obtener los 3 estudiantes más jóvenes.

### Ejercicio P4: Contar estudiantes activos
Usa `$match` y `$count` para contar cuántos estudiantes están activos.

### Ejercicio P5: Contar ciudades diferentes
Usa `$group` y `$count` para contar cuántas ciudades diferentes hay entre los estudiantes.

### Ejercicio P6: Top 5 exámenes con mejor nota
Usa `$sort` y `$limit` para obtener los 5 exámenes con mejor nota.

---

## 🎯 FASE 2: Operadores Aritméticos Básicos

### Ejercicio A1: Calcular edad en 10 años
Usa `$add` para calcular la edad que tendrán los estudiantes en 10 años. Muestra nombre, edad actual y edad futura.

### Ejercicio A2: Calcular nota final con bono
Usa `$add` para calcular la nota final de un examen sumando la nota base y un bono fijo de 2 puntos adicionales.

### Ejercicio A3: Calcular diferencia de créditos
Usa `$subtract` para calcular cuántos créditos le faltan a cada materia para llegar a 6 créditos (asumiendo que todas deben tener 6).

### Ejercicio A4: Calcular diferencia de nota
Usa `$subtract` para calcular la diferencia entre la nota máxima y la nota obtenida en cada examen.

### Ejercicio A5: Calcular porcentaje de nota
Usa `$multiply` y `$divide` para calcular el porcentaje del promedio de notas obtenido por cada estudiante (asumiendo nota máxima de 10).

### Ejercicio A6: Calcular nota con penalización
Usa `$lookup` para traer la fecha límite de la tarea, luego `$cond` y `$multiply` para aplicar una penalización del 10% solo si la entrega está atrasada (fechaEntrega > fechaLimite).

### Ejercicio A7: Calcular promedio de notas
Usa `$group` y `$avg` para calcular el promedio de notas de las entregas de cada estudiante.

### Ejercicio A8: Calcular promedio de nota por examen
Usa `$divide` para calcular el promedio de notas de los exámenes de cada materia (suma de notas / cantidad de exámenes). Asegúrate de manejar la división por cero.

---

## 🎯 FASE 3: Operadores Aritméticos Avanzados

### Ejercicio A9: Identificar números pares
Usa `$mod` para identificar si la edad de cada estudiante es par o impar.

### Ejercicio A10: Agrupar por rangos de edad
Usa `$floor`, `$divide` y `$multiply` para agrupar estudiantes por rangos de 10 años (0-9, 10-19, 20-29, etc.).

### Ejercicio A11: Calcular diferencia absoluta de notas
Usa `$abs` y `$subtract` para calcular la diferencia absoluta entre la nota obtenida y la nota máxima en cada examen.

### Ejercicio A12: Calcular promedio ponderado
Usa `$multiply` y `$divide` para calcular el promedio ponderado de exámenes. Considera que cada examen tiene un peso (campo `peso`) y calcula: suma(nota × peso) / suma(peso).

### Ejercicio A13: Calcular distancia euclidiana
Usa `$sqrt`, `$pow` y `$add` para calcular la distancia desde el origen (0,0) de puntos con coordenadas x e y. Agrega campos x e y a algunos estudiantes como ejemplo.

### Ejercicio A14: Redondear notas hacia arriba
Usa `$ceil` para redondear la nota de cada examen hacia arriba al entero más cercano.

### Ejercicio A15: Calcular años completos de experiencia
Usa `$floor` y `$divide` para calcular los años completos desde la fecha de ingreso (agrega un campo fechaIngreso a algunos estudiantes).

### Ejercicio A16: Redondear promedio a 2 decimales
Usa `$round` para redondear el promedio de notas de entregas de cada estudiante a 2 decimales.

---

## 🎯 FASE 4: $lookup Básico

### Ejercicio L1: Entregas con información de tarea
Usa `$lookup` para traer la información de la tarea en cada entrega. Muestra estudiante, fecha de entrega y datos de la tarea.

### Ejercicio L2: Exámenes con información de materia
Usa `$lookup` para traer la información de la materia en cada examen. Muestra estudiante, fecha y datos de la materia.

### Ejercicio L4: Entregas con tareas básico
Usa `$lookup` para traer la información de la tarea en cada entrega. Muestra todos los campos de la entrega y la información de la tarea.

### Ejercicio L5: Exámenes con materias básico
Usa `$lookup` para traer la información de la materia en cada examen. Muestra todos los campos del examen y la información de la materia.

### Ejercicio L6: Estudiantes con materias básico
Usa `$lookup` para traer la información de las materias en las que está inscrito cada estudiante. Muestra todos los campos del estudiante y las materias.

---

## 🎯 FASE 5: $lookup con Aggregate Pipelines

### Ejercicio L7: Entregas con tareas y proyección
Usa `$lookup` para traer tareas y estudiantes, luego `$project` para mostrar solo nombre y apellido del estudiante, título de la tarea y puntos máximos.

### Ejercicio L8: Exámenes con materias filtrados y ordenados
Usa `$lookup` para traer materias, luego `$match` para filtrar exámenes con nota >= 7, y `$sort` para ordenar por nota descendente.

### Ejercicio L9: Promedio de notas por materia con $lookup
Usa `$lookup` para traer materias, luego `$group` para calcular el promedio de notas por materia, y `$project` para formatear el resultado.

### Ejercicio L10: Top 5 estudiantes con mejor promedio de entregas
Usa `$group` para calcular el promedio de notas por estudiante, `$sort` para ordenar y `$limit` para obtener top 5.

### Ejercicio L11: Contar estudiantes con más de 10 créditos
Usa `$lookup` para traer materias, `$project` para calcular total de créditos, `$match` para filtrar estudiantes con más de 10 créditos, y `$count` para contar.

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

## ✅ Checklist de Verificación

Antes de entregar, verifica que:

- [ ] Todos los ejercicios de FASE 1 (Pipeline Básico) están completos
- [ ] Todos los ejercicios de FASE 2 (Operadores Aritméticos Básicos) están completos
- [ ] Todos los ejercicios de FASE 3 (Operadores Aritméticos Avanzados) están completos
- [ ] Todos los ejercicios de FASE 4 ($lookup Básico) están completos
- [ ] Todos los ejercicios de FASE 5 ($lookup con Pipelines) están completos
- [ ] Los operadores aritméticos se usan correctamente
- [ ] Los pipelines están bien estructurados
- [ ] Los `$lookup` funcionan correctamente
- [ ] Los resultados son los esperados

---

## 💡 Consejos

1. **Operadores Aritméticos**: Estos operadores se usan dentro de `$project` o `$group`, pero aquí los vemos de forma aislada para entender su sintaxis.

2. **Orden de las etapas**: En los pipelines, el orden importa. `$match` debe ir temprano, `$sort` antes de `$limit`.

3. **$lookup**: Siempre devuelve un array, incluso si encuentra solo un documento. Puedes combinarlo con otras etapas del pipeline para crear consultas más complejas.

4. **Manejo de errores**: Usa `$cond` para manejar divisiones por cero o valores nulos.

5. **Prueba paso a paso**: Construye los pipelines gradualmente, añadiendo etapas una por una.

---

## 📚 Recursos Adicionales

- [Documentación oficial de MongoDB - Operadores Aritméticos](https://www.mongodb.com/docs/manual/reference/operator/aggregation/#arithmetic-expression-operators)
- [Documentación oficial de MongoDB - Aggregation Pipeline](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)
- [Documentación oficial de MongoDB - $lookup](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/)
