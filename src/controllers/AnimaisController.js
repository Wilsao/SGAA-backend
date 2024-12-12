const database = require("../database/models");
const { Op, where } = require("sequelize");
const path = require("path");
const fs = require("fs");
const PDFDocument = require('pdfkit');

class AnimaisController {
  async obterTodos(req, res) {
    try {
      const { status_animal_id, especie_id, sexo, castrado } = req.query;
  
      const whereConditions = {};
  
      if (status_animal_id) {
        whereConditions.status_animal_id = parseInt(status_animal_id, 10);
      }
  
      if (especie_id) {
        whereConditions.especie_id = parseInt(especie_id, 10);
      }
  
      if (sexo) {
        whereConditions.sexo = sexo.toUpperCase(); 
      }

      const animais = await database.Animal.findAll({
        where: whereConditions,
        include: [
          {
            model: database.Pessoa,
            as: "responsavel",
            attributes: ["id", "nome"],
          },
          {
            model: database.StatusAnimal,
            as: "statusAnimal",
            attributes: ["id", "nome"],
          },
          {
            model: database.Especie,
            as: "especie",
            attributes: ["id", "nome"],
          },
        ],
      });
  
      if (!animais || animais.length === 0)
        return res.status(404).json({ error: "Animais não encontrados" });
  
      return res.json(animais);
    } catch (erro) {
      console.error('Erro no método obterTodos:', erro);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async obterPorId(req, res) {
    const id = req.params.id;
    try {
      const animal = await database.Animal.findOne({
        where: { id: id },
        include: [
          {
            model: database.Pessoa,
            as: "responsavel",
            attributes: ["id", "nome"],
          },
        ],
      });

      if (!animal)
        return res.status(404).json({ error: "Animal não encontrado" });

      return res.json(animal);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async adicionar(req, res) {
    const dados = req.body;
    try {
      const animal = await database.Animal.create(dados);
      return res.status(201).json(animal);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async atualizar(req, res) {
    const id = req.params.id;
    const dados = req.body;
    try {
      const animalExistente = await database.Animal.findByPk(id);
      if (!animalExistente) {
        return res.status(404).json({ error: "Animal não encontrado" });
      }

      await database.Animal.update(dados, { where: { id: id } });
      return res.status(200).json({ message: "Animal atualizado com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async deletar(req, res) {
    const id = req.params.id;
    try {
      const resultado = await database.Animal.destroy({ where: { id: id } });
      if (resultado === 0) {
        return res.status(404).json({ mensagem: "Animal não encontrado." });
      }
      return res.status(200).json({ message: "Animal excluido com sucesso" });
    } catch (error) {
      return res.status(500).json("message: " + error);
    }
  }

  async filtrar(req, res) {
    const { termobusca } = req.params;
    try {
      const animais = await database.Animal.findAll({
        where: {
          [Op.or]: [
            { nome: { [Op.like]: `%${termobusca}%` } },
            { cor_pelagem: { [Op.like]: `%${termobusca}%` } },
            { deficiencia: { [Op.like]: `%${termobusca}%` } },
            { numero_baia: { [Op.like]: `%${termobusca}%` } },
            { numero_chip: { [Op.like]: `%${termobusca}%` } },
            { condicao_resgate: { [Op.like]: `%${termobusca}%` } },
          ],
        },
      });
      if (!animais)
        return res.status(404).json({ error: "Nenhum animal encontrado" });

      return res.status(200).json(animais);
    } catch (error) {
      return res.status(500).json("message: " + error);
    }
  }

  async adicionarImagens(req, res) {
    console.log('adicionando imagem');
    try {
      console.log('Animal ID:', req.params.animal_id);
      console.log('Received file:', req.file);

      if (!req.file) {
        return res.status(400).json({ error: 'Nenhuma imagem foi enviada.' });
      }

      const fileData = {
        animal_id: req.params.animal_id,
        nome: req.file.originalname,
        key: req.file.filename,
        createdAt: new Date(),
      };

      const image = await database.Imagem.create(fileData);
      return res.status(201).json(image);
    } catch (error) {
      console.error('Error in adicionarImagens:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  async listarImagens(req, res) {
    try {
      const animal_id = req.params.id;

      const imagens = await database.Imagem.findAll({ where: { animal_id: animal_id } });
      if (imagens.length > 0) {
        const nomesArquivosBanco = imagens.map(image => image.key);

        const directoryPath = path.resolve('uploads');

        fs.readdir(directoryPath, (err, files) => {
          if (err) {
            return res.status(500).json({ message: "Erro ao ler a pasta de uploads.", error: err.message });
          }

          const images = files
            .filter(file => nomesArquivosBanco.includes(file))
            .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
            .map(file => {
              const imagemCorrespondente = imagens.find(imagem => imagem.key === file);

              return {
                key: imagemCorrespondente.key,
                nome: imagemCorrespondente.nome,
                url: `/uploads/${file}`
              };
            });

          if (images.length === 0)
            return res.status(404).json({ error: "Nenhuma imagem encontrada" });

          return res.status(200).json(images);
        });
      } else {
        return res.status(404).json({ error: "Animal não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao obter imagens:", error);
      return res.status(500).json({ message: "Erro ao obter imagens.", error: error.message });
    }
  }

  async deletarImagem(req, res) {
    try {
      const { key } = req.params;

      const imagem = await database.Imagem.findOne({ where: { key } });
      if (!imagem) {
        return res.status(404).json({ error: 'Imagem não encontrada.' });
      }

      const filePath = path.resolve('uploads', key);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Erro ao deletar arquivo:', err);
        }
      });

      await imagem.destroy();

      return res.status(200).json({ message: 'Imagem excluída com sucesso.' });
    } catch (error) {
      console.error('Erro ao excluir imagem:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  async relatorio(req, res) {
    const { dataInicio, dataFim, sexo, especie_id, status_animal_id } = req.query;

    const filtro = {};

    if (dataInicio) {
      filtro.createdAt = {
        ...filtro.createdAt,
        [Op.gte]: new Date(dataInicio),
      };
    }

    if (dataFim) {
      filtro.createdAt = {
        ...filtro.createdAt,
        [Op.lte]: new Date(dataFim),
      };
    }

    if (sexo) {
      filtro.sexo = {
        [Op.like]: `%${sexo}%`,
      };
    }

    if (status_animal_id) {
      filtro.status_animal_id = status_animal_id;
    }

    if (especie_id) {
      filtro.especie_id = especie_id;
    }

    try {
      const animais = await database.Animal.findAll({
        where: filtro,
        include: [
          {
            model: database.Pessoa,
            as: 'responsavel', // Usa o alias definido na associação `responsavel`
            attributes: ['id', 'nome'],
          },
          {
            model: database.Pessoa,
            as: 'adotantes', // Usa o alias definido na associação `adotantes` (muitos-para-muitos)
            attributes: ['id', 'nome'],
            through: { attributes: [] }, // Exclui campos da tabela pivô `Adocao` (se necessário)
          },
          {
            model: database.StatusAnimal,
            as: 'statusAnimal', // Alias definido para o status
            attributes: ['id', 'nome'],
          },
          {
            model: database.Especie,
            as: 'especie', // Alias definido para a espécie
            attributes: ['id', 'nome'],
          },
        ],
      });

      return res.status(200).json(animais);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async relatorioPDF(req, res) {
    const { dataInicio, dataFim, sexo, especie_id, status_animal_id } = req.query;

    const filtro = {};

    if (dataInicio) {
      filtro.createdAt = {
        ...filtro.createdAt,
        [Op.gte]: new Date(dataInicio),
      };
    }

    if (dataFim) {
      filtro.createdAt = {
        ...filtro.createdAt,
        [Op.lte]: new Date(dataFim),
      };
    }

    if (sexo) {
      filtro.sexo = {
        [Op.like]: `%${sexo}%`,
      };
    }

    if (status_animal_id) {
      filtro.status_animal_id = status_animal_id;
    }

    if (especie_id) {
      filtro.especie_id = especie_id;
    }

    try {
      const animais = await database.Animal.findAll({
        where: filtro,
        include: [
          {
            model: database.Pessoa,
            as: 'responsavel',
            attributes: ['id', 'nome'],
          },
          {
            model: database.Pessoa,
            as: 'adotantes',
            attributes: ['id', 'nome'],
            through: { attributes: [] },
          },
          {
            model: database.StatusAnimal,
            as: 'statusAnimal',
            attributes: ['id', 'nome'],
          },
          {
            model: database.Especie,
            as: 'especie',
            attributes: ['id', 'nome'],
          },
        ],
      });

      // Configura o cabeçalho HTTP para envio do PDF
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=relatorio_animais.pdf');

      // Criação do PDF com tamanho A4
      const doc = new PDFDocument({ size: 'A4' });
      doc.pipe(res); // Envia o PDF diretamente para a resposta HTTP

      // Adiciona título e informações gerais
      doc.fontSize(16).text('Relatório de Animais', { align: 'center' }).moveDown(1);
      doc.fontSize(10).text(`Período: ${dataInicio || 'Não especificado'} a ${dataFim || 'Não especificado'}`).moveDown(1);

      // Alinhar altura do cabeçalho da tabela
      const headerY = doc.y; // Posição Y do cabeçalho

      // Tabela com as informações dos animais
      doc.fontSize(10).font('Helvetica-Bold');
      doc.text('ID', 50, headerY, { width: 40, align: 'center' });
      doc.text('Nome', 90, headerY, { width: 120, align: 'center' });
      doc.text('Sexo', 210, headerY, { width: 40, align: 'center' });
      doc.text('Espécie', 250, headerY, { width: 80, align: 'center' });
      doc.text('Status', 330, headerY, { width: 60, align: 'center' });
      doc.text('Responsável', 400, headerY, { width: 100, align: 'center' });
      doc.moveDown(0.5);

      // Desenhando a linha de separação do cabeçalho
      doc.moveTo(50, headerY + 10) // Linha de separação
        .lineTo(550, headerY + 10)
        .stroke();
      doc.moveDown(0.5);

      // Preenchimento da tabela com os dados dos animais
      animais.forEach((animal, index) => {
        const { id, nome, sexo, especie, statusAnimal, responsavel } = animal;

        const startY = doc.y + 10; // Define a posição Y para cada linha

        // Desenhando as células da tabela para cada linha
        doc.text(id, 50, startY, { width: 40, align: 'center' });
        doc.text(nome, 90, startY, { width: 120, align: 'center' });
        doc.text(sexo, 210, startY, { width: 40, align: 'center' });
        doc.text(especie?.nome || 'Não especificado', 250, startY, { width: 80, align: 'center' });
        doc.text(statusAnimal?.nome || 'Não especificado', 330, startY, { width: 60, align: 'center' });
        doc.text(responsavel?.nome || 'Não especificado', 400, startY, { width: 100, align: 'center' });

        doc.moveDown(0.5);
      });

      // Desenhando as linhas horizontais de separação para cada linha de animal
      animais.forEach(() => {
        const startY = doc.y + 10;
        doc.moveTo(50, startY) // Linha de separação das linhas da tabela
          .lineTo(550, startY)
          .stroke();
      });

      // Finaliza o documento e envia a resposta
      doc.end();
    } catch (erro) {
      res.status(500).json({ message: erro.message });
    }
  }



}

module.exports = new AnimaisController();
