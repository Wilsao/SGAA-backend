-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 04, 2024 at 05:27 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aulasads`
--

-- --------------------------------------------------------

--
-- Table structure for table `animais`
--

DROP TABLE IF EXISTS `animais`;
CREATE TABLE IF NOT EXISTS `animais` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero_baia` int NOT NULL,
  `nome` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `castracao` enum('Sim','Não') COLLATE utf8mb4_general_ci NOT NULL,
  `especie` enum('Cachorro','Gato') COLLATE utf8mb4_general_ci NOT NULL,
  `sexo` enum('Macho','Fêmea') COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `animais`
--

INSERT INTO `animais` (`id`, `numero_baia`, `nome`, `castracao`, `especie`, `sexo`) VALUES
(122, 106, 'Sam', 'Sim', 'Cachorro', 'Macho'),
(121, 197, 'Sophie', 'Sim', 'Gato', 'Fêmea'),
(120, 183, 'Oliver', 'Sim', 'Cachorro', 'Macho'),
(119, 168, 'Riley', 'Não', 'Cachorro', 'Macho'),
(118, 149, 'Molly', 'Sim', 'Gato', 'Fêmea'),
(117, 138, 'Jack', 'Não', 'Cachorro', 'Macho'),
(116, 126, 'Bella', 'Sim', 'Cachorro', 'Fêmea'),
(115, 104, 'Teddy', 'Sim', 'Cachorro', 'Macho'),
(114, 189, 'Nala', 'Sim', 'Gato', 'Fêmea'),
(113, 178, 'Charlie', 'Não', 'Cachorro', 'Macho'),
(112, 169, 'Lola', 'Sim', 'Gato', 'Fêmea'),
(111, 158, 'Oscar', 'Sim', 'Cachorro', 'Macho'),
(110, 147, 'Lily', 'Sim', 'Gato', 'Fêmea'),
(109, 136, 'Cooper', 'Não', 'Cachorro', 'Macho'),
(108, 123, 'Zoe', 'Sim', 'Gato', 'Fêmea'),
(107, 114, 'Mickey', 'Não', 'Cachorro', 'Macho'),
(106, 102, 'Daisy', 'Sim', 'Cachorro', 'Fêmea'),
(105, 199, 'Chloe', 'Sim', 'Gato', 'Fêmea'),
(104, 193, 'Loki', 'Não', 'Cachorro', 'Macho'),
(103, 187, 'Bailey', 'Sim', 'Cachorro', 'Macho'),
(102, 174, 'Sofia', 'Sim', 'Gato', 'Fêmea'),
(101, 162, 'Simba', 'Não', 'Cachorro', 'Macho'),
(100, 153, 'Mia', 'Sim', 'Gato', 'Fêmea'),
(99, 145, 'Rocky', 'Não', 'Cachorro', 'Macho'),
(98, 132, 'Cleo', 'Sim', 'Gato', 'Fêmea'),
(97, 124, 'Milo', 'Sim', 'Cachorro', 'Macho'),
(96, 117, 'Max', 'Não', 'Cachorro', 'Macho'),
(95, 201, 'Lino', 'Sim', 'Cachorro', 'Macho'),
(94, 101, 'Buddy', 'Sim', 'Cachorro', 'Macho');

-- --------------------------------------------------------

--
-- Table structure for table `arrecadacoes`
--

DROP TABLE IF EXISTS `arrecadacoes`;
CREATE TABLE IF NOT EXISTS `arrecadacoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data_evento` date DEFAULT NULL,
  `valor_arrecadado` decimal(10,2) DEFAULT NULL,
  `descricao` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `arrecadacoes`
--

INSERT INTO `arrecadacoes` (`id`, `data_evento`, `valor_arrecadado`, `descricao`) VALUES
(1, '2022-01-15', 1500.00, 'Campanha de arrecadação para compra de alimentos e suprimentos veterinários'),
(2, '2022-03-10', 2000.50, 'Doação para auxiliar no tratamento médico de animais resgatados'),
(3, '2022-04-22', 1800.75, 'Arrecadação para construção de novos canis e áreas de recreação para os animais'),
(4, '2022-06-05', 2500.25, 'Evento de angariação de fundos para esterilização e castração de animais de rua'),
(6, '2022-10-30', 2200.00, 'Arrecadação para resgate e reabilitação de animais vítimas de maus-tratos'),
(7, '2023-02-12', 1800.50, 'Evento esportivo para arrecadar fundos para a manutenção do abrigo e cuidados veterinários'),
(8, '2023-04-25', 2800.75, 'Doação para apoio a programas de socialização e treinamento de animais para adoção'),
(9, '2023-06-10', 3200.00, 'Arrecadação para ampliação das instalações do abrigo e criação de área de convívio para os animais'),
(10, '2023-08-22', 2100.25, 'Evento de caridade para fornecer assistência veterinária emergencial a animais feridos'),
(11, '2023-10-05', 1900.00, 'Leilão de itens autografados por celebridades para arrecadar fundos para cuidados médicos'),
(12, '2023-11-20', 2700.50, 'Evento cultural para sensibilização sobre adoção responsável e arrecadação para castração'),
(13, '2023-12-30', 3000.75, 'Doação para compra de medicamentos e tratamentos veterinários para animais idosos e doentes'),
(14, '2023-06-15', 2300.00, 'Arrecadação para campanha de vacinação e controle de doenças contagiosas em animais'),
(15, '2023-07-28', 2500.25, 'Evento de conscientização sobre abandono de animais e arrecadação para resgate de animais em situação de rua');

