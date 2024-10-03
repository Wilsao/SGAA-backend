const database = require('../models');

class PessoaController {
  async obterTodos(req, res) {
    try {
      const pessoas = await database.Pessoa.findAll();
      if (!pessoas)
        return res.status(404).json({ error: 'Pessoas não encontradas' });

      return res.status(200).json(pessoas);
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async obterPorId(req, res) {
    const id = req.params.id;
    try {
      const pessoa = await database.Pessoa.findOne({ where: { id: id } });

      if (!pessoa)
        return res.status(404).json({ error: 'Pessoa não encontrada' });

      return res.status(200).json(pessoa);
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async obterPorCpf(req, res) {
    const cpf = req.params.cpf;
    try {
      const pessoa = await database.Pessoa.findOne({ where: { cpf: cpf } });
      if (!pessoa)
        return res.status(404).json({ error: 'Pessoa não encontrada' });
      return res.status(200).json(pessoa);
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async criar(req, res) {
    const pessoa = req.body;
    try {
      const novaPessoa = await database.Pessoa.create(pessoa);
      return res.status(200).json(novaPessoa);
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async atualizar(req, res) {
    const id = req.params.id;
    const pessoa = req.body;
    try {
      await database.Pessoa.update(pessoa, { where: { id: id } });
      return res.status(200).json({ message: 'Pessoa atualizada com sucesso' });
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async deletar(req, res) {
    const id = req.params.id;
    try {
      await database.Pessoa.destroy({ where: { id: id } });
      return res.status(200).json({ message: 'Pessoa excluida com sucesso' });
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }
}