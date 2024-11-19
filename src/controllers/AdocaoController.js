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
        pessoa_id: pessoa_id,
        animal_id: animal_id,
        observacao: observacao,
        status_adocao_id: status_adocao_id || 1,
        data_inicio: data_inicio || new Date(),
        data_fim: data_fim,
      });

      return res.status(201).json(novaAdocao);
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const {
      status_adocao_id,
      observacao,
    } = req.body;

    try {
      const [updated] = await database.Adocao.update(
        {
          status_adocao_id: status_adocao_id,
          observacao: observacao,
          updatedAt: new Date(),
        },
        { where: { id } }
      );

      if (!updated)
        return res.status(404).json({ error: "Adoção não encontrada" });

      const adocao = await database.Adocao.findOne({ where: { id } });

      return res.status(200).json(adocao);
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  async obterTodos(req, res) {
    const { status_adocao_id } = req.query;
    const where = {};

    if (status_adocao_id) {
      where.status_adocao_id = status_adocao_id;
    }

    try {
      const adocoes = await database.Adocao.findAll({
        where,
        include: [
          {
            model: database.Pessoa,
            as: 'pessoa',
            attributes: ['id', 'nome'],
          },
          {
            model: database.Animal,
            as: 'animal',
            attributes: ['id', 'nome'],
          },
          {
            model: database.StatusAdocao,
            as: 'status_adocao',
            attributes: ['id', 'nome'],
          },
        ],
      });

      return res.status(200).json(adocoes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async obterPorId(req, res) {
    const { id } = req.params;

    try {
      const adocao = await database.Adocao.findOne({
        where: { id },
        include: [
          {
            model: database.Pessoa,
            as: 'pessoa',
            attributes: ['id', 'nome'],
          },
          {
            model: database.Animal,
            as: 'animal',
            attributes: ['id', 'nome'],
          },
          {
            model: database.StatusAdocao,
            as: 'status_adocao',
            attributes: ['id', 'nome'],
          },
        ],
      });

      if (!adocao)
        return res.status(404).json({ error: "Adoção não encontrada" });

      return res.status(200).json(adocao);
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  async excluir(req, res) {
    const { id } = req.params;
    try {
      await database.Adocao.destroy({ where: { id: id } });

      res.status(200).json({ message: "Adoção excluída com sucesso" });
    } catch (erro) {
      res.status(500).json({ error: erro.message });
    }
  }
}

module.exports = new AdocaoController();
