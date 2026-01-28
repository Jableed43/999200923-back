-- Ver inscripciones con nombres de estudiantes y materias. Fecha de inscripcion y nota de inscripcion si la hay.
-- Inner join -> Trae solo las coincidencias entre las tablas involucradas
-- Devuelve las coincidencias entre las tablas
-- Si un estudiante no tiene inscripciones no aparece
-- Si una materia no tiene estudiantes no aparece

SELECT estudiantes.nombre, estudiantes.apellido, materias.nombre, inscripciones.fecha_inscripcion, inscripciones.nota
FROM inscripciones
-- Uno inscripciones con estudiantes. El ON indica que datos se relacionan.  
-- FROM "A" INNER JOIN "B" ON "A.B_FK" = "B.B_PK"
-- Cada inner join que se añada se sigue relacionando con el FROM original
INNER JOIN estudiantes ON inscripciones.idEstudiantes = estudiantes.idEstudiantes
INNER JOIN materias ON inscripciones.idMaterias = materias.idMaterias


----------------

-- Left join
-- Devuelve todos los registros de la tabla izquierda aunque no tenga coincidencias con la tabla derecha
-- Nos sirve para: Ver estudiantes sin inscripciones / Materias sin estudiantes

-- Ver todos estudiantes (incluso si no tienen materias) y sus materias
-- Como usar un alias: tabla.columna AS nuevo_nombre
SELECT estudiantes.nombre, estudiantes.apellido, materias.nombre AS materia_nombre
FROM estudiantes
LEFT JOIN inscripciones ON estudiantes.idEstudiantes = inscripciones.idEstudiantes
LEFT JOIN materias ON inscripciones.idMaterias = materias.idMaterias

----------------

-- Left join
-- Queremos ver materias sin estudiantes inscriptos

SELECT materias.nombre, materias.codigo, inscripciones.idInscripciones from materias
LEFT JOIN inscripciones ON materias.idMaterias = inscripciones.idMaterias
-- Queremos saber cales materias no tienen inscripciones de estudiantes
WHERE inscripciones.idInscripciones IS NULL

-- Mismo caso con Right Join, mismo resultado
SELECT materias.nombre, materias.codigo, inscripciones.idInscripciones from inscripciones
RIGHT JOIN materias ON inscripciones.idMaterias = materias.idMaterias
-- Queremos saber cales materias no tienen inscripciones de estudiantes
WHERE inscripciones.idInscripciones IS NULL

----------------

