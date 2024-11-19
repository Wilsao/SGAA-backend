const database = require("../database/models");

class StatusAnimalController {
  async obterTodos(req, res) {
    try {
      const statusAnimais = await database.StatusAnimal.findAll();
      if (statusAnimais.length === 0) {
        return res.status(200).json([]); // Lista vazia não é um erro
      }
      return res.json(statusAnimais);
    } catch (error) {
      return res.status(500).json({ error: error.message || "Erro no servidor" });
    }
  }

  async obterPorId(req, res) {
    const id = req.params.id;
    try {
      const statusAnimal = await database.StatusAnimal.findOne({ where: { id: id } });
      if (!statusAnimal)
        return res.status(404).json({ error: "Status do animal não encontrado" });
      return res.status(200).json(statusAnimal);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async obterPorNome(req, res) {
    const nome = req.params.nome;
    try {
      const statusAnimal = await database.StatusAnimal.findOne({ where: { nome: nome } });
      if (!statusAnimal)
        return res.status(404).json({ error: "Status do animal não encontrado" });
      return res.status(200).json(statusAnimal);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async adicionar(req, res) {
    const statusAnimal = req.body;
    try {
      const novoStatusAnimal = await database.StatusAnimal.create(statusAnimal);
      return res.status(201).json(novoStatusAnimal);
    } catch (error) {
      return res.status(500).json({
        mensagem: error.errors[0].message,
      });
    }
  }

  async atualizar(req, res) {
    const id = req.params.id;
    const statusAnimal = req.body;
    try {
      const statusAnimalExistente = await database.StatusAnimal.findByPk(id);
      if (!statusAnimalExistente) {
        return res.status(404).json({ mensagem: "Status do animal não encontrado." });
      }
      await database.StatusAnimal.update(statusAnimal, { where: { id: id } });
      return res
        .status(200)
        .json({ mensagem: "Status do animal atualizado com sucesso." });
    } catch (error) {
      return res.status(500).json({ mensagem: error.errors[0].message });
    }
  }

  async deletar(req, res) {
    const id = req.params.id;
    try {
      const resultado = await database.StatusAnimal.destroy({ where: { id: id } });
      if (resultado === 0) {
        return res.status(404).json({ mensagem: "Status do animal não encontrado." });
      }
      return res.status(200).json({ message: "Status do animal excluído com sucesso" });
    } catch (error) {
      return res.status(500).json({ mensagem: error.errors[0].message });
    }
  }

  async filtrar(req, res) {
    const termobusca = req.params.termobusca;
    try {
      const statusAnimais = await database.StatusAnimal.findAll({
        where: { nome: termobusca },
      });
      return res.status(200).json(statusAnimais);
    } catch (error) {
      return res.status(500).json({ mensagem: error.errors[0].message });
    }
  }
}

module.exports = new StatusAnimalController();
