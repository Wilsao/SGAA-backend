const database = require("../database/models");

class EspecieController {
  async obterTodos(req, res) {
    try {
      const especies = await database.Especie.findAll();
      if (especies.length === 0) {
        return res.status(200).json([]); // Lista vazia não é um erro
      }
      return res.json(especies);
    } catch (erro) {
      return res
        .status(500)
        .json({ error: erro.message || "Erro no servidor" });
    }
  }

  async obterPorId(req, res) {
    const id = req.params.id;
    try {
      const especie = await database.Especie.findOne({ where: { id: id } });
      if (!especie)
        return res.status(404).json({ error: "Especie não encontrada" });
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
        return res.status(404).json({ error: "Especie não encontrada" });
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
    } catch (error) {
      return res.status(500).json({
        mensagem: error.errors[0].message,
      });
    }
  }

  async atualizar(req, res) {
    const id = req.params.id;
    const especie = req.body;
    try {
      const especieExistente = await database.Especie.findByPk(id);
      if (!especieExistente) {
        return res.status(404).json({ mensagem: "Espécie não encontrada." });
      }
      await database.Especie.update(especie, { where: { id: id } });
      return res
        .status(200)
        .json({ mensagem: "Espécie atualizada com sucesso." });
    } catch (error) {
      return res.status(500).json({ mensagem: error.errors[0].message });
    }
  }

  async deletar(req, res) {
    const id = req.params.id;
    try {
      const resultado = await database.Especie.destroy({ where: { id: id } });
      if (resultado === 0) {
        return res.status(404).json({ mensagem: "Especie não encontrada." });
      }
      return res.status(200).json({ message: "Especie excluída com sucesso" });
    } catch (error) {
      return res.status(500).json({ mensagem: error.errors[0].message });
    }
  }

  filtrar(req, res) {
    const termobusca = req.params.termobusca;
    try {
      const especies = database.Especie.findAll({
        where: { nome: termobusca },
      });
      return res.status(200).json(especies);
    } catch (error) {
      return res.status(500).json({ mensagem: error.errors[0].message });
    }
  }
}

module.exports = new EspecieController();
