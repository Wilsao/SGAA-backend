const database = require("../database/models");

class EspecieController {

  async obterTodos(req, res) {
    try {
      const especies = await database.Especie.findAll();

      if (!especies)
        return res.status(404).json({ error: 'Especies não encontradas' });

      return res.status(200).json(especies);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async obterPorId(req, res) {
    const id = req.params.id;
    try {
      const especie = await database.Especie.findOne({ where: { id: id } });

      if (!especie)
        return res.status(404).json({ error: 'Especie não encontrada' });

      return res.status(200).json(especie);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async obterPorNome(req, res) {
    const nome = req.params.nome;
    try {
      const especie = await database.Especie.findOne({ where: { nome: nome } });

      if (!especie)
        return res.status(404).json({ error: 'Especie não encontrada' });

      return res.status(200).json(especie);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async adicionar(req, res) {
    const especie = req.body;
    try {
      const novaEspecie = await database.Especie.create(especie);
      return res.status(201).json(novaEspecie);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async atualizar(req, res) {
    const id = req.params.id;
    const especie = req.body;
    try {
      await database.Especie.update(especie, { where: { id: id } });
      return res.status(200).json({ message: 'Especie atualizada com sucesso' });
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async deletar(req, res) {
    const id = req.params.id;
    try {
      await database.Especie.destroy({ where: { id: id } });
      return res.status(200).json({ message: 'Especie excluida com sucesso' });
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  filtrar(req, res) {
    const termobusca = req.params.termobusca;
    try {
      const especies = database.Especie.findAll({ where: { nome: termobusca } });
      return res.status(200).json(especies);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }
}

module.exports = new EspecieController();