const database = require("../database/models");
const { Op } = require("sequelize");
class PessoaController {
  async obterTodos(req, res) {
    try {
      const pessoas = await database.Pessoa.findAll();
      if (!pessoas)
        return res.status(404).json({ error: "Pessoas não encontradas" });

      return res.status(200).json(pessoas);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async obterPorId(req, res) {
    const id = req.params.id;
    try {
      const pessoa = await database.Pessoa.findOne({
        where: { id: id },
      });

      if (!pessoa)
        return res.status(404).json({ error: "Pessoa não encontrada" });

      return res.status(200).json(pessoa);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async obterPorCpf(req, res) {
    const cpf = req.body.cpf;
    try {
      const pessoa = await database.Pessoa.findOne({ where: { cpf: cpf } });
      if (!pessoa)
        return res.status(404).json({ error: "Pessoa não encontrada" });
      return res.status(200).json(pessoa);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async adicionar(req, res) {
    const pessoa = req.body;
    try {
      const pessoaExistente = await database.Pessoa.findOne({
        where: { cpf: pessoa.cpf },
      });
      if (pessoaExistente) {
        return res
          .status(400)
          .json({ error: "Já existe uma pessoa com esse CPF." });
      }
      const novaPessoa = await database.Pessoa.create(pessoa);
      if (!novaPessoa) {
        return res
          .status(500)
          .json({ error: "Não foi possível cadastrar pessoa" });
      }
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
      return res.status(201).json(novaPessoa);
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  async atualizar(req, res) {
    const id = req.params.id;
    const { cpf, ...dadosPessoa } = req.body;
    try {
      const pessoaAtual = await database.Pessoa.findOne({ where: { id } });
      if (cpf) {
        if (pessoaAtual.cpf !== cpf) {
          const pessoaExistente = await database.Pessoa.findOne({
            where: { cpf },
          });
          if (pessoaExistente) {
            return res
              .status(400)
              .json({ error: "Já existe uma pessoa com esse CPF." });
          }
        }
      }
      await database.Pessoa.update(dadosPessoa, { where: { id } });
      return res.status(200).json({ message: "Pessoa atualizada com sucesso" });
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  // Obtém todos os endereços de uma pessoa
  async obterEnderecos(req, res) {
    const pessoaId = req.params.id;
    try {
      const pessoa = await database.Pessoa.findByPk(pessoaId);
      if (!pessoa)
        return res.status(404).json({ error: "Pessoa não encontrada" });

      const enderecos = await database.Endereco.findAll({
        where: { pessoa_id: pessoaId },
      });
      console.log({ enderecos });
      return res.status(200).json(enderecos);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  // Adiciona um novo endereço a uma pessoa
  async addEndereco(req, res) {
    const pessoaId = req.params.id;
    const enderecoData = req.body;
    try {
      const pessoa = await database.Pessoa.findByPk(pessoaId);
      if (!pessoa)
        return res.status(404).json({ message: "Pessoa não encontrada" });
      const novoEndereco = await database.Endereco.create({
        ...enderecoData,
        pessoa_id: pessoaId,
      });
      return res.status(200).json({
        message: "Endereço adicionado com sucesso",
        endereco: novoEndereco,
      });
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  // Atualiza um endereço existente
  async atualizarEndereco(req, res) {
    const pessoaId = req.params.id;
    const enderecoId = req.params.enderecoId;
    let { pessoa_id, id, ...enderecoData } = req.body;
    try {
      const endereco = await database.Endereco.findOne({
        where: {
          id: enderecoId,
          pessoa_id: pessoaId,
        },
      });
      if (!endereco) {
        return res.status(404).json({
          message: "Endereço não encontrado ou não está associado à pessoa",
        });
      }
      await endereco.update(enderecoData);
      return res
        .status(200)
        .json({ message: "Endereço atualizado com sucesso", endereco });
    } catch (erro) {
      return res.status(500).json(erro.message);
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
        return res.status(404).json({
          message: "Endereço não encontrado ou não está associado à pessoa.",
        });
      await endereco.destroy();
      return res
        .status(200)
        .json({ message: "Endereço removido com sucesso." });
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  // Obtém todos os contatos de uma pessoa
  async obterContatos(req, res) {
    const pessoaId = req.params.id;
    try {
      const pessoa = await database.Pessoa.findByPk(pessoaId);

      if (!pessoa)
        return res.status(404).json({ error: "Pessoa não encontrada" });

      const contatos = await database.Contato.findAll({
        where: { pessoa_id: pessoaId },
      });
      return res.status(200).json(contatos);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  // Adiciona um novo contato a uma pessoa
  async addContato(req, res) {
    const pessoaId = req.params.id;
    const { tipo, valor, status } = req.body;
    const tiposPermitidos = ["celular", "telefone", "whatsapp"];
    try {
      const pessoa = await database.Pessoa.findByPk(pessoaId);
      if (!pessoa) {
        return res.status(404).json({ error: "Pessoa não encontrada" });
      }
      if (!tipo || !tiposPermitidos.includes(tipo)) {
        return res.status(400).json({
          error:
            "Tipo de contato inválido. Os tipos permitidos são: celular, telefone, whatsapp.",
        });
      }
      if (!valor) {
        return res
          .status(400)
          .json({ error: "O campo 'valor' é obrigatório." });
      }
      const valorNumerico = valor.replace(/\D/g, "");
      const contatoExistente = await database.Contato.findOne({
        where: { pessoa_id: pessoaId, valor: valorNumerico },
      });
      if (contatoExistente) {
        if (contatoExistente.status === false) {
          await contatoExistente.update({ status: true });
          return res.status(200).json({
            message: "Contato ativado com sucesso",
            contato: contatoExistente,
          });
        }
        return res
          .status(400)
          .json({ error: "Este número já está cadastrado para este usuário." });
      }
      const novoContato = await database.Contato.create({
        tipo,
        valor: valorNumerico,
        status: status ?? true,
        pessoa_id: pessoaId,
      });
      return res.status(200).json({
        message: "Contato adicionado com sucesso",
        contato: novoContato,
      });
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  // Atualiza um contato de uma pessoa
  async atualizarContato(req, res) {
    const pessoaId = req.params.id;
    const contatoId = req.params.contatoId;
    const { tipo, valor, status } = req.body;
    const tiposPermitidos = ["celular", "telefone", "whatsapp"];
    try {
      const contato = await database.Contato.findOne({
        where: {
          id: contatoId,
          [Op.or]: [
            { pessoa_id: pessoaId },
            { id: contatoId, deletedAt: { [Op.ne]: null } }, // Inclui contatos excluídos
          ],
        },
      });
      if (!contato) {
        return res.status(404).json({
          message: "Contato não encontrado ou não está associado à pessoa",
        });
      }
      if (contato.status === false) {
        await contato.update({
          status: true,
          deletedAt: null, // Limpa o campo deletedAt
        });
        return res.status(200).json({
          message: "Contato reativado com sucesso",
          contato,
        });
      }
      if (!tipo || !tiposPermitidos.includes(tipo)) {
        return res.status(400).json({
          error:
            "Tipo de contato inválido. Os tipos permitidos são: celular, telefone, whatsapp.",
        });
      }
      if (!valor) {
        return res
          .status(400)
          .json({ error: "O campo 'valor' é obrigatório." });
      }
      const valorNumerico = valor.replace(/\D/g, "");
      const contatoExistente = await database.Contato.findOne({
        where: {
          pessoa_id: pessoaId,
          valor: valorNumerico,
          id: { [Op.ne]: contatoId },
        },
      });
      if (contatoExistente) {
        if (contatoExistente.status === false) {
          await contatoExistente.update({ status: true });
          return res.status(200).json({
            message: "Contato ativado com sucesso",
            contato: contatoExistente,
          });
        }
        return res.status(400).json({
          error: "Este número já está cadastrado para este usuário.",
        });
      }
      await contato.update({
        tipo,
        valor: valorNumerico,
        status: status ?? contato.status,
      });
      return res.status(200).json({
        message: "Contato atualizado com sucesso",
        contato,
      });
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  // Remove um contato de uma pessoa (logicamente)
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
      if (!contato) {
        return res.status(404).json({
          error: "Contato não encontrado ou não pertence a esta pessoa",
        });
      }
      contato.status = false;
      await contato.save();
      await contato.destroy();
      console.log(
        `Contato com id ${contatoId} foi removido da pessoa ${pessoaId}.`
      );
      return res.status(200).json({ message: "Contato excluído com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir contato:", error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  async deletar(req, res) {
    const id = req.params.id;
    try {
      const resultado = await database.Pessoa.destroy({ where: { id } });
      if (resultado === 0) {
        return res.status(404).json({ error: "Pessoa não encontrada" });
      }
      return res.status(200).json({ message: "Pessoa excluída com sucesso" });
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }
}

module.exports = new PessoaController();
