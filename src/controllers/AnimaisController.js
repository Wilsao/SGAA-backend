const database = require("../database/models");
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");

class AnimaisController {
  async obterTodos(req, res) {
    try {
      const animais = await database.Animal.findAll();

      if (!animais)
        return res.status(404).json({ error: "Animais não encontrados" });

      return res.json(animais);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async obterPorId(req, res) {
    const id = req.params.id;
    try {
      const animal = await database.Animal.findOne({ where: { id: id } });

      if (!animal)
        return res.status(404).json({ error: "Animal não encontrado" });

      return res.json(animal);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async adicionar(req, res) {
    const dados = req.body;
    try {
      const animal = await database.Animal.create(dados);
      return res.status(201).json(animal);
    } catch (error) {
      return res.status(500).json("message: " + error.errors[0].message);
    }
  }

  async atualizar(req, res) {
    const id = req.params.id;
    const dados = req.body;
    try {
      await database.Animal.update(dados, { where: { id: id } });
      return res.status(200).json({ message: "Animal atualizado com sucesso" });
    } catch (error) {
      return res.status(500).json("message: " + error.errors[0].message);
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
      return res.status(500).json("message: " + error.errors[0].message);
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
      return res.status(500).json("message: " + error.errors[0].message);
    }
  }

  async adicionarImagens(req, res) {
    try {
      const files = {
        animal_id: req.params.animal_id,
        nome: req.file.originalname,
        key: req.file.filename
      };

      const images = await database.Imagem.create(files);
      return res.status(201).json(images);
    } catch (error) {
      return res.status(500).json("message: " + error.errors[0].message);
    }
  }

  async listarImagens(req, res) {
    try {
      const animal_id = req.params.id;

      // Consulta o banco de dados para obter as imagens associadas ao animal_id
      const imagens = await database.Imagem.findAll({ where: { animal_id: animal_id } });

      // Extrai os nomes dos arquivos salvos no banco
      const nomesArquivosBanco = imagens.map(image => image.key);

      // Define o caminho da pasta "uploads"
      const directoryPath = path.resolve('uploads');

      // Lê todos os arquivos da pasta "uploads"
      fs.readdir(directoryPath, (err, files) => {
        if (err) {
          return res.status(500).json({ message: "Erro ao ler a pasta de uploads.", error: err.message });
        }

        // Filtra apenas arquivos de imagem e que estão no array nomesArquivosBanco
        const images = files
          .filter(file => nomesArquivosBanco.includes(file))
          .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
          .map(file => ({
            nome: file.split('_').slice(1).join('_'),
            url: `/uploads/${file}`
          }));

        if (images.length === 0)
          return res.status(404).json({ error: "Nenhuma imagem encontrada" });

        return res.status(200).json(images);
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao obter imagens.", error: error.message });
    }
  }
}

module.exports = new AnimaisController();
