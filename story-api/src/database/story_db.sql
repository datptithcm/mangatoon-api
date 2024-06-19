CREATE DATABASE  IF NOT EXISTS `story_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `story_db`;
-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: 127.0.0.1    Database: story_db
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `alias`
--

DROP TABLE IF EXISTS `alias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `storyId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_story_alias_idx` (`storyId`),
  FULLTEXT KEY `FTS_title_alias` (`title`),
  CONSTRAINT `FK_story_alias` FOREIGN KEY (`storyId`) REFERENCES `story` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alias`
--

LOCK TABLES `alias` WRITE;
/*!40000 ALTER TABLE `alias` DISABLE KEYS */;
/*!40000 ALTER TABLE `alias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapter`
--

DROP TABLE IF EXISTS `chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapter` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order` int NOT NULL,
  `name` varchar(250) NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `storyId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_story_chapter_idx` (`storyId`),
  CONSTRAINT `FK_story_chapter` FOREIGN KEY (`storyId`) REFERENCES `story` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapter`
--

LOCK TABLES `chapter` WRITE;
/*!40000 ALTER TABLE `chapter` DISABLE KEYS */;
/*!40000 ALTER TABLE `chapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapterImages`
--

DROP TABLE IF EXISTS `chapterImages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapterImages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `path` varchar(500) NOT NULL,
  `chapterId` int NOT NULL,
  `order` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_chapter_chapterImages_idx` (`chapterId`),
  CONSTRAINT `FK_chapter_chapterImages` FOREIGN KEY (`chapterId`) REFERENCES `chapter` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapterImages`
--

