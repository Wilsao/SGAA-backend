-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 18, 2024 at 02:52 AM
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
-- Table structure for table `adocoes`
--

DROP TABLE IF EXISTS `adocoes`;
CREATE TABLE IF NOT EXISTS `adocoes` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `animal_id` int NOT NULL,
  `nome` varchar(255) NOT NULL,
  `data_nascimento` date DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `endereco` varchar(255) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `data_adocao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `adocoes`
--

INSERT INTO `adocoes` (`id`, `animal_id`, `nome`, `data_nascimento`, `email`, `telefone`, `endereco`, `cidade`, `data_adocao`) VALUES
(1, 1, 'João da Silva', '1990-01-01', 'joao.silva@example.com', '(11) 99999-9999', 'Rua das Flores, 123', 'São Paulo', '2024-06-16 17:46:07'),
(5, 0, 'Wilson A. L. Junior', '1997-09-02', 'wilson@gmail.com', '(12) 31231-2312', 'Rua 21 de Abril, 200', 'Osvaldo Cruz', '2024-06-18 02:43:04');

-- --------------------------------------------------------

--
-- Table structure for table `animais`
--

DROP TABLE IF EXISTS `animais`;
CREATE TABLE IF NOT EXISTS `animais` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero_baia` int NOT NULL,
  `nome` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `castracao` enum('Sim','Não') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `especie` int DEFAULT NULL,
  `sexo` enum('Macho','Fêmea') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `adocao` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `foto_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cuidador` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `animais`
--

