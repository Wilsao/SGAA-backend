const database = require("../database/models");

class AdocaoController {

  async adicionar(req, res) {
    const { pessoa_id, animal_id, observacao, status_adocao_id, data_inicio, data_fim } = req.body;
    const dados = {
      pessoaId: pessoa_id,
      animalId: animal_id,
      observacao: observacao,
      statusAdocaoId: status_adocao_id,
      dataInicio: data_inicio,
      dataFim: data_fim
    };

    try {
      const novaAdocao = await database.Adocao.create({ dados });

      return res.status(201).json(novaAdocao);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const { pessoa_id, animal_id, observacao, status_adocao_id, data_inicio, data_fim } = req.body;
    const dados = {
      pessoaId: pessoa_id,
      animalId: animal_id,
      observacao: observacao,
      statusAdocaoId: status_adocao_id,
      dataInicio: data_inicio,
      dataFim: data_fim
    };

    try {
      await database.Adocao.update(dados, { where: { id } });
      const adocao = await database.Adocao.findOne({ where: { id } });

      if (!adocao)
        return res.status(404).json({ error: 'Adocão não encontrada' });

      return res.status(200).json(adocao);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async obterTodos(req, res) {
    try {
      const adocoes = await database.Adocao.findAll();
      return res.status(200).json(adocoes);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async obterPorId(req, res) {
    const { id } = req.params;

    try {
      const adocao = await database.Adocao.findOne({ where: { id } });

      if (!adocao)
        return res.status(404).json({ error: 'Adocão não encontrada' });

      return res.status(200).json(adocao);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async excluir(req, res) {
    const { id } = req.params;
    try {
      await database.Adocao.destroy({ where: { id: id } });

      res.status(200).json({ message: 'Adoção excluida com sucesso' });
    } catch (error) {
      console.log('Erro ao tentar excluir adocão', error);
      res.status(500).json({ error: 'Erro ao tentar excluir adocão' + error });
    }
  }
}

module.exports = new AdocaoController();