LOCK TABLES `chapterImages` WRITE;
/*!40000 ALTER TABLE `chapterImages` DISABLE KEYS */;
/*!40000 ALTER TABLE `chapterImages` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `set_default_value_for_chapter_order` BEFORE INSERT ON `chapterimages` FOR EACH ROW BEGIN 
	SET NEW.order = GetchapterImageOrderNext(NEW.chapterId);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=249 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'Andorra'),(2,'Albania'),(3,'Afghanistan'),(4,'Angola'),(5,'Samoa thuộc Mỹ'),(6,'Algeria'),(7,'Antarctica'),(8,'Bonaire'),(9,'Anguilla'),(10,'Áo'),(11,'Armenia'),(12,'Antigua và Barbuda'),(13,'Đảo Bouvet'),(14,'Bhutan'),(15,'Aruba'),(16,'Brazil'),(17,'Barbados'),(18,'Lãnh thổ Ấn Độ Dương thuộc Anh'),(19,'Belarus'),(20,'Argentina'),(21,'Botswana'),(22,'Cape Verde'),(23,'Bangladesh'),(24,'Campuchia'),(25,'Cameroon'),(26,'Costa Rica'),(27,'Cuba'),(28,'Canada'),(29,'Quần đảo Cook'),(30,'Curacao'),(31,'Cộng hòa Dân chủ Congo'),(32,'Burundi'),(33,'Trung Phi'),(34,'Nhà nước Brunei Darussalam'),(35,'Martinique'),(36,'Síp'),(37,'Belize'),(38,'Pháp'),(39,'Bosnia và Herzegovina'),(40,'Bỉ'),(41,'Bahrain'),(42,'Bolivia'),(43,'Azerbaijan'),(44,'Bermuda'),(45,'Úc'),(46,'Bahamas'),(47,'Benin'),(48,'Bulgaria'),(49,'Croatia'),(50,'Quần đảo Marshall'),(51,'Lào'),(52,'Ai Cập'),(53,'Mayotte'),(54,'Dominica'),(55,'Cộng hòa Congo'),(56,'Mexico'),(57,'Djibouti'),(58,'Kuwait'),(59,'Liên bang Micronesia'),(60,'Wallis và Futuna'),(61,'Mauritius'),(62,'Myanmar'),(63,'Thụy Điển'),(64,'Nauru'),(65,'Nam Georgia và Quần đảo Nam Sandwich'),(66,'Pitcairn'),(67,'Lithuania'),(68,'Sát (Tchad)'),(69,'Séc'),(70,'Cộng hòa Dominica'),(71,'Ecuador'),(72,'El Salvador'),(73,'Burkina Faso'),(74,'Colombia'),(75,'Guatemala'),(76,'Đảo Guam'),(77,'Guinea Xích Đạo'),(78,'Trung Quốc'),(79,'Đan Mạch'),(80,'Bờ Biển Ngà'),(81,'Đảo Giáng Sinh'),(82,'Haiti'),(83,'Guinea'),(84,'Quần đảo Cocos'),(85,'Ghana'),(86,'Quần đảo Cayman'),(87,'Eritrea'),(88,'Comoros'),(89,'Guinea-Bissau'),(90,'Hy Lạp'),(91,'Đảo Heard và quần đảo McDonald'),(92,'Honduras'),(93,'Guyana'),(94,'Gibraltar'),(95,'Lebanon'),(96,'Luxembourg'),(97,'Macedonia'),(98,'Ireland'),(99,'Hồng Kông'),(100,'Ấn Độ'),(101,'Na Uy'),(102,'Kenya'),(103,'Đức'),(104,'Malta'),(105,'Chile'),(106,'Montserrat'),(107,'Quần đảo Falkland'),(108,'Iraq'),(109,'Iceland'),(110,'Vùng đất phía Nam và châu Nam Cực thuộc Pháp'),(111,'Fiji'),(112,'Liberia'),(113,'Iran'),(114,'Hàn Quốc'),(115,'Madagascar'),(116,'Nhật Bản'),(117,'Libya'),(118,'Estonia'),(119,'Một quốc gia tự trị thuộc Đan Mạch'),(120,'Kiribati'),(121,'Ethiopia'),(122,'Guadeloupe'),(123,'Grenada'),(124,'Quần đảo Faroe'),(125,'Maldives'),(126,'Liechtenstein'),(127,'Phần Lan'),(128,'Jersey'),(129,'Quần đảo Bắc Mariana'),(130,'Guiana thuộc Pháp'),(131,'Malaysia'),(132,'Macao'),(133,'Montenegro'),(134,'Indonesia'),(135,'Hungary'),(136,'Lesotho'),(137,'Guernsey'),(138,'Gabon'),(139,'Mông Cổ'),(140,'Jamaica'),(141,'Mauritania'),(142,'Tòa thánh Vatican'),(143,'Malawi'),(144,'Đảo Man'),(145,'Georgia'),(146,'Monaco'),(147,'Ý'),(148,'Jordan'),(149,'Latvia'),(150,'Triều tiên'),(151,'Gambia'),(152,'Tonga'),(153,'Israel'),(154,'Bồ Đào Nha'),(155,'Tanzania'),(156,'Nam Phi'),(157,'Thổ Nhĩ Kỳ'),(158,'Đảo Norfolk'),(159,'Saint Barthelemy'),(160,'Togo'),(161,'Nepal'),(162,'Pakistan'),(163,'Ukraine'),(164,'Philippines'),(165,'Zambia'),(166,'Kazakhstan'),(167,'Puerto Rico'),(168,'Palestine'),(169,'Polynesia thuộc Pháp'),(170,'Svalbard và Jan Mayen'),(171,'Saint Lucia'),(172,'Zimbabwe'),(173,'Ả Rập Xê Út'),(174,'Mozambique'),(175,'Uzbekistan'),(176,'Singapore'),(177,'Quần đảo Virgin thuộc Mỹ '),(178,'Quần đảo Solomon'),(179,'Yemen'),(180,'Namibia'),(181,'Nigeria'),(182,'Ma Rốc (Maroc)'),(183,'Saint Martin (French part)'),(184,'Saint Kitts và Nevis'),(185,'Nam Sudan'),(186,'Thụy Sĩ'),(187,'Qatar'),(188,'Thái Lan'),(189,'Sao Tome và Principe'),(190,'Kyrgyzstan'),(191,'Peru'),(192,'Papua New Guinea'),(193,'Romania'),(194,'Đông Timor'),(195,'Các tiểu vương quốc Ả Rập Thống nhất'),(196,'Tokelau'),(197,'Các tiểu đảo xa của Hoa Kỳ'),(198,'Sudan'),(199,'Quần đảo Turks và Caicos'),(200,'New Zealand'),(201,'Palau'),(202,'Niger'),(203,'Somalia'),(204,'Slovakia'),(205,'Tuvalu'),(206,'Senegal'),(207,'Tây Ban Nha'),(208,'Saint Pierre và Miquelon'),(209,'Saint Helena'),(210,'Syria'),(211,'Oman'),(212,'Uruguay'),(213,'Vương quốc Liên hiệp Anh và Bắc Ireland'),(214,'Mali'),(215,'Việt Nam'),(216,'Serbia'),(217,'Seychelles'),(218,'Đài Loan '),(219,'Sierra Leone'),(220,'Tajikistan'),(221,'Tây Sahara'),(222,'Sint Maarten'),(223,'Paraguay'),(224,'Tunisia'),(225,'Ba Lan'),(226,'San Marino'),(227,'Samoa'),(228,'Rwanda'),(229,'Venezuela'),(230,'Niue'),(231,'Saint Vincent và the Grenadines'),(232,'Sri Lanka'),(233,'Vanuatu'),(234,'Turkmenistan'),(235,'Trinidad và Tobago'),(236,'Reunion'),(237,'Nga'),(238,'Moldova'),(239,'Mỹ (Hoa Kỳ)'),(240,'Panama'),(241,'Quần đảo Virgin thuộc Anh'),(242,'Suriname'),(243,'Swaziland'),(244,'Hà Lan'),(245,'New Caledonia'),(246,'Uganda'),(247,'Slovenia'),(248,'Nicaragua');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historyDetail`
--

DROP TABLE IF EXISTS `historyDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historyDetail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `chapterId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_chapter_historyDetail_idx` (`chapterId`),
  KEY `FK_user_historyDetail_idx` (`userId`),
  CONSTRAINT `FK_chapter_historyDetail` FOREIGN KEY (`chapterId`) REFERENCES `chapter` (`id`),
  CONSTRAINT `FK_user_historyDetail` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historyDetail`
--

LOCK TABLES `historyDetail` WRITE;
/*!40000 ALTER TABLE `historyDetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `historyDetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `storyId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`storyId`,`userId`),
  KEY `FK_user_invoice_idx` (`userId`),
  CONSTRAINT `FK_story_invoice` FOREIGN KEY (`storyId`) REFERENCES `story` (`id`),
  CONSTRAINT `FK_user_invoice` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicePackage`
--

DROP TABLE IF EXISTS `servicePackage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicePackage` (
  `id` int NOT NULL,
  `expireIn` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicePackage`
--

LOCK TABLES `servicePackage` WRITE;
/*!40000 ALTER TABLE `servicePackage` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicePackage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicePackageTransaction`
--

DROP TABLE IF EXISTS `servicePackageTransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicePackageTransaction` (
  `id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `servicePackageId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_servicePackage_servicePackageTransaction_idx` (`servicePackageId`),
  KEY `FK_user_servicePackageTransaction_idx` (`userId`),
  CONSTRAINT `FK_servicePackage_servicePackageTransaction` FOREIGN KEY (`servicePackageId`) REFERENCES `servicePackage` (`id`),
  CONSTRAINT `FK_user_servicePackageTransaction` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicePackageTransaction`
--

LOCK TABLES `servicePackageTransaction` WRITE;
/*!40000 ALTER TABLE `servicePackageTransaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicePackageTransaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `story`
--

DROP TABLE IF EXISTS `story`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `story` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `description` longtext,
  `coverImageUrl` varchar(1000) NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `countryId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_country_story_idx` (`countryId`),
  FULLTEXT KEY `FTS_title_description_story` (`title`,`description`),
  FULLTEXT KEY `FTS_titile_story` (`title`),
  FULLTEXT KEY `FTS_description_story` (`description`),
  CONSTRAINT `FK_country_story` FOREIGN KEY (`countryId`) REFERENCES `country` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `story`
--

LOCK TABLES `story` WRITE;
/*!40000 ALTER TABLE `story` DISABLE KEYS */;
/*!40000 ALTER TABLE `story` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storyAuthorDetail`
--

DROP TABLE IF EXISTS `storyAuthorDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storyAuthorDetail` (
  `storyId` int NOT NULL,
  `authorId` int NOT NULL,
  PRIMARY KEY (`storyId`,`authorId`),
  KEY `FK_story_author_idx` (`authorId`),
  CONSTRAINT `FK_author_storyAuthorDetail` FOREIGN KEY (`authorId`) REFERENCES `author` (`id`),
  CONSTRAINT `FK_story_storyAuthorDetail` FOREIGN KEY (`storyId`) REFERENCES `story` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storyAuthorDetail`
--

LOCK TABLES `storyAuthorDetail` WRITE;
/*!40000 ALTER TABLE `storyAuthorDetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `storyAuthorDetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storyFollowDetail`
--

DROP TABLE IF EXISTS `storyFollowDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storyFollowDetail` (
  `storyId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`storyId`,`userId`),
  KEY `FK_user_storyFollowDetail_idx` (`userId`),
  CONSTRAINT `FK_story_storyFollowDetail` FOREIGN KEY (`storyId`) REFERENCES `story` (`id`),
  CONSTRAINT `FK_user_storyFollowDetail` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storyFollowDetail`
--

LOCK TABLES `storyFollowDetail` WRITE;
/*!40000 ALTER TABLE `storyFollowDetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `storyFollowDetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storyGenreDetail`
--

DROP TABLE IF EXISTS `storyGenreDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storyGenreDetail` (
  `storyId` int NOT NULL,
  `genreId` int NOT NULL,
  PRIMARY KEY (`storyId`,`genreId`),
  KEY `FK_genre_storyGenreDetail_idx` (`genreId`),
  CONSTRAINT `FK_genre_storyGenreDetail` FOREIGN KEY (`genreId`) REFERENCES `genre` (`id`),
  CONSTRAINT `FK_story_storyGenreDetail` FOREIGN KEY (`storyId`) REFERENCES `story` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storyGenreDetail`
--

LOCK TABLES `storyGenreDetail` WRITE;
/*!40000 ALTER TABLE `storyGenreDetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `storyGenreDetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storyPriceHistory`
--

DROP TABLE IF EXISTS `storyPriceHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storyPriceHistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price` decimal(12,3) NOT NULL,
  `startTime` datetime NOT NULL,
  `storyId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_story_storyPriceHistory_story_idx` (`storyId`),
  CONSTRAINT `FK_story_storyPriceHistory` FOREIGN KEY (`storyId`) REFERENCES `story` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storyPriceHistory`
--

LOCK TABLES `storyPriceHistory` WRITE;
/*!40000 ALTER TABLE `storyPriceHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `storyPriceHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storyRatingDetail`
--

DROP TABLE IF EXISTS `storyRatingDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storyRatingDetail` (
  `storyId` int NOT NULL,
  `userId` int NOT NULL,
  `star` tinyint NOT NULL,
  PRIMARY KEY (`storyId`,`userId`),
  KEY `FK_user_storyRatingDetail_idx` (`userId`),
  CONSTRAINT `FK_story_storyRatingDetail` FOREIGN KEY (`storyId`) REFERENCES `story` (`id`),
  CONSTRAINT `FK_user_storyRatingDetail` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storyRatingDetail`
--

LOCK TABLES `storyRatingDetail` WRITE;
/*!40000 ALTER TABLE `storyRatingDetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `storyRatingDetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viewDetail`
--

DROP TABLE IF EXISTS `viewDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viewDetail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `chapterId` int NOT NULL,
  `clientId` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_chapter_viewDetail_idx` (`chapterId`),
  CONSTRAINT `FK_chapter_viewDetail` FOREIGN KEY (`chapterId`) REFERENCES `chapter` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viewDetail`
--

LOCK TABLES `viewDetail` WRITE;
/*!40000 ALTER TABLE `viewDetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `viewDetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'story_db'
--

--
-- Dumping routines for database 'story_db'
--
/*!50003 DROP FUNCTION IF EXISTS `GetchapterImageOrderNext` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `GetchapterImageOrderNext`(chapterId INTEGER) RETURNS int
    READS SQL DATA
BEGIN
	DECLARE count INTEGER; 
    SET count = (
		SELECT
			COUNT(*) AS count
		FROM
			chapterImages
		WHERE
			chapterImages.chapterId = chapterId
    );
    RETURN count;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetFollowCountOfStory` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetFollowCountOfStory`(
	IN storyId INT
)
BEGIN
	DECLARE followCount INT;
    SET followCount = (SELECT
		COUNT(*) AS followCount
	FROM
		storyFollowDetail
	WHERE
		storyFollowDetail.storyId = storyId);
	
    IF followCount IS NULL THEN
		SET followCount = 0;
	END IF;
	
	SELECT followCount;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetRatingOfStory` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetRatingOfStory`(
    IN storyId INT
)
BEGIN
	DECLARE tempRatingCount INT;
    SET tempRatingCount = (SELECT COUNT(storyRatingDetail.storyId)
    FROM storyRatingDetail
    WHERE storyRatingDetail.storyId = storyId);
    
    CREATE TEMPORARY TABLE IF NOT EXISTS ratingInfo (
        star INT,
        ratingCount INT,
        rating FLOAT
    );

    IF tempRatingCount = 0 THEN
        INSERT INTO ratingInfo VALUES(0, 0, 0);
    ELSE
        INSERT INTO ratingInfo
        SELECT
            SUM(storyRatingDetail.star) AS star,
            COUNT(storyRatingDetail.storyId) AS ratingCount,
            (SUM(storyRatingDetail.star) / (COUNT(storyRatingDetail.storyId) * 5)) AS rating
        FROM
            storyRatingDetail
        WHERE
            storyRatingDetail.storyId = storyId;
    END IF;

    SELECT star, ratingCount, rating FROM ratingInfo;

    DROP TEMPORARY TABLE IF EXISTS ratingInfo;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetTopStoriesByFollowCount` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTopStoriesByFollowCount`(
	IN page INT,
    IN _limit INT
)
BEGIN
	DECLARE offset INT;
    SET offset = (page-1)*_limit;
	SELECT
		story.*,
        BT.followCount
	FROM
		story
	INNER JOIN
		(SELECT
			storyFollowDetail.storyId,
			COUNT(storyFollowDetail.storyId) AS followCount
		FROM
			storyFollowDetail
		GROUP BY
			storyFollowDetail.storyId
		ORDER BY
			followCount DESC
		LIMIT offset, _limit) AS BT ON story.id = BT.storyId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetTopStoriesByRating` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTopStoriesByRating`(
	IN page INT,
    IN _limit INT
)
BEGIN
	DECLARE offset INT;
    SET offset = (page-1)*_limit;
	SELECT
		story.*,
        BT.starCount,
        BT.ratingCount,
        BT.rating
	FROM
		story
	INNER JOIN
		(SELECT
			storyRatingDetail.storyId,
			SUM(storyRatingDetail.star) AS starCount,
            COUNT(storyRatingDetail.storyId) AS ratingCount,
            (SUM(storyRatingDetail.star)/(COUNT(storyRatingDetail.storyId)*5)) AS rating
		FROM
			storyRatingDetail
		GROUP BY
			storyRatingDetail.storyId
		ORDER BY
			rating DESC
		LIMIT offset, _limit) AS BT ON story.id = BT.storyId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetTopStoriesByViewCount` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTopStoriesByViewCount`(
    IN from_date DATETIME,
    IN to_date DATETIME,
    IN page INT,
    IN _limit INT
)
BEGIN
	DECLARE offset INT;
    SET offset = (page-1)*_limit;
    SELECT 
        story.*,
        BT.viewCount
    FROM
        story
    INNER JOIN
        (SELECT 
            chapter.storyId,
            COUNT(chapter.storyId) AS viewcount
        FROM
            (SELECT
                *
            FROM
                viewDetail
            WHERE
                createdAt >= from_date AND createdAt <= to_date) AS viewDetail
        INNER JOIN
            chapter ON viewDetail.chapterId = chapter.id
        GROUP BY
            chapter.storyId
        ORDER BY
            viewcount DESC
        LIMIT offset,_limit) AS BT ON story.id = BT.storyId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetTotalViewOfStory` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTotalViewOfStory`(
	IN storyId INT
)
BEGIN
	DECLARE viewCount INT;
    SET viewCount = (SELECT
		COUNT(*) AS viewCount
	FROM
		viewDetail
	INNER JOIN
		(SELECT
			chapter.id,
            chapter.storyId
		FROM
			chapter
		WHERE
			chapter.storyId = storyId) AS chapter ON viewDetail.chapterId = chapter.id);
	
    IF viewCount IS NULL THEN
		SET viewCount = 0;
	END IF;
	
	SELECT viewCount;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-14 22:07:36
