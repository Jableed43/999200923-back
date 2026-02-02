-- ============================================
-- COMISIÓN 923 - PASO 4: Agregar Tabla Docentes
-- ============================================
-- Objetivo: Crear tabla docentes y relacionarla con materias
--          Relación 1:N: Un docente puede dictar muchas materias
--          
-- IMPORTANTE: Ejecutar después de paso1, paso2 y paso3
--             Este script añade la tabla docentes y actualiza materias
--
-- LISTO PARA COPIAR Y PEGAR EN MYSQL WORKBENCH

USE `escuela`;

-- ============================================
-- CREAR TABLA DOCENTES
-- ============================================

CREATE TABLE IF NOT EXISTS `docentes` (
  `idDocentes` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `especialidad` VARCHAR(100) DEFAULT NULL,
  `fecha_ingreso` DATE DEFAULT NULL,
  PRIMARY KEY (`idDocentes`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ============================================
-- INSERTAR DOCENTES DE EJEMPLO
-- ============================================

INSERT INTO `docentes` (`nombre`, `apellido`, `email`, `especialidad`, `fecha_ingreso`) VALUES
('Carlos', 'García', 'carlos.garcia@escuela.edu', 'Programación', '2020-01-15'),
('María', 'López', 'maria.lopez@escuela.edu', 'Base de Datos', '2019-03-20'),
('Juan', 'Martínez', 'juan.martinez@escuela.edu', 'Algoritmos', '2021-02-10'),
('Ana', 'Rodríguez', 'ana.rodriguez@escuela.edu', 'Matemática', '2018-09-01'),
('Pedro', 'Fernández', 'pedro.fernandez@escuela.edu', 'Redes', '2020-06-15'),
('Laura', 'Sánchez', 'laura.sanchez@escuela.edu', 'Seguridad', '2021-08-20'),
('Roberto', 'González', 'roberto.gonzalez@escuela.edu', 'Inteligencia Artificial', '2022-01-10'),
('Sofía', 'Pérez', 'sofia.perez@escuela.edu', 'Desarrollo Web', '2019-11-05'),
('Diego', 'Torres', 'diego.torres@escuela.edu', 'Ingeniería de Software', '2020-04-12'),
('Carmen', 'Ruiz', 'carmen.ruiz@escuela.edu', 'Idiomas', '2018-02-28');

-- ============================================
-- AGREGAR COLUMNA DOCENTE_ID A MATERIAS
-- ============================================

-- Agregar columna docente_id a la tabla materias
ALTER TABLE `materias`
ADD COLUMN `docente_id` INT(11) DEFAULT NULL AFTER `codigo`;

-- Agregar clave foránea
ALTER TABLE `materias`
ADD CONSTRAINT `fk_materias_docente`
FOREIGN KEY (`docente_id`) 
REFERENCES `docentes`(`idDocentes`)
ON DELETE SET NULL;

-- ============================================
-- ASIGNAR DOCENTES A MATERIAS
-- ============================================

-- Asignar docentes a materias existentes según su especialidad
-- Docente 1 (Carlos García) - Programación
UPDATE `materias` SET `docente_id` = 1 WHERE `codigo` LIKE 'PROG%';

-- Docente 2 (María López) - Base de Datos
UPDATE `materias` SET `docente_id` = 2 WHERE `codigo` LIKE 'BD%' OR `codigo` LIKE 'DB%';

-- Docente 3 (Juan Martínez) - Algoritmos y Estructuras
UPDATE `materias` SET `docente_id` = 3 WHERE `codigo` LIKE 'ALG%' OR `codigo` LIKE 'ED%';

-- Docente 4 (Ana Rodríguez) - Matemática
UPDATE `materias` SET `docente_id` = 4 WHERE `codigo` LIKE 'MAT%' OR `nombre` LIKE '%Matemática%';

-- Docente 5 (Pedro Fernández) - Redes y Sistemas
UPDATE `materias` SET `docente_id` = 5 WHERE `codigo` LIKE 'RED%' OR `codigo` LIKE 'SO%';

-- Docente 6 (Laura Sánchez) - Seguridad
UPDATE `materias` SET `docente_id` = 6 WHERE `codigo` LIKE 'SI%' OR `nombre` LIKE '%Seguridad%';

-- Docente 7 (Roberto González) - Inteligencia Artificial
UPDATE `materias` SET `docente_id` = 7 WHERE `codigo` LIKE 'IA%' OR `nombre` LIKE '%Inteligencia%';

-- Docente 8 (Sofía Pérez) - Desarrollo Web
UPDATE `materias` SET `docente_id` = 8 WHERE `codigo` LIKE 'PW%' OR `codigo` LIKE 'WEB%';

-- Docente 9 (Diego Torres) - Ingeniería de Software
UPDATE `materias` SET `docente_id` = 9 WHERE `codigo` LIKE 'IS%' OR `nombre` LIKE '%Ingeniería%';

-- Docente 10 (Carmen Ruiz) - Idiomas y otros
UPDATE `materias` SET `docente_id` = 10 WHERE `codigo` LIKE 'ING%' OR `codigo` LIKE 'COM%';

-- Asignar docentes restantes a materias sin docente (distribución)
UPDATE `materias` 
SET `docente_id` = 1 
WHERE `docente_id` IS NULL AND `idMaterias` % 3 = 0;

UPDATE `materias` 
SET `docente_id` = 2 
WHERE `docente_id` IS NULL AND `idMaterias` % 3 = 1;

UPDATE `materias` 
SET `docente_id` = 3 
WHERE `docente_id` IS NULL AND `idMaterias` % 3 = 2;