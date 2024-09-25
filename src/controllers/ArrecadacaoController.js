const database = require("../database/models");

class ArrecadacaoController {
  async obterTodos(req, res) {
    try {
      const arrecadacoes = await database.Arrecadacao.findAll();

      if (!arrecadacoes)
        return res.status(404).json({ error: 'Arrecadacoes não encontradas' });

      return res.status(200).json(arrecadacoes);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async obterPorId(req, res) {
    const id = req.params.id;
    try {
      const arrecadacao = await database.Arrecadacao.findOne({ where: { id: id } });

      if (!arrecadacao)
        return res.status(404).json({ error: 'Arrecadacao não encontrada' });

      return res.status(200).json(arrecadacao);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async adicionar(req, res) {
    const dados = req.body;
    try {
      const id = await database.Arrecadacao.create(dados);
      const arrecadacao = await database.Arrecadacao.findOne({ where: { id: id } });

      return res.status(201).json(arrecadacao);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async atualizar(req, res) {
    const id = req.params.id;
    const dados = req.body;
    try {
      await database.Arrecadacao.update(dados, { where: { id: id } });

      return res.status(200).json({ message: 'Arrecadacao atualizada com sucesso' });
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async deletar(req, res) {
    const id = req.params.id;
    try {
      await database.Arrecadacao.destroy({ where: { id: id } });
      return res.status(200).json({ message: 'Arrecadacao excluída com sucesso' });
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async filtrar(req, res) {
    const termobusca = req.params.termobusca;
    try {
      const arrecadacoes = await database.Arrecadacao.findAll({ where: { descricao: { [Op.like]: '%' + termobusca + '%' } } });
      return res.status(200).json(arrecadacoes);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async filtrarPorAno(req, res) {
    const ano = req.params.ano;
    try {
      const arrecadacoes = await database.Arrecadacao.findAll({ where: { data: ano } });
      return res.status(200).json(arrecadacoes);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

}

module.exports = new ArrecadacaoController();