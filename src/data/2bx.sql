CREATE DATABASE  IF NOT EXISTS `2bx` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `2bx`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: 2bx
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.24-MariaDB

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
-- Table structure for table `actions`
--

DROP TABLE IF EXISTS `actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
/*!40000 ALTER TABLE `actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location_id` int(11) NOT NULL,
  `sport_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `image` varchar(200) NOT NULL,
  `description` varchar(500) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `sale_ratio` tinyint(4) NOT NULL,
  `reservation_price` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `lunch` tinyint(4) NOT NULL,
  `snack` tinyint(4) NOT NULL,
  `transport` tinyint(4) NOT NULL,
  `experience_level` int(11) NOT NULL,
  `address` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `location_id` (`location_id`),
  KEY `sport_id` (`sport_id`),
  CONSTRAINT `location_id` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sport_id` FOREIGN KEY (`sport_id`) REFERENCES `sports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,1,2,'Salto Bautismo','10:00:00','18:30:00','image-1658791639450-372038480.jpg','Vení a pasar el día con nosotros y vivir la mejor experiencia de tu vida! Queremos compartirte nuestra pasión e mostrarte el cielo como lo vivimos nosotros.',0,0,5000,25000,0,0,0,0,''),(3,1,3,'Surf Class','09:30:00','11:30:00','image-1658879422211-628960940.jpg','Eleva tus habilidades de surf con nuestros instructores, van a enseñarte tips y técnicas para mejorar tu experiencia sobre la tabla!',0,0,1000,6000,0,0,0,0,''),(4,13,4,'Escalada en Roca','11:20:00','15:40:00','image-1658878722587-334340049.jpg','Disfrutá de una hermosa caminata que te llevará directo al pie de la roca que escalaremos juntos. Pasaremos una hermosa mañana juntos  y aprenderás algunos movimientos y técnicas para disfrutar cada paso, acompañado por nuestros guías experimentados y un equipamiento de primera.',0,0,1500,7500,1,0,0,0,''),(5,6,1,'Vuelo en Parapente','10:30:00','18:30:00','image-1658880442797-765971074.jpg','Pasemos el día juntos en comunidad. La comunidad de parapentistas de Cuchicorral en La Cumbre, te invita a que descubras el placer de pasear en el aire de nuestro valle. Pasamos el día en la rampa compartiendo experiencias, rica comida y buen vino al atardecer.',0,1,5000,20000,1,0,1,0,''),(6,13,5,'Travesía de los Rápidos','14:30:00','16:30:00','image-1658879321787-672237825.jpg','El precio incluye un paseo con guía por los rápidos mendocinos (por persona). Las reservas deben hacerse con al menos una semana de anticipación para asegurarnos que podemos llenar todos los lugares. La travesía de los rápidos incluye un paseo por los rápidos de San Rafael de 2 hs, donde experimentarás adrenalina pura!',0,0,2500,8500,0,0,0,0,'');
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `province` varchar(50) NOT NULL,
  `geo_region` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'Buenos Aires','Centro'),(2,'Ciudad Autonoma de Buenos','Centro'),(3,'Catamarca','Norte'),(4,'Chaco','Norte'),(5,'Chubut','Sur'),(6,'Córdoba','Centro'),(7,'Corrientes','Norte'),(8,'Entre Ríos','Centro'),(9,'Formosa','Norte'),(10,'Jujuy','Norte'),(11,'La Pampa','Centro'),(12,'La Rioja','Norte'),(13,'Mendoza','Centro'),(14,'Misiones','Norte'),(15,'Neuquén','Sur'),(16,'Río Negro','Sur'),(17,'Salta','Norte'),(18,'San Juan','Centro'),(19,'San Luis','Centro'),(20,'Santa Cruz','Sur'),(21,'Santa Fe','Centro'),(22,'Santiago del Estero','Norte'),(23,'Tierra del Fuego','Sur'),(24,'Tucumán','Norte');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sports`
--

DROP TABLE IF EXISTS `sports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `sport_type_id` int(11) NOT NULL,
  `health_insurance` tinyint(4) NOT NULL,
  `age` int(11) NOT NULL,
  `adrenaline_level` int(11) NOT NULL,
  `doctor_aproval` tinyint(4) NOT NULL,
  `minors` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sport_type_id` (`sport_type_id`),
  CONSTRAINT `sport_type_id` FOREIGN KEY (`sport_type_id`) REFERENCES `sports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sports`
--

LOCK TABLES `sports` WRITE;
/*!40000 ALTER TABLE `sports` DISABLE KEYS */;
INSERT INTO `sports` VALUES (1,'Parapente',4,1,16,3,0,1),(2,'Paracaidismo',4,1,18,4,1,0),(3,'Surf',1,0,10,1,0,1),(4,'Escalada',2,0,16,3,0,1),(5,'Rafting',1,1,10,2,1,1),(6,'Kitesurf',1,0,16,3,0,1),(7,'Trekking',2,0,10,1,0,1),(8,'Downhill',2,1,18,5,1,0),(9,'Buceo',1,1,18,2,1,0),(10,'Mountain Bike',2,0,10,2,0,1),(11,'Ski',3,1,10,3,1,1),(12,'Snowboard',3,1,10,3,1,1);
/*!40000 ALTER TABLE `sports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sporttypes`
--

DROP TABLE IF EXISTS `sporttypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sporttypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sporttypes`
--

LOCK TABLES `sporttypes` WRITE;
/*!40000 ALTER TABLE `sporttypes` DISABLE KEYS */;
INSERT INTO `sporttypes` VALUES (1,'Agua'),(2,'Tierra'),(3,'Fuego'),(4,'Aire');
/*!40000 ALTER TABLE `sporttypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `birth_date` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  `weight` decimal(10,0) DEFAULT NULL,
  `height` decimal(10,0) DEFAULT NULL,
  `tellus` varchar(500) DEFAULT NULL,
  `admin` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ggg','hhh','1990-10-10','g@h.com','$2a$10$R5IPuCPhottIFrdMTqUoWOhC9xGXl.yuQNhZAK9qkKXa6gxGtL0hW','Logo1FondoNegro.jpg',40,2,'Hola que tal!',NULL),(2,'Nadia','Mavric','1995-07-23','mavricnadia@gmail.com','$2a$10$w1IXvddqE5TGIqcDLTzhFeU5fhAh2sCSScmFeoM25r2YhXZ2y/RcC','image-1658793964746-908049978.jpg',58,0,'',1),(3,'Ana','Cerruti','1999-11-09','cerrutianamaria@gmail.com','$2a$10$4YWOirzAf3VFizwrzacRaeWjPLrWzalMvp1acfc8SaLaKlI7Yorhm','Logo1FondoNegro.jpg',NULL,NULL,NULL,NULL),(4,'Filomena','Pepita','2006-02-12','filomena@gmail.com','$2a$10$a0vBTzB.1OouidO/FI3/4eBekCpbiX72WJgf/g0w3l2b3XAHj9gFe','Logo1FondoNegro.jpg',NULL,NULL,NULL,NULL),(5,'Juana','Gonzalez','1995-07-12','juanita@gmail.com','$2a$10$YkRbCtk4c3XxJaZSx8WYuuEYFBCwS.wL8uJoJrJW9lXWF.ZgCWvPa','Logo1FondoNegro.jpg',NULL,NULL,NULL,NULL),(6,'Nadita','Maverick','1995-07-23','nadita@gmail.com','$2a$10$2uQjCBvS/JyjMnN1zzNM8eu2KjqKcHT.ICVd4eSQYxOsZ8MZwx9fy','Logo1FondoNegro.jpg',NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-08 22:31:06
