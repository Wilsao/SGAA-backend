const database = require('../database/models');

class PessoaController {
  async obterTodos(req, res) {
    try {
      const pessoas = await database.Pessoa.findAll();
      if (!pessoas)
        return res.status(404).json({ error: 'Pessoas não encontradas' });

      return res.status(200).json(pessoas);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async obterPorId(req, res) {
    const id = req.params.id;
    try {
      const pessoa = await database.Pessoa.findOne({
        where: { id: id },
      });

      if (!pessoa)
        return res.status(404).json({ error: 'Pessoa não encontrada' });

      return res.status(200).json(pessoa);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async obterPorCpf(req, res) {
    const cpf = req.body.cpf;
    try {
      const pessoa = await database.Pessoa.findOne({ where: { cpf: cpf } });
      if (!pessoa)
        return res.status(404).json({ error: 'Pessoa não encontrada' });
      return res.status(200).json(pessoa);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async adicionar(req, res) {
    const pessoa = req.body;
    try {
      const novaPessoa = await database.Pessoa.create(pessoa);

      if (!novaPessoa)
        return res.status(500).json({ error: 'Não foi possível cadastrar pessoa' });

      if (pessoa.contatos && pessoa.contatos.length > 0) {
        let contatos = pessoa.contatos.map((contato) => {
          return {
            ...contato,
            pessoa_id: novaPessoa.id,
          };
        });

        novaPessoa.contatos = await database.Contato.bulkCreate(contatos);
      }

      if (pessoa.enderecos && pessoa.enderecos.length > 0) {
        let enderecos = pessoa.enderecos.map((endereco) => {
          return {
            ...endereco,
            pessoa_id: novaPessoa.id,
          };
        });

        novaPessoa.enderecos = await database.Endereco.bulkCreate(enderecos);
      }

      return res.status(200).json(novaPessoa);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async atualizar(req, res) {
    const id = req.params.id;
    const pessoa = req.body;
    try {
      await database.Pessoa.update(pessoa, { where: { id: id } });
      return res.status(200).json({ message: 'Pessoa atualizada com sucesso' });
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  // Obtém todos os endereços de uma pessoa
  async obterEnderecos(req, res) {
    const pessoaId = req.params.id;
    try {
      const pessoa = await database.Pessoa.findByPk(pessoaId);
      if (!pessoa)
        return res.status(404).json({ error: 'Pessoa não encontrada' });

      const enderecos = await database.Endereco.findAll({ where: { pessoa_id: pessoaId } });
      return res.status(200).json(enderecos);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  // Adiciona um novo endereço a uma pessoa
  async addEndereco(req, res) {
    const pessoaId = req.params.id;
    const enderecoData = req.body;

    try {
      const pessoa = await database.Pessoa.findByPk(pessoaId);
      if (!pessoa)
        return res.status(404).json({ message: 'Pessoa não encontrada' });

      const novoEndereco = await database.Endereco.create({
        ...enderecoData,
        pessoa_id: pessoaId,
      });

      return res.status(200).json({ message: 'Endereço adicionado com sucesso', endereco: novoEndereco });
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  // Atualiza um endereço existente
  async atualizarEndereco(req, res) {
    const pessoaId = req.params.id;
    const enderecoId = req.params.enderecoId;
    const enderecoData = req.body;

    try {
      const endereco = await database.Endereco.findOne({
        where: {
          id: enderecoId,
          pessoa_id: pessoaId,
        },
      });

      if (!endereco)
        return res.status(404).json({ message: 'Endereço não encontrado ou não está associado à pessoa' });

      await endereco.update(enderecoData);

      return res.status(200).json({ message: 'Endereço atualizado com sucesso', endereco });
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  // Remove um endereço de uma pessoa
  async removeEndereco(req, res) {
    const pessoaId = req.params.id;
    const enderecoId = req.params.enderecoId;

    try {
      const endereco = await database.Endereco.findOne({
        where: {
          id: enderecoId,
          pessoa_id: pessoaId,
        },
      });

      if (!endereco)
        return res.status(404).json({ message: 'Endereço não encontrado ou não está associado à pessoa' });

      await endereco.destroy();

      return res.status(200).json({ message: 'Endereço removido com sucesso' });
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  // Obtém todos os contatos de uma pessoa
  async obterContatos(req, res) {
    const pessoaId = req.params.id;
    try {
      const pessoa = await database.Pessoa.findByPk(pessoaId);

      if (!pessoa)
        return res.status(404).json({ error: 'Pessoa não encontrada' });

      const contatos = await database.Contato.findAll({ where: { pessoa_id: pessoaId } });
      return res.status(200).json(contatos);
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  // Adiciona um novo contato a uma pessoa
  async addContato(req, res) {
    const pessoaId = req.params.id;
    const contatoData = req.body;

    try {
      const pessoa = await database.Pessoa.findByPk(pessoaId);
      if (!pessoa)
        return res.status(404).json({ error: 'Pessoa não encontrada' });

      const novoContato = await database.Contato.create({
        ...contatoData,
        pessoa_id: pessoaId,
      });

      return res.status(200).json({ message: 'Contato adicionado com sucesso', contato: novoContato });
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }

  // Atualiza um contato existente
  async atualizarContato(req, res) {
    const pessoaId = req.params.id;
    const contatoId = req.params.contatoId;
    const contatoData = req.body;

    try {
      const contato = await database.Contato.findOne({
        where: {
          id: contatoId,
          pessoa_id: pessoaId,
        },
      });

      if (!contato)
        return res.status(404).json({ message: 'Contato não encontrado ou não está associado à pessoa' });

      await contato.update(contatoData);

      return res.status(200).json({ message: 'Contato atualizado com sucesso', contato });
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  // Remove um contato de uma pessoa
  async removeContato(req, res) {
    const pessoaId = req.params.id;
    const contatoId = req.params.contatoId;

    try {
      const contato = await database.Contato.findOne({
        where: {
          id: contatoId,
          pessoa_id: pessoaId,
        },
      });

      if (!contato)
        return res.status(404).json({ message: 'Contato não encontrado ou não está associado à pessoa' });

      await contato.destroy();

      return res.status(200).json({ message: 'Contato removido com sucesso' });
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  async deletar(req, res) {
    const id = req.params.id;
    try {
      await database.Pessoa.destroy({ where: { id: id } });
      return res.status(200).json({ message: 'Pessoa excluída com sucesso' });
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }
}

module.exports = new PessoaController();
