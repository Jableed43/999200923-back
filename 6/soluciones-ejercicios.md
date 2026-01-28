-- Estudiantes ordenados por apellido de forma ASCENDENTE
-- Si es de forma ascendente no hace falta aclararlo, siempre order by ordena de forma ascendente
select * from estudiantes
ORDER BY estudiantes.apellido ASC

-- Estudiantes ordenados por apellido de forma DESCENDENTE
select * from estudiantes
ORDER BY estudiantes.apellido DESC

-- Estudiantes mayores de 21 años
select * from estudiantes
where edad > 21

-- Estudiantes con edad entre 20 y 25 años incluyendo 20 y 25

select * from estudiantes
where edad between 20 and 25

select * from estudiantes
where edad >= 20 and edad <= 25

-- Materias con código que empieza con "PROG"
select * from materias
where codigo LIKE "PROG%"

-- Estudiantes con email de Gmail
select * from estudiantes
where email LIKE "%gmail%"

-- Escribe una consulta usando INNER JOIN que muestre:
-- Nombre y apellido del estudiante
-- Nombre de la materia
-- Código de la materia
-- Créditos de la materia
-- Fecha de inscripción
-- Nota

select estudiantes.nombre, estudiantes.apellido, materias.nombre as nombre_materia, materias.codigo, materias.creditos, inscripciones.fecha_inscripcion,
inscripciones.nota from inscripciones 
inner join materias on inscripciones.idMaterias = materias.idMaterias
inner join estudiantes on inscripciones.idEstudiantes = estudiantes.idEstudiantes


-- Estudiantes con promedio de notas
--  Escribe una consulta que calcule el promedio de notas de cada estudiante que tiene al menos una nota. Muestra:
-- Nombre y apellido del estudiante
-- Edad
-- Cantidad de materias con nota
-- Promedio de notas

-- COUNT y AVG son funciones de agregacion, sirven para agrupar datos. 
-- Los podemos agrupar por id's, nombres, apellidos, edad u otros datos
-- al usar funciones de agregacion estamos obligados a usar group by
-- Para calcular una cantidad COUNT
-- Para calcular promedio AVG
select estudiantes.nombre, estudiantes.apellido, estudiantes.edad, count(inscripciones.nota) AS cantidad_materias,
ROUND(AVG(inscripciones.nota), 2) AS promedio_notas
from estudiantes
inner join inscripciones on estudiantes.idEstudiantes = inscripciones.idEstudiantes
-- validamos que la nota no sea nula
where inscripciones.nota IS NOT NULL
group by estudiantes.idEstudiantes, estudiantes.nombre, estudiantes.apellido, estudiantes.edad

-- Si no usamos group by obtenemos un solo valor
SELECT
	COUNT(*) AS total_inscripciones,
    COUNT(inscripciones.nota) AS inscripciones_con_nota,
    AVG(inscripciones.nota) AS promedio_notas,
    MAX(inscripciones.nota) AS nota_maxima,
    MIN(nota) AS nota_minima
from inscripciones