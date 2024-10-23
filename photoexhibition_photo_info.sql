-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: photoexhibition
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `photo_info`
--

DROP TABLE IF EXISTS `photo_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photo_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `time` date NOT NULL,
  `place` varchar(200) NOT NULL,
  `photo` varchar(450) NOT NULL,
  `pho_theme` varchar(200) NOT NULL,
  `pho_description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo_info`
--

LOCK TABLES `photo_info` WRITE;
/*!40000 ALTER TABLE `photo_info` DISABLE KEYS */;
INSERT INTO `photo_info` VALUES (47,'2024-10-11','青岛','static/uploads/1.jpg','大海','人与狗在海边静静地坐着'),(48,'2024-10-31','安徽淮北','static/uploads/2.jpg','公园','公园的黄昏'),(49,'2024-10-17','四川成都','static/uploads/3.jpg','雪山','阳光照耀下金灿灿的雪山'),(50,'2024-10-02','海南','static/uploads/4.jpg','椰子树黄昏与海边','椰子树黄昏与海边'),(51,'2024-10-18','重庆','static/uploads/5.jpg','云与山','低矮的云层覆盖着山顶'),(52,'2024-09-29','日本','static/uploads/6.jpg','油画乡村','静谧的乡村生活和像油画一样的天空'),(53,'2024-10-24','内蒙古','static/uploads/7.jpg','草地与羊群','羊群悠闲地经过牧场'),(54,'2024-09-05','湖北宜昌','static/uploads/8.jpg','湖与树','绿绿的色调是湖与树的颜色'),(55,'2024-10-31','广州深圳','static/uploads/9.jpg','大海','大海是云霞'),(57,'2020-10-01','宿州萧县','static/uploads/10.jpg','玉米地','ma苞谷'),(59,'2023-07-22','安徽淮北','static/uploads/11.jpg','云与光','太阳被笼罩在云朵中'),(60,'2022-08-10','浙江杭州','static/uploads/12.jpg','粉色晚霞','杭州的粉色晚霞'),(61,'2024-07-23','安徽淮北','static/uploads/13.jpg','黄昏与晚霞','窗外的晚霞'),(62,'2024-09-26','重庆市沙坪坝区','static/uploads/15.jpg','自行车','虎溪校区与我的自行车'),(63,'2024-02-27','重庆市沙坪坝区','static/uploads/14.jpg','猫咪','校园中惬意的猫咪'),(67,'2024-10-21','重庆市沙坪坝区','static/uploads/19.jpg','猫咪','学校惬意的猫咪'),(68,'2024-10-10','重庆市沙坪坝区','static/uploads/21.jpg','猫猫','漂亮的小猫咪'),(69,'2024-10-10','重庆市沙坪坝区','static/uploads/20.jpg','猫猫','撅屁股的小猫咪'),(70,'2024-09-13','重庆市沙坪坝区','static/uploads/24.jpg','酒','各种各样的酒'),(71,'2024-08-17','重庆市渝北区','static/uploads/25.jpg','云','重庆的云');
/*!40000 ALTER TABLE `photo_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-23 13:52:52
