-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: localhost    Database: heddoko_test
-- ------------------------------------------------------
-- Server version	5.6.26-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `admins_user_id_foreign` (`user_id`),
  CONSTRAINT `admins_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `athletes`
--

DROP TABLE IF EXISTS `athletes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `athletes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `team_id` int(10) unsigned DEFAULT NULL,
  `age` int(10) unsigned NOT NULL,
  `height_cm` int(10) unsigned NOT NULL,
  `weight_cm` int(10) unsigned NOT NULL,
  `primary_sport` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `primary_position` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `hand_leg_dominance` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `previous_injuries` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `underlying_medical` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `notes` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `athletes_user_id_foreign` (`user_id`),
  KEY `athletes_team_id_foreign` (`team_id`),
  CONSTRAINT `athletes_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`),
  CONSTRAINT `athletes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `athletes`
--

LOCK TABLES `athletes` WRITE;
/*!40000 ALTER TABLE `athletes` DISABLE KEYS */;
INSERT INTO `athletes` VALUES (1,'Jim','Bob',2,5,25,193,90,'Soccer','Midfielder','Right','none','','','2015-09-02 03:32:57','2015-09-02 03:32:57');
/*!40000 ALTER TABLE `athletes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coaches`
--

DROP TABLE IF EXISTS `coaches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coaches` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `coaches_user_id_foreign` (`user_id`),
  CONSTRAINT `coaches_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coaches`
--

LOCK TABLES `coaches` WRITE;
/*!40000 ALTER TABLE `coaches` DISABLE KEYS */;
INSERT INTO `coaches` VALUES (1,'Joe','Blow',1,NULL,'2015-09-02 03:32:57','2015-09-02 03:32:57');
/*!40000 ALTER TABLE `coaches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fmsforms`
--

DROP TABLE IF EXISTS `fmsforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fmsforms` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `deepsquat` tinyint(4) NOT NULL,
  `deepsquatcomments` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Lhurdle` tinyint(4) NOT NULL,
  `Rhurdle` tinyint(4) NOT NULL,
  `hurdlecomments` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Llunge` tinyint(4) NOT NULL,
  `Rlunge` tinyint(4) NOT NULL,
  `lungecomments` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Lshoulder` tinyint(4) NOT NULL,
  `Rshoulder` tinyint(4) NOT NULL,
  `shouldercomments` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Limpingement` tinyint(4) NOT NULL,
  `Rimpingement` tinyint(4) NOT NULL,
  `impingementcomments` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Lactive` tinyint(4) NOT NULL,
  `Ractive` tinyint(4) NOT NULL,
  `activecomments` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `trunk` tinyint(4) NOT NULL,
  `trunkcomments` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `press` tinyint(4) NOT NULL,
  `presscomments` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Lrotary` tinyint(4) NOT NULL,
  `Rrotary` tinyint(4) NOT NULL,
  `rotarycomments` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `posterior` tinyint(4) NOT NULL,
  `posteriorcomments` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `totalscore` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fmsforms`
--

LOCK TABLES `fmsforms` WRITE;
/*!40000 ALTER TABLE `fmsforms` DISABLE KEYS */;
INSERT INTO `fmsforms` VALUES (1,3,'',3,3,'',3,3,'',3,3,'',3,3,'',3,3,'',3,'',3,'',3,3,'',3,'',3,'2015-09-02 03:32:57','2015-09-02 03:32:57');
/*!40000 ALTER TABLE `fmsforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fmsformsubmissions`
--

DROP TABLE IF EXISTS `fmsformsubmissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fmsformsubmissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `coach_id` int(10) unsigned NOT NULL,
  `athlete_id` int(10) unsigned NOT NULL,
  `fmsform_id` int(10) unsigned NOT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `fmsformsubmissions_coach_id_foreign` (`coach_id`),
  KEY `fmsformsubmissions_athlete_id_foreign` (`athlete_id`),
  KEY `fmsformsubmissions_fmsform_id_foreign` (`fmsform_id`),
  CONSTRAINT `fmsformsubmissions_athlete_id_foreign` FOREIGN KEY (`athlete_id`) REFERENCES `athletes` (`id`),
  CONSTRAINT `fmsformsubmissions_coach_id_foreign` FOREIGN KEY (`coach_id`) REFERENCES `coaches` (`id`),
  CONSTRAINT `fmsformsubmissions_fmsform_id_foreign` FOREIGN KEY (`fmsform_id`) REFERENCES `fmsforms` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fmsformsubmissions`
--

LOCK TABLES `fmsformsubmissions` WRITE;
/*!40000 ALTER TABLE `fmsformsubmissions` DISABLE KEYS */;
INSERT INTO `fmsformsubmissions` VALUES (1,1,1,1,'not bad','2015-09-02 03:32:57','2015-09-02 03:32:57');
/*!40000 ALTER TABLE `fmsformsubmissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frames`
--

DROP TABLE IF EXISTS `frames`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frames` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `movement_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `frames_movement_id_foreign` (`movement_id`),
  CONSTRAINT `frames_movement_id_foreign` FOREIGN KEY (`movement_id`) REFERENCES `movements` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frames`
--

LOCK TABLES `frames` WRITE;
/*!40000 ALTER TABLE `frames` DISABLE KEYS */;
INSERT INTO `frames` VALUES (1,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(2,2,'2015-09-02 03:32:57','2015-09-02 03:32:57');
/*!40000 ALTER TABLE `frames` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movementrawentries`
--

DROP TABLE IF EXISTS `movementrawentries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movementrawentries` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `movement_id` int(10) unsigned NOT NULL,
  `filename` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `movementrawentries_filename_unique` (`filename`),
  KEY `movementrawentries_movement_id_foreign` (`movement_id`),
  CONSTRAINT `movementrawentries_movement_id_foreign` FOREIGN KEY (`movement_id`) REFERENCES `movements` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movementrawentries`
--

LOCK TABLES `movementrawentries` WRITE;
/*!40000 ALTER TABLE `movementrawentries` DISABLE KEYS */;
/*!40000 ALTER TABLE `movementrawentries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movements`
--

DROP TABLE IF EXISTS `movements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movements` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sportmovement_id` int(10) unsigned DEFAULT NULL,
  `movementsub_id` int(10) unsigned DEFAULT NULL,
  `fmsformsub_id` int(10) unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `movements_sportmovement_id_foreign` (`sportmovement_id`),
  KEY `movements_movementsub_id_foreign` (`movementsub_id`),
  KEY `movements_fmsformsub_id_foreign` (`fmsformsub_id`),
  CONSTRAINT `movements_fmsformsub_id_foreign` FOREIGN KEY (`fmsformsub_id`) REFERENCES `fmsformsubmissions` (`id`),
  CONSTRAINT `movements_movementsub_id_foreign` FOREIGN KEY (`movementsub_id`) REFERENCES `movementsubmissions` (`id`),
  CONSTRAINT `movements_sportmovement_id_foreign` FOREIGN KEY (`sportmovement_id`) REFERENCES `sportmovements` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movements`
--

LOCK TABLES `movements` WRITE;
/*!40000 ALTER TABLE `movements` DISABLE KEYS */;
INSERT INTO `movements` VALUES (1,13,NULL,1,'Elbow Flex','2015-09-02 03:32:57','2015-09-02 03:32:57'),(2,13,1,NULL,'Elbow Flex','2015-09-02 03:32:57','2015-09-02 03:32:57');
/*!40000 ALTER TABLE `movements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movementsubmissions`
--

DROP TABLE IF EXISTS `movementsubmissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movementsubmissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `coach_id` int(10) unsigned NOT NULL,
  `athlete_id` int(10) unsigned NOT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `movementsubmissions_coach_id_foreign` (`coach_id`),
  KEY `movementsubmissions_athlete_id_foreign` (`athlete_id`),
  CONSTRAINT `movementsubmissions_athlete_id_foreign` FOREIGN KEY (`athlete_id`) REFERENCES `athletes` (`id`),
  CONSTRAINT `movementsubmissions_coach_id_foreign` FOREIGN KEY (`coach_id`) REFERENCES `coaches` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movementsubmissions`
--

LOCK TABLES `movementsubmissions` WRITE;
/*!40000 ALTER TABLE `movementsubmissions` DISABLE KEYS */;
INSERT INTO `movementsubmissions` VALUES (1,1,1,'needs improvement','2015-09-02 03:32:57','2015-09-02 03:32:57');
/*!40000 ALTER TABLE `movementsubmissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nodcontainers`
--

DROP TABLE IF EXISTS `nodcontainers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nodcontainers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `frame_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `nodcontainers_frame_id_foreign` (`frame_id`),
  CONSTRAINT `nodcontainers_frame_id_foreign` FOREIGN KEY (`frame_id`) REFERENCES `frames` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nodcontainers`
--

LOCK TABLES `nodcontainers` WRITE;
/*!40000 ALTER TABLE `nodcontainers` DISABLE KEYS */;
INSERT INTO `nodcontainers` VALUES (1,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(2,2,'2015-09-02 03:32:57','2015-09-02 03:32:57');
/*!40000 ALTER TABLE `nodcontainers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nodjoints`
--

DROP TABLE IF EXISTS `nodjoints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nodjoints` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nod_container_id` int(10) unsigned NOT NULL,
  `iInitRot1` double(8,2) NOT NULL,
  `iInitRot2` double(8,2) NOT NULL,
  `iInitRot3` double(8,2) NOT NULL,
  `iInitRot4` double(8,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `nodjoints_nod_container_id_foreign` (`nod_container_id`),
  CONSTRAINT `nodjoints_nod_container_id_foreign` FOREIGN KEY (`nod_container_id`) REFERENCES `nodcontainers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nodjoints`
--

LOCK TABLES `nodjoints` WRITE;
/*!40000 ALTER TABLE `nodjoints` DISABLE KEYS */;
INSERT INTO `nodjoints` VALUES (1,1,34.00,43.00,66.00,77.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(2,1,34.00,43.00,66.00,77.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(3,1,34.00,43.00,66.00,77.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(4,2,34.00,43.00,66.00,77.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(5,2,34.00,43.00,66.00,77.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(6,2,34.00,43.00,66.00,77.00,'2015-09-02 03:32:57','2015-09-02 03:32:57');
/*!40000 ALTER TABLE `nodjoints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nodsensors`
--

DROP TABLE IF EXISTS `nodsensors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nodsensors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nod_joint_id` int(10) unsigned NOT NULL,
  `InitRot1` double(8,2) NOT NULL,
  `InitRot2` double(8,2) NOT NULL,
  `InitRot3` double(8,2) NOT NULL,
  `InitRot4` double(8,2) NOT NULL,
  `CurRot1` double(8,2) NOT NULL,
  `CurRot2` double(8,2) NOT NULL,
  `CurRot3` double(8,2) NOT NULL,
  `CurRot4` double(8,2) NOT NULL,
  `CurRotEuler1` double(8,2) NOT NULL,
  `CurRotEuler2` double(8,2) NOT NULL,
  `CurRotEuler3` double(8,2) NOT NULL,
  `CurRotEuler4` double(8,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `nodsensors_nod_joint_id_foreign` (`nod_joint_id`),
  CONSTRAINT `nodsensors_nod_joint_id_foreign` FOREIGN KEY (`nod_joint_id`) REFERENCES `nodjoints` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nodsensors`
--

LOCK TABLES `nodsensors` WRITE;
/*!40000 ALTER TABLE `nodsensors` DISABLE KEYS */;
INSERT INTO `nodsensors` VALUES (1,1,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(2,1,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(3,1,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(4,1,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(5,1,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(6,2,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(7,2,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(8,2,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(9,2,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(10,2,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(11,3,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(12,3,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(13,3,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(14,3,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(15,3,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(16,4,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(17,4,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(18,4,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(19,4,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(20,4,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(21,5,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(22,5,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(23,5,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(24,5,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(25,5,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(26,6,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(27,6,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(28,6,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(29,6,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(30,6,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,34.00,'2015-09-02 03:32:57','2015-09-02 03:32:57');
/*!40000 ALTER TABLE `nodsensors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission_role`
--

DROP TABLE IF EXISTS `permission_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission_role` (
  `permission_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `permission_role_role_id_foreign` (`role_id`),
  CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_role`
--

LOCK TABLES `permission_role` WRITE;
/*!40000 ALTER TABLE `permission_role` DISABLE KEYS */;
INSERT INTO `permission_role` VALUES (1,2);
/*!40000 ALTER TABLE `permission_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'delete-fms-forms','Delete FMS','delete FMS Forms','2015-09-02 03:32:57','2015-09-02 03:32:57');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_user`
--

DROP TABLE IF EXISTS `role_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_user` (
  `user_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_user_role_id_foreign` (`role_id`),
  CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_user`
--

LOCK TABLES `role_user` WRITE;
/*!40000 ALTER TABLE `role_user` DISABLE KEYS */;
INSERT INTO `role_user` VALUES (1,2),(2,3);
/*!40000 ALTER TABLE `role_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','System Administrator','Admins have all privileges','2015-09-02 03:32:57','2015-09-02 03:32:57'),(2,'coach','Sports Coach','Coaches administer Teams','2015-09-02 03:32:57','2015-09-02 03:32:57'),(3,'athlete','Sports Athlete','Athletes have very limited permissions','2015-09-02 03:32:57','2015-09-02 03:32:57');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sportmovements`
--

DROP TABLE IF EXISTS `sportmovements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sportmovements` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sport_id` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `sportmovements_sport_id_foreign` (`sport_id`),
  CONSTRAINT `sportmovements_sport_id_foreign` FOREIGN KEY (`sport_id`) REFERENCES `sports` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sportmovements`
--

LOCK TABLES `sportmovements` WRITE;
/*!40000 ALTER TABLE `sportmovements` DISABLE KEYS */;
INSERT INTO `sportmovements` VALUES (1,10,'Back Squat','2015-09-02 03:32:57','2015-09-02 03:32:57'),(2,10,'Deadlift','2015-09-02 03:32:57','2015-09-02 03:32:57'),(3,10,'Bench Press','2015-09-02 03:32:57','2015-09-02 03:32:57'),(4,10,'Push-up','2015-09-02 03:32:57','2015-09-02 03:32:57'),(5,10,'Pull-up','2015-09-02 03:32:57','2015-09-02 03:32:57'),(6,10,'Horizontal Jump','2015-09-02 03:32:57','2015-09-02 03:32:57'),(7,10,'Vertical Jump','2015-09-02 03:32:57','2015-09-02 03:32:57'),(8,10,'Plank','2015-09-02 03:32:57','2015-09-02 03:32:57'),(9,10,'Lunge','2015-09-02 03:32:57','2015-09-02 03:32:57'),(10,10,'Treadmill','2015-09-02 03:32:57','2015-09-02 03:32:57'),(11,11,'YogaFakeMvmnt','2015-09-02 03:32:57','2015-09-02 03:32:57'),(12,11,'YogaFakeMvmnt1','2015-09-02 03:32:57','2015-09-02 03:32:57'),(13,11,'YogaFakeMvmnt3','2015-09-02 03:32:57','2015-09-02 03:32:57');
/*!40000 ALTER TABLE `sportmovements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sports`
--

DROP TABLE IF EXISTS `sports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sports` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sports`
--

LOCK TABLES `sports` WRITE;
/*!40000 ALTER TABLE `sports` DISABLE KEYS */;
INSERT INTO `sports` VALUES (1,'Hockey','2015-09-02 03:32:57','2015-09-02 03:32:57'),(2,'Soccer','2015-09-02 03:32:57','2015-09-02 03:32:57'),(3,'Football','2015-09-02 03:32:57','2015-09-02 03:32:57'),(4,'Volleyball','2015-09-02 03:32:57','2015-09-02 03:32:57'),(5,'Basketball','2015-09-02 03:32:57','2015-09-02 03:32:57'),(6,'Tennis','2015-09-02 03:32:57','2015-09-02 03:32:57'),(7,'Golf','2015-09-02 03:32:57','2015-09-02 03:32:57'),(8,'Spinning','2015-09-02 03:32:57','2015-09-02 03:32:57'),(9,'Crossfit','2015-09-02 03:32:57','2015-09-02 03:32:57'),(10,'Strength and Conditioning','2015-09-02 03:32:57','2015-09-02 03:32:57'),(11,'Yoga','2015-09-02 03:32:57','2015-09-02 03:32:57');
/*!40000 ALTER TABLE `sports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stretchcontainers`
--

DROP TABLE IF EXISTS `stretchcontainers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stretchcontainers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `frame_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `stretchcontainers_frame_id_foreign` (`frame_id`),
  CONSTRAINT `stretchcontainers_frame_id_foreign` FOREIGN KEY (`frame_id`) REFERENCES `frames` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stretchcontainers`
--

LOCK TABLES `stretchcontainers` WRITE;
/*!40000 ALTER TABLE `stretchcontainers` DISABLE KEYS */;
INSERT INTO `stretchcontainers` VALUES (1,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(2,2,'2015-09-02 03:32:57','2015-09-02 03:32:57');
/*!40000 ALTER TABLE `stretchcontainers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stretchjoints`
--

DROP TABLE IF EXISTS `stretchjoints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stretchjoints` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `stretch_container_id` int(10) unsigned NOT NULL,
  `curJointRotE1` double(8,2) NOT NULL,
  `curJointRotE2` double(8,2) NOT NULL,
  `curJointRotE3` double(8,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `stretchjoints_stretch_container_id_foreign` (`stretch_container_id`),
  CONSTRAINT `stretchjoints_stretch_container_id_foreign` FOREIGN KEY (`stretch_container_id`) REFERENCES `stretchcontainers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stretchjoints`
--

LOCK TABLES `stretchjoints` WRITE;
/*!40000 ALTER TABLE `stretchjoints` DISABLE KEYS */;
INSERT INTO `stretchjoints` VALUES (1,1,34.00,43.00,66.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(2,1,34.00,43.00,66.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(3,1,34.00,43.00,66.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(4,2,34.00,43.00,66.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(5,2,34.00,43.00,66.00,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(6,2,34.00,43.00,66.00,'2015-09-02 03:32:57','2015-09-02 03:32:57');
/*!40000 ALTER TABLE `stretchjoints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stretchsensors`
--

DROP TABLE IF EXISTS `stretchsensors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stretchsensors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `stretch_joint_id` int(10) unsigned NOT NULL,
  `CSValue1` int(11) NOT NULL,
  `CSValue2` int(11) NOT NULL,
  `CSValue3` int(11) NOT NULL,
  `CSValue4` int(11) NOT NULL,
  `CSValue5` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `stretchsensors_stretch_joint_id_foreign` (`stretch_joint_id`),
  CONSTRAINT `stretchsensors_stretch_joint_id_foreign` FOREIGN KEY (`stretch_joint_id`) REFERENCES `stretchjoints` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stretchsensors`
--

LOCK TABLES `stretchsensors` WRITE;
/*!40000 ALTER TABLE `stretchsensors` DISABLE KEYS */;
INSERT INTO `stretchsensors` VALUES (1,1,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(2,1,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(3,1,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(4,1,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(5,1,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(6,2,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(7,2,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(8,2,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(9,2,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(10,2,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(11,3,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(12,3,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(13,3,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(14,3,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(15,3,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(16,4,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(17,4,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(18,4,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(19,4,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(20,4,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(21,5,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(22,5,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(23,5,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(24,5,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(25,5,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(26,6,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(27,6,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(28,6,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(29,6,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(30,6,32,44,65,76,1,'2015-09-02 03:32:57','2015-09-02 03:32:57');
/*!40000 ALTER TABLE `stretchsensors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teams` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `coach_id` int(10) unsigned NOT NULL,
  `sport_id` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `teams_coach_id_foreign` (`coach_id`),
  KEY `teams_sport_id_foreign` (`sport_id`),
  CONSTRAINT `teams_coach_id_foreign` FOREIGN KEY (`coach_id`) REFERENCES `coaches` (`id`),
  CONSTRAINT `teams_sport_id_foreign` FOREIGN KEY (`sport_id`) REFERENCES `sports` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (1,1,11,'Dummy Team','2015-09-02 03:32:57','2015-09-02 03:32:57'),(2,1,11,'Chargers','2015-09-02 03:32:57','2015-09-02 03:32:57'),(3,1,11,'Falcons','2015-09-02 03:32:57','2015-09-02 03:32:57'),(4,1,11,'Stampeders','2015-09-02 03:32:57','2015-09-02 03:32:57'),(5,1,11,'Vikings','2015-09-02 03:32:57','2015-09-02 03:32:57'),(6,1,1,'Hockey','2015-09-02 03:34:53','2015-09-02 03:34:53');
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `dob` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `sex` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `mobile` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'fake@fake.ca','awesomecoach111','$2y$10$tr237KqNBGl1U8zkwwTPhu2UX.n7q3i0BiZtSMKNB1WSIR7oM6hqe','Montreal','02/02/02','unspecified','11231234',NULL,'2015-09-02 03:32:57','2015-09-02 03:32:57'),(2,'fake2@fake.ca','awesomeathlete111','$2y$10$HZq7W1ocvKFD1bEO4XUqnOYH4r0dD/yXf8oRRTVdsOR8YDfa91MGm','Montreal','02/02/02','male','11231234',NULL,'2015-09-02 03:32:57','2015-09-02 03:32:57');
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

-- Dump completed on 2015-09-08 19:24:02
