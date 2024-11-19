const database = require("../database/models");
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");

class AnimaisController {
  async obterTodos(req, res) {
    try {
      const animais = await database.Animal.findAll({
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

      if (!animais)
        return res.status(404).json({ error: "Animais não encontrados" });

      return res.json(animais);
    } catch (erro) {
      return res.status(500).json(erro.message);
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
}

module.exports = new AnimaisController();
