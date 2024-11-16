const database = require("../database/models");

class AdocaoController {
  async adicionar(req, res) {
    const {
      pessoa_id,
      animal_id,
      observacao,
      status_adocao_id,
      data_inicio,
      data_fim,
    } = req.body;

    try {
      const novaAdocao = await database.Adocao.create({
        pessoaId: pessoa_id,
        animalId: animal_id,
        observacao: observacao,
        statusAdocaoId: status_adocao_id,
        dataInicio: data_inicio,
        dataFim: data_fim,
      });

      return res.status(201).json(novaAdocao);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const {
      pessoa_id,
      animal_id,
      observacao,
      status_adocao_id,
      data_inicio,
      data_fim,
    } = req.body;

    try {
      const [updated] = await database.Adocao.update(
        {
          pessoaId: pessoa_id,
          animalId: animal_id,
          observacao: observacao,
          statusAdocaoId: status_adocao_id,
          dataInicio: data_inicio,
          dataFim: data_fim,
        },
        { where: { id } }
      );

      if (!updated)
        return res.status(404).json({ error: "Adoção não encontrada" });

      const adocao = await database.Adocao.findOne({ where: { id } });

      return res.status(200).json(adocao);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async obterTodos(req, res) {
    try {
      const adocoes = await database.Adocao.findAll();
      return res.status(200).json(adocoes);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async obterPorId(req, res) {
    const { id } = req.params;

    try {
      const adocao = await database.Adocao.findOne({ where: { id } });

      if (!adocao)
        return res.status(404).json({ error: "Adocão não encontrada" });

      return res.status(200).json(adocao);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async excluir(req, res) {
    const { id } = req.params;
    try {
      await database.Adocao.destroy({ where: { id: id } });

      res.status(200).json({ message: "Adoção excluida com sucesso" });
    } catch (erro) {
      console.log("Erro ao tentar excluir adocão: ", erro.message);
      res.status(500).json(erro.message);
    }
  }
}

module.exports = new AdocaoController();