-- --------------------------------------------------------

--
-- Table structure for table `castracoes`
--

DROP TABLE IF EXISTS `castracoes`;
CREATE TABLE IF NOT EXISTS `castracoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data_evento` date DEFAULT NULL,
  `tipo_animal` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sexo_animal` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `quantidade_castrada` int DEFAULT NULL,
  `local_evento` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `descricao` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `castracoes`
--

INSERT INTO `castracoes` (`id`, `data_evento`, `tipo_animal`, `sexo_animal`, `quantidade_castrada`, `local_evento`, `descricao`) VALUES
(1, '2022-03-15', 'Cachorro', 'Macho', 3, 'Clínica Veterinária ABC', 'Castração realizada com sucesso.'),
(2, '2022-05-20', 'Gato', 'Fêmea', 1, 'Abrigo de Animais XYZ', 'Gato castrado resgatado da rua.'),
(3, '2022-07-10', 'Cachorro', 'Fêmea', 2, 'Centro Comunitário 123', 'Evento de castração em parceria com ONG local.'),
(4, '2023-01-05', 'Cachorro', 'Macho', 4, 'Parque Municipal', 'Evento anual de castração de cães.'),
(6, '2023-12-10', 'Cachorro', 'Fêmea', 3, 'Clínica Veterinária XYZ', 'Castração realizada durante campanha de adoção.'),
(7, '2022-02-10', 'Cachorro', 'Macho', 2, 'Clínica Veterinária Central', 'Cachorro castrado para controle populacional.'),
(8, '2022-04-25', 'Gato', 'Fêmea', 3, 'Residência do voluntário', 'Evento de castração voluntária organizado pela comunidade.'),
(9, '2022-06-15', 'Cachorro', 'Macho', 1, 'Abrigo Municipal', 'Cão resgatado das ruas castrado e pronto para adoção.'),
(10, '2023-03-20', 'Cachorro', 'Fêmea', 2, 'Clínica de Bairro', 'Evento de castração subsidiado para famílias de baixa renda.'),
(11, '2023-05-05', 'Gato', 'Macho', 4, 'Escola Pública', 'Evento educativo sobre cuidados com animais, incluindo castração.'),
(12, '2023-09-12', 'Cachorro', 'Fêmea', 1, 'Parque de Estimação', 'Castração como parte das atividades do parque de cães.'),
(13, '2022-08-08', 'Gato', 'Fêmea', 2, 'Centro de Resgate de Animais', 'Gato abandonado castrado e preparado para adoção.'),
(14, '2022-10-30', 'Cachorro', 'Macho', 3, 'Evento de adoção', 'Evento de adoção de animais com castração subsidiada.'),
(15, '2023-06-20', 'Gato', 'Macho', 2, 'Casa de Repouso', 'Gato adotado por moradores da casa de repouso e castrado.'),
(16, '2023-11-11', 'Cachorro', 'Fêmea', 1, 'Evento Comunitário', 'Evento de conscientização sobre a importância da castração.'),
(17, '2022-09-05', 'Cachorro', 'Macho', 4, 'Clube de Futebol', 'Evento de castração em parceria com o clube de futebol local.'),
(18, '2022-12-18', 'Gato', 'Fêmea', 2, 'Casa de Voluntários', 'Gato de rua castrado por voluntários em ação comunitária.'),
(19, '2023-04-01', 'Cachorro', 'Macho', 1, 'Loja de Petshop', 'Evento de castração em comemoração ao aniversário da loja de petshop.'),
(20, '2023-07-25', 'Gato', 'Fêmea', 3, 'Centro de Recreação', 'Evento de castração durante programação de atividades recreativas.');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
