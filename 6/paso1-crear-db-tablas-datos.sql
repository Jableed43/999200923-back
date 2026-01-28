-- ============================================
-- COMISIÓN 923 - PASO 1: Crear DB y Tablas
-- ============================================
-- Objetivo: Crear base de datos, tablas estudiantes y materias
--          con 30 estudiantes y 30 materias para practicar
--          
-- IMPORTANTE: Este script incluye primero los datos originales de la clase anterior
--             (Facundo, Sofia, Javier, Juan, María, Carlos, Ana y las 4 materias originales)
--             Luego añade más datos hasta llegar a 30 estudiantes y 30 materias
--
-- LISTO PARA COPIAR Y PEGAR EN MYSQL WORKBENCH

CREATE DATABASE IF NOT EXISTS `escuela` 
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE `escuela`;

-- Eliminar tablas si existen (para empezar limpio)
DROP TABLE IF EXISTS `inscripciones`;
DROP TABLE IF EXISTS `estudiantes`;
DROP TABLE IF EXISTS `materias`;

-- Crear tabla estudiantes
CREATE TABLE `estudiantes` (
  `idEstudiantes` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `edad` INT(11) DEFAULT NULL,
  `fecha_ingreso` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idEstudiantes`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Crear tabla materias
CREATE TABLE `materias` (
  `idMaterias` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `codigo` VARCHAR(20) DEFAULT NULL,
  `creditos` INT(11) DEFAULT NULL,
  PRIMARY KEY (`idMaterias`),
  UNIQUE KEY `codigo` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertar estudiantes (primero los originales, luego más hasta llegar a 30)
INSERT INTO `estudiantes` (`nombre`, `apellido`, `email`, `edad`) VALUES
-- Estudiantes originales de la clase anterior
('Facundo', 'Schemberger', 'facuSchem@gmail.com', 23),
('Sofia', 'Bustamante', 'sofiaBustamante@gmail.com', 25),
('Javier', 'Lopez', 'jlopez@gmail.com', 33),
('Juan', 'Pérez', 'juan@email.com', 20),
('María', 'González', 'maria@email.com', 22),
('Carlos', 'López', 'carlos@email.com', 19),
('Ana', 'Martínez', 'ana@email.com', 21),
-- Estudiantes adicionales para llegar a 30
('Pedro', 'Sánchez', 'pedro@email.com', 20),
('Laura', 'Fernández', 'laura@email.com', 23),
('Roberto', 'García', 'roberto@email.com', 24),
('Carmen', 'Rodríguez', 'carmen@email.com', 19),
('Miguel', 'Torres', 'miguel@email.com', 22),
('Elena', 'Ramírez', 'elena@email.com', 21),
('David', 'Flores', 'david@email.com', 20),
('Patricia', 'Morales', 'patricia@email.com', 25),
('Fernando', 'Rivera', 'fernando@email.com', 23),
('Isabel', 'Ortiz', 'isabel@email.com', 22),
('Ricardo', 'Vargas', 'ricardo@email.com', 24),
('Mónica', 'Castro', 'monica@email.com', 21),
('Alejandro', 'Reyes', 'alejandro@email.com', 20),
('Gabriela', 'Jiménez', 'gabriela@email.com', 23),
('Daniel', 'Herrera', 'daniel@email.com', 22),
('Natalia', 'Ruiz', 'natalia@email.com', 21),
('Andrés', 'Díaz', 'andres@email.com', 24),
('Claudia', 'Moreno', 'claudia@email.com', 20),
('Jorge', 'Álvarez', 'jorge@email.com', 23),
('Verónica', 'Gutiérrez', 'veronica@email.com', 22),
('Luis', 'Silva', 'luis@email.com', 21),
('Paula', 'Romero', 'paula@email.com', 24),
('Diego', 'Navarro', 'diego@email.com', 20);

-- Insertar materias (primero las originales, luego más hasta llegar a 30)
INSERT INTO `materias` (`nombre`, `codigo`, `creditos`) VALUES
-- Materias originales de la clase anterior
('Programación I', 'PROG1', 4),
('Base de Datos', 'BD1', 3),
('Matemática', 'MAT1', 5),
('Inglés', 'ING1', 2),
-- Materias adicionales para llegar a 30
('Programación II', 'PROG2', 4),
('Estructuras de Datos', 'ED1', 3),
('Algoritmos', 'ALG1', 4),
('Sistemas Operativos', 'SO1', 3),
('Redes de Computadoras', 'RED1', 4),
('Arquitectura de Computadoras', 'ARQ1', 3),
('Ingeniería de Software', 'IS1', 4),
('Bases de Datos Avanzadas', 'BD2', 3),
('Programación Web', 'PW1', 4),
('Desarrollo Mobile', 'DM1', 3),
('Inteligencia Artificial', 'IA1', 4),
('Seguridad Informática', 'SI1', 3),
('Cálculo I', 'CAL1', 5),
('Cálculo II', 'CAL2', 5),
('Álgebra Lineal', 'AL1', 4),
('Estadística', 'EST1', 3),
('Física I', 'FIS1', 4),
('Física II', 'FIS2', 4),
('Inglés Técnico', 'ING2', 2),
('Comunicación', 'COM1', 2),
('Ética Profesional', 'ETI1', 2),
('Proyecto Integrador I', 'PI1', 6),
('Proyecto Integrador II', 'PI2', 6),
('Prácticas Profesionales', 'PP1', 8),
('Seminario de Tesis', 'ST1', 4),
('Emprendimiento Tecnológico', 'ET1', 3);

-- Verificar datos insertados
SELECT COUNT(*) as total_estudiantes FROM estudiantes;
SELECT COUNT(*) as total_materias FROM materias;

