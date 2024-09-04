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

INSERT INTO `adocoes` (`id`, `animal_id`, `nome`, `data_nascimento`, `email`, `telefone`, `endereco`, `cidade`, `data_adocao`) VALUES
(1, 1, 'João da Silva', '1990-01-01', 'joao.silva@example.com', '(11) 99999-9999', 'Rua das Flores, 123', 'São Paulo', '2024-06-16 17:46:07'),
(5, 0, 'Wilson A. L. Junior', '1997-09-02', 'wilson@gmail.com', '(12) 31231-2312', 'Rua 21 de Abril, 200', 'Osvaldo Cruz', '2024-06-18 02:43:04');

DROP TABLE IF EXISTS `animais`;
CREATE TABLE IF NOT EXISTS `animais` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `sexo` enum('Macho','Fêmea') COLLATE utf8mb4_general_ci NOT NULL,
  `cor_pelagem` text COLLATE utf8mb4_general_ci,
  `deficiencia` text COLLATE utf8mb4_general_ci,
  `data_ocorrencia` date DEFAULT NULL,
  `data_nascimento_aproximada` date DEFAULT NULL,
  `numero_baia` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `numero_chip` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `condicao_resgate` text COLLATE utf8mb4_general_ci,
  `cuidador` int DEFAULT NULL,
  `especie` int DEFAULT NULL,
  `castracao` tinyint(1) DEFAULT NULL,
  `adocao` tinyint(1) DEFAULT NULL,
  `adotado` tinyint(1) DEFAULT '0',
  `morto` tinyint(1) DEFAULT '0',
  `foto_url` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  KEY `cuidador` (`cuidador`),
  KEY `especie` (`especie`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `animais` (`id`, `nome`, `sexo`, `cor_pelagem`, `deficiencia`, `data_ocorrencia`, `data_nascimento_aproximada`, `numero_baia`, `numero_chip`, `condicao_resgate`, `cuidador`, `especie`, `castracao`, `adocao`, `adotado`, `morto`, `foto_url`) VALUES
(1, 'Rex', 'Macho', 'Preto', '', '2023-05-10', '2022-06-15', 'B-001', '', 'Abandonado', 1, 1, 1, 1, 0, 0, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Black_cat_in_Pamukkale%2C_Turkey.jpg/330px-Black_cat_in_Pamukkale%2C_Turkey.jpg'),
(2, 'Luna', 'Fêmea', 'Marrom', '', '2023-04-20', '2022-05-10', 'B-002', '', 'Resgatado de rua', 1, 1, 1, 1, 0, 0, 'https://t1.ea.ltmcdn.com/pt/razas/0/1/2/havana_210_0_orig.jpg'),
(3, 'Max', 'Macho', 'Marrom', 'Cego de um olho', '2023-03-15', '2023-08-20', 'B-003', '', 'Resgatado de maus tratos', 1, 2, 1, 1, 0, 0, 'https://meusanimais.com.br/wp-content/uploads/2021/08/cachorro-olho-cego.jpg'),
(4, 'Bella', 'Fêmea', 'Branco', '', '2023-02-28', '2022-03-25', 'B-004', '', 'Abandonado', 1, 2, 0, 0, 0, 0, ''),
(5, 'Thor', 'Macho', 'Marrom Claro', '', '2023-01-10', '2022-02-15', 'B-005', '', 'Resgatado de rua', 1, 1, 0, 0, 0, 0, ''),
(6, 'Mia', 'Fêmea', 'Preto', '', '2022-12-05', '2022-01-05', 'B-006', '', 'Resgatado de maus tratos', 1, 1, 1, 0, 0, 0, ''),
(7, 'Zeus', 'Macho', 'Branco e Marrom', '', '2022-11-20', '2021-12-15', 'B-007', '', 'Abandonado', 1, 2, 1, 0, 0, 0, ''),
(8, 'Lola', 'Fêmea', 'Cinza e Branco', '', '2022-10-15', '2021-11-10', 'B-008', '', 'Resgatado de rua', 1, 2, 1, 1, 0, 0, 'https://www.adoropets.com.br/wp-content/uploads/2021/03/boiadeiro-australiano.jpg'),
(9, 'Buddy', 'Macho', 'Preto', '', '2022-09-10', '2021-10-05', 'B-009', '', 'Resgatado de maus tratos', 1, 1, 1, 0, 0, 0, ''),
(10, 'Lucy', 'Fêmea', 'Marrom Escuro', '', '2022-08-05', '2021-09-01', 'B-010', '', 'Abandonado', 1, 1, 1, 0, 0, 0, ''),
(11, 'Charlie', 'Macho', 'Branco', '', '2022-07-01', '2021-08-15', 'B-011', '', 'Resgatado de rua', 1, 2, 1, 0, 0, 0, ''),
(12, 'Daisy', 'Fêmea', 'Cinza Claro', '', '2022-06-15', '2021-07-10', 'B-012', '34234', 'Resgatado de maus tratos', 1, 2, 1, 0, 0, 0, ''),
(13, 'Rocky', 'Macho', 'Preto e Marrom', '', '2022-05-20', '2021-06-05', 'B-013', '1651981', 'Abandonado', 1, 1, 1, 0, 0, 0, ''),
(14, 'Molly', 'Fêmea', 'Branco e Preto', '', '2022-04-10', '2021-05-01', 'B-014', '18181841', 'Resgatado de rua', 1, 1, 1, 0, 0, 0, ''),
(15, 'Oscar', 'Macho', 'Cinza e Branco', '', '2022-03-05', '2021-04-15', 'B-015', '1787165', 'Resgatado de maus tratos', 1, 2, 1, 0, 0, 0, ''),
(16, 'Daniel', 'Macho', 'Branco', '', '1899-11-30', '1899-11-30', '', '', '', 11, 3, 0, 0, 0, 0, 'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRlex2yeMomsbkm0qzpHjtPf8j9QLCDPLZ_brREwaQIrpsnwot3sOfn8Qr3ujA92cho'),
(17, 'Juninho', 'Macho', 'Preto', '', '2024-05-30', '2024-05-10', 'B-016', '', '', 1, 1, 0, 1, 0, 0, 'https://bp2.blogger.com/_dORqaACJFbs/R1Q4Vnf2W-I/AAAAAAAAARg/9oAd2B32zLA/s0-d/Cemit%C3%A9rio+-+filhote+pretinho+ronronando+mais+alto+que+o+motor+do+carro+velho.jpg');

DROP TABLE IF EXISTS `arrecadacoes`;
CREATE TABLE IF NOT EXISTS `arrecadacoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data_evento` date DEFAULT NULL,
  `valor_arrecadado` decimal(10,2) DEFAULT NULL,
  `descricao` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `arrecadacoes` (`id`, `data_evento`, `valor_arrecadado`, `descricao`) VALUES
(2, '2022-03-02', 2000.50, 'Doação para auxiliar no tratamento médico de animais resgatados'),
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
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `castracoes` (`id`, `data_evento`, `tipo_animal`, `sexo_animal`, `quantidade_castrada`, `local_evento`, `descricao`) VALUES
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
(20, '2023-07-25', 'Cachorro', 'Fêmea', 10, 'Centro de Recreação', 'Evento de castração durante programação de atividades recreativas.');

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
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `cuidadores` (`id`, `nome`, `endereco`, `email`, `telefone`, `tipo_pessoa`, `identificacao`) VALUES
(11, 'teste a exclusão', 'teste', 'teste@teste.com', '(12) 83712-9873', 'PF', '161.832.831-00'),
(1, 'SPAA', 'Rua Maria Rebellato, 142 - Colina do Sol - Presidente Prudente - SP', 'spaa@gmail.com', '(18) 18888-8888', 'PJ', '04.670.312/0001-63');

DROP TABLE IF EXISTS `especies`;
CREATE TABLE IF NOT EXISTS `especies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `especies` (`id`, `nome`) VALUES
(1, 'Gato'),
(2, 'Cachorro'),
(3, 'Pato');

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
