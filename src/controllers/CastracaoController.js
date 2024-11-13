const database = require("../database/models");
const { Op } = require("sequelize");

class CastracaoController {
  async obterTodos(req, res) {
    try {
      const castracoes = await database.Castracao.findAll();

      if (!castracoes)
        return res.status(404).json({ error: "Castracoes não encontradas" });

      return res.status(200).json(castracoes);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async obterPorId(req, res) {
    const { id } = req.params;
    try {
      const castracao = await database.Castracao.findOne({ where: { id: id } });

      if (!castracao)
        return res.status(404).json({ error: "Castracao não encontrada" });

      return res.status(200).json(castracao);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async inserir(req, res) {
    const castracao = req.body;
    try {
      const novaCastracao = await database.Castracao.create(castracao);
      return res.status(201).json(novaCastracao);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const castracao = req.body;

    try {
      await database.Castracao.update(castracao, { where: { id: id } });

      return res
        .status(200)
        .json({ message: "Castracao atualizada com sucesso" });
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async excluir(req, res) {
    const id  = req.params.id;
    try {
      const resultado = await database.Castracao.destroy({ where: { id: id } });
      if (resultado === 0) {
        return res.status(404).json({ mensagem: "Castração não encontrada." });
      }
      return res.status(200).json({ message: "Item removido" });
    } catch (error) {
      console.log("Erro ao tentar excluir castração", error);
      res
        .status(500)
        .json({ error: "Erro ao tentar excluir castração" + error });
    }
  }

  async filtrar(req, res) {
    const { termobusca } = req.params;
    try {
      const castracoes = await database.Castracao.findAll({
        where: {
          [Op.or]: [
            { local_evento: { [Op.like]: `%${termobusca}%` } },
            { descricao: { [Op.like]: `%${termobusca}%` } },
          ],
        },
      });
      return res.status(200).json(castracoes);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }
}

module.exports = new CastracaoController();