INSERT INTO `animais` (`id`, `numero_baia`, `nome`, `castracao`, `especie`, `sexo`, `adocao`, `foto_url`, `cuidador`) VALUES
(120, 183, 'Oliver', 'Sim', 2, 'Macho', 'Não', NULL, 5),
(119, 168, 'Riley', 'Não', 2, 'Macho', 'Sim', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(118, 149, 'Molly', 'Sim', 7, 'Fêmea', 'Sim', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(117, 138, 'Jack', 'Não', 2, 'Macho', 'Sim', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(116, 126, 'Bella', 'Sim', 2, 'Fêmea', 'Sim', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(115, 104, 'Teddy', 'Sim', 2, 'Macho', 'Não', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(114, 189, 'Nala', 'Sim', 7, 'Fêmea', 'Sim', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(113, 178, 'Charlie', 'Não', 2, 'Macho', 'Sim', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(112, 169, 'Lola', 'Sim', 7, 'Fêmea', 'Sim', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(111, 158, 'Oscar', 'Sim', 2, 'Macho', 'Não', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(110, 147, 'Lily', 'Sim', 7, 'Fêmea', 'Sim', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(109, 136, 'Cooper', 'Não', 2, 'Macho', 'Não', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(108, 123, 'Zoe', 'Sim', 7, 'Fêmea', 'Não', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(107, 114, 'Mickey', 'Não', 2, 'Macho', 'Sim', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(106, 102, 'Daisy', 'Sim', 2, 'Fêmea', 'Não', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(105, 199, 'Chloe', 'Sim', 7, 'Fêmea', 'Sim', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(104, 193, 'Loki', 'Não', 2, 'Macho', 'Sim', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(103, 187, 'Bailey', 'Sim', 2, 'Macho', 'Não', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(102, 174, 'Sofia', 'Sim', 7, 'Fêmea', 'Sim', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(101, 162, 'Simba', 'Não', 2, 'Macho', 'Sim', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(100, 153, 'Mia', 'Sim', 7, 'Fêmea', 'Não', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(99, 145, 'Rocky', 'Não', 2, 'Macho', 'Sim', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(98, 132, 'Cleo', 'Sim', 7, 'Fêmea', 'Sim', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(97, 124, 'Milo', 'Sim', 2, 'Macho', 'Não', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(96, 117, 'Max', 'Não', 2, 'Macho', 'Não', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(95, 201, 'Lino', 'Sim', 2, 'Macho', 'Sim', 'https://random.dog/0e198464-e755-43bb-a2f8-9db136507f38.JPG', NULL),
(94, 101, 'Buddy', 'Sim', 2, 'Macho', 'Não', NULL, NULL),
(127, 666, 'Junin', 'Sim', 3, 'Fêmea', 'Não', NULL, 5);

-- --------------------------------------------------------

--
-- Table structure for table `arrecadacoes`
--

DROP TABLE IF EXISTS `arrecadacoes`;
CREATE TABLE IF NOT EXISTS `arrecadacoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data_evento` date DEFAULT NULL,
  `valor_arrecadado` decimal(10,2) DEFAULT NULL,
  `descricao` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
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
  `tipo_animal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sexo_animal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `quantidade_castrada` int DEFAULT NULL,
  `local_evento` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `descricao` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `castracoes`
--

INSERT INTO `castracoes` (`id`, `data_evento`, `tipo_animal`, `sexo_animal`, `quantidade_castrada`, `local_evento`, `descricao`) VALUES
(1, '2022-03-15', 'Cachorro', 'Macho', 3, 'Clínica Veterinária ABC', 'Castração realizada com sucesso.'),
(2, '2022-05-20', 'Gato', 'Fêmea', 1, 'Abrigo de Animais XYZ', 'Gato castrado resgatado da rua.'),
(3, '2022-07-10', 'Cachorro', 'Fêmea', 2, 'Centro Comunitário 123', 'Evento de castração em parceria com ONG local.'),
(25, '2024-06-17', 'Gato', 'Macho', 2, 'asdasd', 'teste'),
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

-- --------------------------------------------------------

--
-- Table structure for table `cuidadores`
--

DROP TABLE IF EXISTS `cuidadores`;
CREATE TABLE IF NOT EXISTS `cuidadores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `endereco` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telefone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tipo_pessoa` enum('PF','PJ') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `identificacao` varchar(18) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cuidadores`
--

INSERT INTO `cuidadores` (`id`, `nome`, `endereco`, `email`, `telefone`, `tipo_pessoa`, `identificacao`) VALUES
(2, 'João Souza', 'Av. Paulista, 456, São Paulo, SP', 'joao.souza@example.com', '(11) 99876-5432', 'PF', '98765432100'),
(3, 'Ana Pereira', 'Rua dos Lírios, 789, Rio de Janeiro, RJ', 'ana.pereira@example.com', '(21) 98765-1234', 'PF', '11122233344'),
(4, 'Clinica Bem Estar', 'Rua das Palmeiras, 101, Belo Horizonte, MG', 'contato@bemestar.com', '(31) 98765-6789', 'PJ', '42422841000137'),
(5, 'Saúde e Vida Ltda', 'Av. Brasil, 202, Brasília, DF', 'contato@saudeevida.com', '(61) 99876-1234', 'PJ', '42.422.841/0001-37');

-- --------------------------------------------------------

--
-- Table structure for table `especies`
--

DROP TABLE IF EXISTS `especies`;
CREATE TABLE IF NOT EXISTS `especies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `especies`
--

INSERT INTO `especies` (`id`, `nome`) VALUES
(7, 'Gato'),
(2, 'Cachorro'),
(3, 'Pato');

-- --------------------------------------------------------

--
-- Table structure for table `forms`
--

DROP TABLE IF EXISTS `forms`;
CREATE TABLE IF NOT EXISTS `forms` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `data_envio` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `nome_completo` varchar(100) NOT NULL,
  `data_nascimento` date DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `endereco_completo` text NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `renda_mensal` decimal(10,2) DEFAULT NULL,
  `profissao` varchar(100) DEFAULT NULL,
  `sobre_familia` text,
  `estado_civil` varchar(20) DEFAULT NULL,
  `tem_criancas` tinyint(1) DEFAULT NULL,
  `idade_criancas` varchar(100) DEFAULT NULL,
  `alergia` tinyint(1) DEFAULT NULL,
  `tratamento_medico` text,
  `todos_concordam` tinyint(1) DEFAULT NULL,
  `proprio_ou_alugado` varchar(20) DEFAULT NULL,
  `tipo_imovel` varchar(20) DEFAULT NULL,
  `permite_animais` tinyint(1) DEFAULT NULL,
  `animal_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `animal_id` (`animal_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
