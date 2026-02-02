# Actividades Prácticas Simplificadas - Clase 3: Consultas Avanzadas

**Base de datos**: `escuela`  
**Duración total**: 60-90 minutos  
**Versión**: Simplificada (solo ejercicios esenciales)

> 💡 **Nota**: Esta es una versión simplificada con ejercicios básicos.

---

## 🎯 Actividad 1: HAVING Básico (20 min)

### Ejercicio 1.1: Materias Populares
**Problema**: Encontrar materias con más de 5 estudiantes inscritos.

```sql
USE escuela;

-- Tu consulta aquí
-- Pista: Agrupa por materia y cuenta estudiantes, luego filtra con HAVING
```

**Resultado esperado**: Materias con nombre, código y cantidad de estudiantes.

---

### Ejercicio 1.2: Estudiantes Destacados
**Problema**: Encontrar estudiantes con promedio mayor a 8.

```sql
-- Tu consulta aquí
-- Pista: Agrupa por estudiante, calcula promedio, filtra con HAVING
```

**Resultado esperado**: Estudiantes con nombre, apellido y promedio.

---

## 🎯 Actividad 2: Subconsultas Básicas (20 min)

### Ejercicio 2.1: Estudiantes por Encima del Promedio
**Problema**: Encontrar estudiantes cuyo promedio sea mayor al promedio general.

```sql
-- Tu consulta aquí
-- Pista: Usa una subconsulta para calcular el promedio general
```

**Resultado esperado**: Estudiantes con su promedio personal.

---

### Ejercicio 2.2: Estudiantes en Materias PROG
**Problema**: Encontrar estudiantes inscritos en materias cuyo código empiece con "PROG".

```sql
-- Tu consulta aquí
-- Pista: Usa IN con una subconsulta que encuentre IDs de materias PROG
```

**Resultado esperado**: Lista de estudiantes únicos.

---

## 🎯 Actividad 3: CASE WHEN Básico (15 min)

### Ejercicio 3.1: Clasificar Notas
**Problema**: Clasificar inscripciones según su nota:
- "Aprobado" si nota >= 7
- "Desaprobado" si nota < 7 y nota IS NOT NULL
- "En Curso" si nota IS NULL

```sql
-- Tu consulta aquí
-- Pista: Usa CASE WHEN para clasificar
```

**Resultado esperado**: Inscripciones con estudiante, materia, nota y estado.

---

### Ejercicio 3.2: Clasificar Promedios
**Problema**: Clasificar estudiantes según su promedio:
- "Excelente" si promedio >= 9
- "Bueno" si promedio >= 7
- "Regular" si promedio >= 6
- "Necesita Apoyo" si promedio < 6

```sql
-- Tu consulta aquí
```

**Resultado esperado**: Estudiantes con nombre, promedio y clasificación.

---

## 🎯 Actividad 4: UNION Básico (10 min)

### Ejercicio 4.1: Lista Unificada
**Problema**: Crear una lista que combine estudiantes y docentes.

```sql
-- Tu consulta aquí
-- Pista: Primera consulta estudiantes, segunda docentes, luego UNION
```

**Resultado esperado**: Lista unificada con nombre completo, email y tipo.

---

## 🎯 Actividad 5: Funciones de Fecha y Texto (15 min)

### Ejercicio 5.1: Nombre Completo
**Problema**: Mostrar estudiantes con nombre completo formateado.

```sql
-- Tu consulta aquí
-- Pista: Usa CONCAT para unir nombre y apellido
```

**Resultado esperado**: Estudiantes con nombre completo.

---

### Ejercicio 5.2: Formatear Fechas
**Problema**: Mostrar inscripciones con fecha formateada (dd/mm/yyyy).

```sql
-- Tu consulta aquí
-- Pista: Usa DATE_FORMAT con formato '%d/%m/%Y'
```

**Resultado esperado**: Inscripciones con fecha formateada.

---

## 📋 Checklist de Verificación

Antes de considerar completados los ejercicios, verifica:

- [ ] Todas las consultas ejecutan sin errores
- [ ] Los resultados tienen sentido
- [ ] Se usan alias descriptivos
- [ ] Las consultas están ordenadas

---

## 💡 Pistas Rápidas

### Para HAVING:
- Siempre va después de GROUP BY
- Puedes usar COUNT, AVG, SUM en HAVING
- No puedes usar funciones de agregación en WHERE

### Para Subconsultas:
- Se ejecutan primero
- Escalares devuelven un solo valor
- Con IN devuelven múltiples valores

### Para CASE WHEN:
- Siempre termina con END
- Se evalúa de arriba hacia abajo
- Usa ELSE para casos por defecto

### Para UNION:
- Mismo número de columnas
- ORDER BY solo al final

---

**Soluciones**: Ver [SOLUCIONES-Actividades-Clase-3-Escuela-SIMPLIFICADA.md](./SOLUCIONES-Actividades-Clase-3-Escuela-SIMPLIFICADA.md)  
**Versión Completa**: [Actividades-Clase-3-Escuela.md](./Actividades-Clase-3-Escuela.md)
