const database = require("../database/models");
const { Op } = require("sequelize");

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

  // async ObterImagensPorAnimalId(req, res) {
  //   const id = req.param.id;
  //   try {
  //     const files = database.Imagem.findAll({ where: { animal_id: id } });

  //     if (!files)
  //       return res.status(404).json({ error: "Nenhuma imagem encontrada" });

  //     return res.status(200).json(files);
  //   } catch (error) {
  //     return res.status(500).json("message: " + error.errors[0].message);
  //   }
  // }
}

module.exports = new AnimaisController();
