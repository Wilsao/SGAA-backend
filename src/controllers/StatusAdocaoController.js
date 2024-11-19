// controllers/StatusAdocaoController.js

const database = require('../database/models');

class StatusAdocaoController {
  async obterTodos(req, res) {
    try {
      const statusAdocoes = await database.StatusAdocao.findAll();
      return res.status(200).json(statusAdocoes);
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }

  async obterPorId(req, res) {
    const { id } = req.params;
    try {
      const statusAdocao = await database.StatusAdocao.findByPk(id);
      if (!statusAdocao) {
        return res.status(404).json({ error: 'Status de adoção não encontrado' });
      }
      return res.status(200).json(statusAdocao);
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }

  async adicionar(req, res) {
    const { nome, status } = req.body;
    try {
      const novoStatusAdocao = await database.StatusAdocao.create({
        nome,
        status,
      });
      return res.status(201).json(novoStatusAdocao);
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const { nome, status } = req.body;
    try {
      const [updated] = await database.StatusAdocao.update(
        { nome, status },
        { where: { id } }
      );
      if (!updated) {
        return res.status(404).json({ error: 'Status de adoção não encontrado' });
      }
      const updatedStatusAdocao = await database.StatusAdocao.findByPk(id);
      return res.status(200).json(updatedStatusAdocao);
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }

  async excluir(req, res) {
    const { id } = req.params;
    try {
      const deleted = await database.StatusAdocao.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ error: 'Status de adoção não encontrado' });
      }
      return res.status(200).json({ message: 'Status de adoção excluído com sucesso' });
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }
}

module.exports = new StatusAdocaoController();
