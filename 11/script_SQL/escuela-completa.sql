CREATE DATABASE  IF NOT EXISTS `escuela` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `escuela`;
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: escuela
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `docentes`
--

DROP TABLE IF EXISTS `docentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `docentes` (
  `iddocente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `especialidad` varchar(100) DEFAULT NULL,
  `fecha_ingreso` date DEFAULT NULL,
  PRIMARY KEY (`iddocente`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docentes`
--

LOCK TABLES `docentes` WRITE;
/*!40000 ALTER TABLE `docentes` DISABLE KEYS */;
INSERT INTO `docentes` VALUES (1,'Carlos','García','carlos.garcia@universidad.edu','Programación','2020-01-15'),(2,'María','López','maria.lopez@universidad.edu','Base de Datos','2019-03-20'),(3,'Juan','Martínez','juan.martinez@universidad.edu','Algoritmos','2021-02-10'),(4,'Ana','Rodríguez','ana.rodriguez@universidad.edu','Matemática','2018-09-01'),(5,'Pedro','Fernández','pedro.fernandez@universidad.edu','Redes','2020-06-15'),(6,'Laura','Sánchez','laura.sanchez@universidad.edu','Seguridad','2021-08-20'),(7,'Roberto','González','roberto.gonzalez@universidad.edu','Inteligencia Artificial','2022-01-10'),(8,'Sofía','Pérez','sofia.perez@universidad.edu','Desarrollo Web','2019-11-05'),(9,'Diego','Torres','diego.torres@universidad.edu','Ingeniería de Software','2020-04-12'),(10,'Carmen','Ruiz','carmen.ruiz@universidad.edu','Idiomas','2018-02-28');
/*!40000 ALTER TABLE `docentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiante`
--

DROP TABLE IF EXISTS `estudiante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudiante` (
  `idestudiante` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`idestudiante`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiante`
--

LOCK TABLES `estudiante` WRITE;
/*!40000 ALTER TABLE `estudiante` DISABLE KEYS */;
INSERT INTO `estudiante` VALUES (1,'Javier','Lopez','jlopez@gmail.com','1992-09-10','2026-01-28 22:56:45'),(2,'Matias','Riera','matr@gmail.com','1991-06-24','2026-01-28 22:56:45'),(3,'Theo','Saravia','theosaravia@gmail.com','2005-06-13','2026-01-28 22:56:45'),(4,'Angel','Raddino','angelRaddino@gmail.com','2005-08-15','2026-01-28 22:56:45'),(5,'Sofia','Martinez','sofia.martinez@email.com','2000-03-15','2026-01-28 22:56:45'),(6,'Lucas','Garcia','lucas.garcia@email.com','1999-07-22','2026-01-28 22:56:45'),(7,'Valentina','Rodriguez','valentina.rodriguez@email.com','2001-11-08','2026-01-28 22:56:45'),(8,'Mateo','Fernandez','mateo.fernandez@email.com','2002-01-30','2026-01-28 22:56:45'),(9,'Isabella','Lopez','isabella.lopez@email.com','2000-05-18','2026-01-28 22:56:45'),(10,'Santiago','Gonzalez','santiago.gonzalez@email.com','1998-09-12','2026-01-28 22:56:45'),(11,'Camila','Perez','camila.perez@email.com','2001-12-25','2026-01-28 22:56:45'),(12,'Nicolas','Sanchez','nicolas.sanchez@email.com','1999-04-07','2026-01-28 22:56:45'),(13,'Martina','Torres','martina.torres@email.com','2002-08-14','2026-01-28 22:56:45'),(14,'Sebastian','Ramirez','sebastian.ramirez@email.com','2000-02-28','2026-01-28 22:56:45'),(15,'Lucia','Flores','lucia.flores@email.com','2001-10-05','2026-01-28 22:56:45'),(16,'Diego','Morales','diego.morales@email.com','1999-06-20','2026-01-28 22:56:45'),(17,'Emma','Rivera','emma.rivera@email.com','2002-03-11','2026-01-28 22:56:45'),(18,'Benjamin','Ortiz','benjamin.ortiz@email.com','2000-07-09','2026-01-28 22:56:45'),(19,'Olivia','Vargas','olivia.vargas@email.com','2001-09-16','2026-01-28 22:56:45'),(20,'Maximo','Castro','maximo.castro@email.com','1998-11-23','2026-01-28 22:56:45'),(21,'Amelia','Reyes','amelia.reyes@email.com','2002-01-04','2026-01-28 22:56:45'),(22,'Tomas','Jimenez','tomas.jimenez@email.com','1999-08-17','2026-01-28 22:56:45'),(23,'Mia','Herrera','mia.herrera@email.com','2001-05-29','2026-01-28 22:56:45'),(24,'Agustin','Ruiz','agustin.ruiz@email.com','2000-12-13','2026-01-28 22:56:45'),(25,'Catalina','Diaz','catalina.diaz@email.com','2002-04-26','2026-01-28 22:56:45'),(26,'Joaquin','Moreno','joaquin.moreno@email.com','1999-10-02','2026-01-28 22:56:45'),(27,'Victoria','Alvarez','victoria.alvarez@email.com','2001-07-19','2026-01-28 22:56:45'),(28,'Ignacio','Gutierrez','ignacio.gutierrez@email.com','2000-03-31','2026-01-28 22:56:45'),(29,'Antonella','Silva','antonella.silva@email.com','2002-06-08','2026-01-28 22:56:45'),(30,'Facundo','Romero','facundo.romero@email.com','1998-09-21','2026-01-28 22:56:45');
/*!40000 ALTER TABLE `estudiante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscripciones`
--

DROP TABLE IF EXISTS `inscripciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscripciones` (
  `idinscripcion` int(11) NOT NULL AUTO_INCREMENT,
  `idestudiante` int(11) NOT NULL,
  `idmateria` int(11) NOT NULL,
  `fecha_inscripcion` date NOT NULL,
  `nota` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`idinscripcion`),
  KEY `fk_inscripciones_estudiante` (`idestudiante`),
  KEY `fk_inscripciones_materia` (`idmateria`),
  CONSTRAINT `fk_inscripciones_estudiante` FOREIGN KEY (`idestudiante`) REFERENCES `estudiante` (`idestudiante`) ON DELETE CASCADE,
  CONSTRAINT `fk_inscripciones_materia` FOREIGN KEY (`idmateria`) REFERENCES `materia` (`idmateria`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripciones`
--

LOCK TABLES `inscripciones` WRITE;
/*!40000 ALTER TABLE `inscripciones` DISABLE KEYS */;
INSERT INTO `inscripciones` VALUES (1,1,1,'2025-01-10',8.50),(2,1,2,'2025-01-10',7.00),(3,1,5,'2025-01-15',9.00),(4,2,1,'2025-01-11',9.00),(5,2,3,'2025-01-11',8.00),(6,2,6,'2025-01-12',7.50),(7,2,11,'2025-01-20',NULL),(8,3,2,'2025-01-12',NULL),(9,3,4,'2025-01-12',6.50),(10,4,1,'2025-01-13',8.00),(11,4,7,'2025-01-13',7.50),(12,4,12,'2025-01-14',9.50),(13,5,1,'2025-01-14',9.50),(14,5,2,'2025-01-14',8.50),(15,5,5,'2025-01-15',9.00),(16,5,13,'2025-01-16',8.00),(17,5,14,'2025-01-17',NULL),(18,6,3,'2025-01-15',7.00),(19,6,17,'2025-01-15',6.00),(20,7,1,'2025-01-16',8.50),(21,7,6,'2025-01-16',7.50),(22,7,7,'2025-01-17',8.00),(23,7,15,'2025-01-18',9.00),(24,8,2,'2025-01-17',7.50),(25,8,8,'2025-01-17',6.50),(26,8,9,'2025-01-18',NULL),(27,9,1,'2025-01-18',9.00),(28,9,5,'2025-01-18',8.50),(29,9,13,'2025-01-19',9.50),(30,9,14,'2025-01-20',8.00),(31,10,3,'2025-01-19',8.00),(32,10,18,'2025-01-19',7.00),(33,11,1,'2025-01-20',7.50),(34,11,2,'2025-01-20',8.00),(35,11,11,'2025-01-21',7.00),(36,12,6,'2025-01-21',8.50),(37,12,7,'2025-01-21',9.00),(38,12,10,'2025-01-22',7.50),(39,12,16,'2025-01-22',8.00),(40,13,4,'2025-01-22',9.00),(41,13,23,'2025-01-22',8.50),(42,14,1,'2025-01-23',8.00),(43,14,5,'2025-01-23',7.50),(44,14,13,'2025-01-24',8.50),(45,14,15,'2025-01-24',9.00),(46,14,26,'2025-01-25',NULL),(47,15,2,'2025-01-24',9.50),(48,15,12,'2025-01-24',8.50),(49,15,16,'2025-01-25',7.50),(50,21,1,'2025-01-28',8.00),(51,22,2,'2025-01-28',7.00),(52,23,1,'2025-01-29',9.50),(53,24,4,'2025-01-29',8.00),(54,26,2,'2025-01-30',8.00),(55,27,1,'2025-02-01',8.50),(56,29,19,'2025-02-02',9.00);
/*!40000 ALTER TABLE `inscripciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materia`
--

DROP TABLE IF EXISTS `materia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materia` (
  `idmateria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `codigo` varchar(20) DEFAULT NULL,
  `docente_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`idmateria`),
  UNIQUE KEY `codigo` (`codigo`),
  KEY `fk_materia_docente` (`docente_id`),
  CONSTRAINT `fk_materia_docente` FOREIGN KEY (`docente_id`) REFERENCES `docentes` (`iddocente`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materia`
--

LOCK TABLES `materia` WRITE;
/*!40000 ALTER TABLE `materia` DISABLE KEYS */;
INSERT INTO `materia` VALUES (1,'Programación I','PROG1',1),(2,'Base de Datos','BD1',2),(3,'Matemática','MAT1',4),(4,'Inglés','ING1',10),(5,'Programación II','PROG2',1),(6,'Estructuras de Datos','ED1',3),(7,'Algoritmos','ALG1',3),(8,'Sistemas Operativos','SO1',5),(9,'Redes de Computadoras','RED1',5),(10,'Arquitectura de Computadoras','ARQ1',2),(11,'Ingeniería de Software','IS1',9),(12,'Bases de Datos Avanzadas','BD2',2),(13,'Programación Web','PW1',8),(14,'Desarrollo Mobile','DM1',3),(15,'Inteligencia Artificial','IA1',7),(16,'Seguridad Informática','SI1',6),(17,'Cálculo I','CAL1',3),(18,'Cálculo II','CAL2',1),(19,'Álgebra Lineal','AL1',2),(20,'Estadística','EST1',3),(21,'Física I','FIS1',1),(22,'Física II','FIS2',2),(23,'Inglés Técnico','ING2',10),(24,'Comunicación','COM1',10),(25,'Ética Profesional','ETI1',2),(26,'Proyecto Integrador I','PI1',3),(27,'Proyecto Integrador II','PI2',1),(28,'Prácticas Profesionales','PP1',2),(29,'Seminario de Tesis','ST1',3),(30,'Emprendimiento Tecnológico','ET1',1);
/*!40000 ALTER TABLE `materia` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-02 19:35:31
