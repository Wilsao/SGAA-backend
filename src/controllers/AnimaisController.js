const database = require("../database/models");

class AnimaisController {
  async obterTodos(req, res) {
    try {
      const animais = await database.Animal.findAll();

      if (!animais)
        return res.status(404).json({ error: 'Animais não encontrados' });

      return res.json(animais);
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async obterPorId(req, res) {
    const id = req.params.id;
    try {
      const animal = await database.Animal.findOne({ where: { id: id } });

      if (!animal)
        return res.status(404).json({ error: 'Animal não encontrado' });

      return res.json(animal);
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async adicionar(req, res) {
    const dados = req.body;
    try {
      const id = await database.Animal.create(dados);
      const animal = await database.Animal.findOne({ where: { id: id } });
      return res.status(201).json(animal);
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async atualizar(req, res) {
    const id = req.params.id;
    const dados = req.body;
    try {
      await database.Animal.update(dados, { where: { id: id } });
      return res.status(200).json({ message: 'Animal atualizado com sucesso' });
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async deletar(req, res) {
    const id = req.params.id;
    try {
      await database.Animal.destroy({ where: { id: id } });
      return res.status(200).json({ message: 'Animal excluido com sucesso' });
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async filtrar(req, res) {
    const termobusca = req.params.termobusca;
    try {
      const animais = await database.Animal.findAll({ where: { nome: termobusca } });
      if (!animais)
        return res.status(404).json({ error: 'Nenhum animal encontrado' });

      return res.status(200).json(animais);
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }
}

module.exports = new AnimaisController();