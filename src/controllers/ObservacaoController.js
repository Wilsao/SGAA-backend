const database = require("../database/models");

class ObservacaoController {
  async obterPorAnimalId(req, res) {
    const id = req.params.id;
    try {
      const observacoes = await database.Observacao.findAll({ where: { animal_id: id } });

      if (observacoes)
        return res.status(200).json(observacoes);

      return res.status(404).json({ message: "Nenhuma observação encontrada" });
    }
    catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async adicionar(req, res) {
    const dados = req.body;
    try {
      const novaObservacao = await database.Observacao.create(dados);
      return res.status(200).json(novaObservacao);
    }
    catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async atualizar(req, res) {
    const id = req.params.id;
    const dados = req.body;
    try {
      await database.Observacao.update(dados, { where: { id: id } });
      return res.status(200).json({ message: "Observação atualizada com sucesso" });
    }
    catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async deletar(req, res) {
    const id = req.params.id;
    try {
      await database.Observacao.destroy({ where: { id: id } });
      return res.status(200).json({ message: "Observação excluída com sucesso" });
    }
    catch (erro) {
      return res.status(500).json(erro.message);
    }
  }
}

module.exports = new ObservacaoController();