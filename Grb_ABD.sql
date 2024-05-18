-- MariaDB dump 10.19-11.3.2-MariaDB, for osx10.18 (arm64)
--
-- Host: localhost    Database: Grb_ABD
-- ------------------------------------------------------
-- Server version	11.3.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Asuransi`
--

DROP TABLE IF EXISTS `Asuransi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Asuransi` (
  `id_Asuransi` int(11) NOT NULL AUTO_INCREMENT,
  `disediakan_oleh` int(11) NOT NULL,
  `dimiliki_oleh` varchar(50) NOT NULL,
  `tanggal_exp` date DEFAULT NULL,
  `harga_asuransi` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_Asuransi`,`disediakan_oleh`,`dimiliki_oleh`),
  KEY `disediakan_oleh` (`disediakan_oleh`),
  KEY `dimiliki_oleh` (`dimiliki_oleh`),
  CONSTRAINT `asuransi_ibfk_1` FOREIGN KEY (`disediakan_oleh`) REFERENCES `PerusahaanAsuransi` (`id_PerusahaanAsuransi`),
  CONSTRAINT `asuransi_ibfk_2` FOREIGN KEY (`dimiliki_oleh`) REFERENCES `Kendaraan` (`model`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Asuransi`
--

LOCK TABLES `Asuransi` WRITE;
/*!40000 ALTER TABLE `Asuransi` DISABLE KEYS */;
/*!40000 ALTER TABLE `Asuransi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Detail`
--

DROP TABLE IF EXISTS `Detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Detail` (
  `id_detail` int(11) NOT NULL AUTO_INCREMENT,
  `harga` decimal(10,2) DEFAULT NULL,
  `kuantitas` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_detail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Detail`
--

LOCK TABLES `Detail` WRITE;
/*!40000 ALTER TABLE `Detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `Detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DetailPeminjaman`
--

DROP TABLE IF EXISTS `DetailPeminjaman`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DetailPeminjaman` (
  `id_peminjaman` int(11) NOT NULL,
  `id_detail_peminjaman` int(11) NOT NULL,
  `model_kendaraan` varchar(50) NOT NULL,
  PRIMARY KEY (`id_peminjaman`,`id_detail_peminjaman`,`model_kendaraan`),
  KEY `id_detail_peminjaman` (`id_detail_peminjaman`),
  KEY `model_kendaraan` (`model_kendaraan`),
  CONSTRAINT `detailpeminjaman_ibfk_1` FOREIGN KEY (`id_peminjaman`) REFERENCES `Peminjaman` (`id_peminjaman`),
  CONSTRAINT `detailpeminjaman_ibfk_2` FOREIGN KEY (`id_detail_peminjaman`) REFERENCES `Detail` (`id_detail`),
  CONSTRAINT `detailpeminjaman_ibfk_3` FOREIGN KEY (`model_kendaraan`) REFERENCES `Kendaraan` (`model`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DetailPeminjaman`
--

LOCK TABLES `DetailPeminjaman` WRITE;
/*!40000 ALTER TABLE `DetailPeminjaman` DISABLE KEYS */;
/*!40000 ALTER TABLE `DetailPeminjaman` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Kendaraan`
--

DROP TABLE IF EXISTS `Kendaraan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Kendaraan` (
  `model` varchar(50) NOT NULL,
  `tahun_keluaran` int(11) DEFAULT NULL,
  `tipe_elektrik` enum('Elektrik','NonElektrik') DEFAULT NULL,
  `jumlah_kendaraan` int(11) DEFAULT NULL,
  PRIMARY KEY (`model`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Kendaraan`
--

LOCK TABLES `Kendaraan` WRITE;
/*!40000 ALTER TABLE `Kendaraan` DISABLE KEYS */;
/*!40000 ALTER TABLE `Kendaraan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Klien`
--

DROP TABLE IF EXISTS `Klien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Klien` (
  `id_klien` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nomor_telepon` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_klien`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Klien`
--

LOCK TABLES `Klien` WRITE;
/*!40000 ALTER TABLE `Klien` DISABLE KEYS */;
/*!40000 ALTER TABLE `Klien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `KontakPerusahaan`
--

DROP TABLE IF EXISTS `KontakPerusahaan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `KontakPerusahaan` (
  `id_perusahaan` int(11) NOT NULL,
  `kontak` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_perusahaan`),
  CONSTRAINT `kontakperusahaan_ibfk_1` FOREIGN KEY (`id_perusahaan`) REFERENCES `Perusahaan` (`id_perusahaan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `KontakPerusahaan`
--

LOCK TABLES `KontakPerusahaan` WRITE;
/*!40000 ALTER TABLE `KontakPerusahaan` DISABLE KEYS */;
/*!40000 ALTER TABLE `KontakPerusahaan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mobil`
--

DROP TABLE IF EXISTS `Mobil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Mobil` (
  `model_mobil` varchar (50) NOT NULL,
  `jumlah_kursi` int(11) DEFAULT NULL,
  `kelas` enum('Normal','SUV','Van') DEFAULT NULL,
  PRIMARY KEY (`model_mobil`),
  CONSTRAINT `mobil_ibfk_1` FOREIGN KEY (`model_mobil`) REFERENCES `Kendaraan` (`model`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mobil`
--

LOCK TABLES `Mobil` WRITE;
/*!40000 ALTER TABLE `Mobil` DISABLE KEYS */;
/*!40000 ALTER TABLE `Mobil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Motor`
--

DROP TABLE IF EXISTS `Motor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Motor` (
  `model_motor` varchar(50) NOT NULL,
  `kapasitas_mesin` int(11) DEFAULT NULL,
  PRIMARY KEY (`model_motor`),
  CONSTRAINT `motor_ibfk_1` FOREIGN KEY (`model_motor`) REFERENCES `Kendaraan` (`model`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Motor`
--

LOCK TABLES `Motor` WRITE;
/*!40000 ALTER TABLE `Motor` DISABLE KEYS */;
/*!40000 ALTER TABLE `Motor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pegawai`
--

DROP TABLE IF EXISTS `Pegawai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Pegawai` (
  `id_pegawai` int(11) NOT NULL AUTO_INCREMENT,
  `id_atasan` int(11) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nomor_telepon` varchar(20) DEFAULT NULL,
  `jabatan` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_pegawai`),
  KEY `id_atasan` (`id_atasan`),
  CONSTRAINT `pegawai_ibfk_1` FOREIGN KEY (`id_atasan`) REFERENCES `Pegawai` (`id_pegawai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pegawai`
--

LOCK TABLES `Pegawai` WRITE;
/*!40000 ALTER TABLE `Pegawai` DISABLE KEYS */;
/*!40000 ALTER TABLE `Pegawai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Peminjaman`
--

DROP TABLE IF EXISTS `Peminjaman`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Peminjaman` (
  `id_peminjaman` int(11) NOT NULL AUTO_INCREMENT,
  `status_peminjaman` enum('returned','pending','rented') DEFAULT NULL,
  `tanggal_mulai` date DEFAULT NULL,
  `tanggal_berakhir` date DEFAULT NULL,
  PRIMARY KEY (`id_peminjaman`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Peminjaman`
--

LOCK TABLES `Peminjaman` WRITE;
/*!40000 ALTER TABLE `Peminjaman` DISABLE KEYS */;
/*!40000 ALTER TABLE `Peminjaman` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PeminjamanKlien`
--

DROP TABLE IF EXISTS `PeminjamanKlien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PeminjamanKlien` (
  `id_klien` int(11) NOT NULL,
  `id_pegawai` int(11) NOT NULL,
  `id_peminjaman` int(11) NOT NULL,
  PRIMARY KEY (`id_klien`,`id_pegawai`,`id_peminjaman`),
  KEY `id_pegawai` (`id_pegawai`),
  KEY `id_peminjaman` (`id_peminjaman`),
  CONSTRAINT `peminjamanklien_ibfk_1` FOREIGN KEY (`id_klien`) REFERENCES `Klien` (`id_klien`),
  CONSTRAINT `peminjamanklien_ibfk_2` FOREIGN KEY (`id_pegawai`) REFERENCES `Pegawai` (`id_pegawai`),
  CONSTRAINT `peminjamanklien_ibfk_3` FOREIGN KEY (`id_peminjaman`) REFERENCES `Peminjaman` (`id_peminjaman`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PeminjamanKlien`
--

LOCK TABLES `PeminjamanKlien` WRITE;
/*!40000 ALTER TABLE `PeminjamanKlien` DISABLE KEYS */;
/*!40000 ALTER TABLE `PeminjamanKlien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Perawatan`
--

DROP TABLE IF EXISTS `Perawatan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Perawatan` (
  `id_Perawatan` int(11) NOT NULL AUTO_INCREMENT,
  `disediakan_oleh` int(11) NOT NULL,
  `dimiliki_oleh` varchar(50) NOT NULL,
  `tanggal` date DEFAULT NULL,
  `tipe` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_Perawatan`,`disediakan_oleh`,`dimiliki_oleh`),
  KEY `disediakan_oleh` (`disediakan_oleh`),
  KEY `dimiliki_oleh` (`dimiliki_oleh`),
  CONSTRAINT `perawatan_ibfk_1` FOREIGN KEY (`disediakan_oleh`) REFERENCES `PerusahaanPerawatan` (`id_PerusahaanPerawatan`),
  CONSTRAINT `perawatan_ibfk_2` FOREIGN KEY (`dimiliki_oleh`) REFERENCES `Kendaraan` (`model`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Perawatan`
--

LOCK TABLES `Perawatan` WRITE;
/*!40000 ALTER TABLE `Perawatan` DISABLE KEYS */;
/*!40000 ALTER TABLE `Perawatan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Perusahaan`
--

DROP TABLE IF EXISTS `Perusahaan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Perusahaan` (
  `id_perusahaan` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_perusahaan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Perusahaan`
--

LOCK TABLES `Perusahaan` WRITE;
/*!40000 ALTER TABLE `Perusahaan` DISABLE KEYS */;
/*!40000 ALTER TABLE `Perusahaan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PerusahaanAsuransi`
--

DROP TABLE IF EXISTS `PerusahaanAsuransi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PerusahaanAsuransi` (
  `id_PerusahaanAsuransi` int(11) NOT NULL,
  PRIMARY KEY (`id_PerusahaanAsuransi`),
  CONSTRAINT `perusahaanasuransi_ibfk_1` FOREIGN KEY (`id_PerusahaanAsuransi`) REFERENCES `Perusahaan` (`id_perusahaan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PerusahaanAsuransi`
--

LOCK TABLES `PerusahaanAsuransi` WRITE;
/*!40000 ALTER TABLE `PerusahaanAsuransi` DISABLE KEYS */;
/*!40000 ALTER TABLE `PerusahaanAsuransi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PerusahaanPerawatan`
--

DROP TABLE IF EXISTS `PerusahaanPerawatan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PerusahaanPerawatan` (
  `id_PerusahaanPerawatan` int(11) NOT NULL,
  `jumlah_teknisi` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_PerusahaanPerawatan`),
  CONSTRAINT `perusahaanperawatan_ibfk_1` FOREIGN KEY (`id_PerusahaanPerawatan`) REFERENCES `Perusahaan` (`id_perusahaan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PerusahaanPerawatan`
--

LOCK TABLES `PerusahaanPerawatan` WRITE;
/*!40000 ALTER TABLE `PerusahaanPerawatan` DISABLE KEYS */;
/*!40000 ALTER TABLE `PerusahaanPerawatan` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-05 14:03:20
