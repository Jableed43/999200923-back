-- ============================================
-- COMISIÓN 923 - PASO 2: Crear Tabla Inscripciones
-- ============================================
-- Objetivo: Crear tabla intermedia para relación N:M
--          Con ON DELETE CASCADE para estudiantes
--          Con ON DELETE RESTRICT para materias
--
-- LISTO PARA COPIAR Y PEGAR EN MYSQL WORKBENCH

USE `escuela`;

-- ============================================
-- EXPLICACIÓN: ON DELETE CASCADE vs RESTRICT
-- ============================================
-- 
-- ON DELETE RESTRICT (por defecto):
--   - NO permite eliminar un registro padre si tiene hijos que lo referencian
--   - La eliminación falla con error
--   - No se elimina nada, no quedan datos NULL ni huérfanos
--   - Garantiza integridad referencial
--   - Ejemplo: No puedes eliminar una materia si tiene inscripciones
--
-- ON DELETE CASCADE:
--   - Permite eliminar el registro padre
--   - Elimina AUTOMÁTICAMENTE todos los registros hijos que lo referencian
--   - Útil cuando los hijos no tienen sentido sin el padre
--   - Ejemplo: Al eliminar un estudiante, se eliminan todas sus inscripciones
--
-- ON DELETE SET NULL:
--   - Permite eliminar el registro padre
--   - Establece la clave foránea en NULL en los registros hijos
--   - Requiere que la columna permita NULL
--   - Puede dejar datos huérfanos
--
-- En nuestro caso:
--   - Estudiantes → CASCADE: Si eliminas un estudiante, elimina sus inscripciones
--   - Materias → RESTRICT: No puedes eliminar una materia si tiene inscripciones
--     (tiene sentido porque la materia puede seguir existiendo sin ese estudiante)

-- Crear tabla inscripciones con claves foráneas y CASCADE
CREATE TABLE `inscripciones` (
  `idinscripcion` INT(11) NOT NULL AUTO_INCREMENT,
  `idEstudiantes` INT(11) NOT NULL,
  `idMaterias` INT(11) NOT NULL,
  `fecha_inscripcion` DATE NOT NULL,
  `nota` DECIMAL(4,2) DEFAULT NULL,
  PRIMARY KEY (`idinscripcion`),
  -- CASCADE: Si eliminas un estudiante, se eliminan automáticamente sus inscripciones
  CONSTRAINT `fk_inscripciones_estudiantes` 
    FOREIGN KEY (`idEstudiantes`) 
    REFERENCES `estudiantes`(`idEstudiantes`) 
    ON DELETE CASCADE,
  -- RESTRICT: No puedes eliminar una materia si tiene inscripciones
  CONSTRAINT `fk_inscripciones_materias` 
    FOREIGN KEY (`idMaterias`) 
    REFERENCES `materias`(`idMaterias`) 
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Verificar que la tabla se creó correctamente
DESCRIBE inscripciones;

-- Ver las relaciones creadas con sus reglas de eliminación
SELECT 
    kcu.CONSTRAINT_NAME,
    kcu.TABLE_NAME,
    kcu.COLUMN_NAME,
    kcu.REFERENCED_TABLE_NAME,
    kcu.REFERENCED_COLUMN_NAME,
    rc.DELETE_RULE
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu
JOIN INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS rc 
    ON kcu.CONSTRAINT_NAME = rc.CONSTRAINT_NAME
WHERE kcu.TABLE_SCHEMA = 'escuela' 
  AND kcu.TABLE_NAME = 'inscripciones'
  AND kcu.REFERENCED_TABLE_NAME IS NOT NULL;

-- ============================================
-- PROBAR CASCADE (Opcional - descomentar para probar)
-- ============================================
/*
-- Ver inscripciones del estudiante 1 antes de eliminar
SELECT * FROM inscripciones WHERE idEstudiantes = 1;

-- Eliminar estudiante 1
DELETE FROM estudiantes WHERE idEstudiantes = 1;

-- Verificar que las inscripciones se eliminaron automáticamente
SELECT * FROM inscripciones WHERE idEstudiantes = 1;
-- Debe estar vacío (las inscripciones se eliminaron con CASCADE)
*/

