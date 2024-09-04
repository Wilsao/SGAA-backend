const database = require("../database/models");

class AdocaoController {
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
}

module.exports = new AdocaoController();
