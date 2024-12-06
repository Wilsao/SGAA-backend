const database = require("../database/models");
const { hash } = require("bcryptjs");
const bcrypt = require("bcryptjs");

class UsuarioController {
  async obterTodos(req, res) {
    try {
      const usuarios = await database.Usuario.findAll();

      if (!usuarios)
        return res.status(404).json({ error: "Nenhum usuario foi encontrado" });

      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }

  async obterPorId(req, res) {
    const id = req.params.id;
    try {
      const usuario = await database.Usuario.findOne({ where: { id: id } });

      if (!usuario)
        return res.status(404).json({ error: "Usuario não encontrado" });

      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }

  async adicionar(req, res) {
    const dados = req.body;
    try {
      let usuario = await database.Usuario.findOne({
        where: { id: dados.usuario_id },
      });
      let tipousuario = await database.TipoUsuario.findOne({
        where: { nome: "Administrador" },
      });

      if (usuario && usuario.tipo_usuario_id == tipousuario.id) {
        const hashSenha = await hash(dados.senha, 10);

        const id = await database.Usuario.create({
          nome: dados.nome,
          email: dados.email,
          senha: hashSenha,
          tipo_usuario_id: dados.tipo_usuario_id,
        });

        return res
          .status(201)
          .json({ message: "Usuario criado com sucesso", id });
      }

      return res
        .status(401)
        .json({ error: "Usuario não autorizado a realizar esta ação" });
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }

  async atualizar(req, res) {
    const id = req.params.id;
    const dados = req.body;
    try {
      // if (dados.email) {
      //   const usuarioExistente = await database.Usuario.findOne({
      //     where: {
      //       email: dados.email,
      //     },
      //   });
      //   if (usuarioExistente) {
      //     return res.status(400).json({
      //       error: "Esse e-mail já está em uso.",
      //     });
      //   }
      // }
      if (dados.senha) {
        dados.senha = await hash(dados.senha, 10);
      }
      await database.Usuario.update(
        {
          ...dados,
          updatedAt: new Date(),
        },
        { where: { id: id } }
      );
      return res
        .status(200)
        .json({ message: "Usuário atualizado com sucesso" });
    } catch (erro) {
      return res.status(500).json({ mensagem: erro.message });
    }
  }

  async deletar(req, res) {
    const id = req.params.id;
    const usuario_id = req.params.usuario_id;
    try {
      console.log(
        `Tentando deletar usuário com id: ${id} pelo administrador: ${usuario_id}`
      );
      await database.Usuario.validarExclusao(id, usuario_id);
      let usuarioExcluir = await database.Usuario.findOne({
        where: { id: id },
      });
      if (!usuarioExcluir) {
        console.error("Usuário a ser excluído não encontrado");
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      await usuarioExcluir.destroy();
      console.log("Usuário excluído com sucesso");
      return res.status(200).json({ message: "Usuário excluído com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  async obterPorEmail(req, res) {
    const { email } = req.body;
    try {
      const usuario = await database.Usuario.findOne({
        where: { email: email },
        include: [
          {
            model: database.Pessoa,
            as: 'pessoa',
            attributes: ['id'],
          },
        ],
      });
      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const responseData = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo_usuario_id: usuario.tipo_usuario_id,
        status: usuario.status,
        pergunta: usuario.pergunta,
        pessoa_id: usuario.pessoa ? usuario.pessoa.id : null,
      };

      return res.status(200).json(responseData);
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }

  async ObterPorTipoUsuarioId(req, res) {
    const tipo_id = req.params.tipo;
    try {
      const usuarios = await database.Usuario.findAll({
        where: { tipo_usuario_id: tipo_id },
      });
      if (usuarios.length === 0) {
        return res.status(404).json({ error: "Nenhum usuário encontrado" });
      }

      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }

  //COMENTEI PQ ACHO QUE NÃO ESTAMOS USANDO EM NENHUM LUGAR
  // async autenticar(req, res) {
  //   const email = req.body.email;
  //   const senha = req.body.senha;
  //   try {
  //     const usuario = await database.Usuario.findOne({
  //       where: { email: email },
  //     });
  //     if (!usuario)
  //       return res.status(404).json({ error: "Usuario não encontrado" });
  //     if (await usuario.validarSenha(senha)) {
  //       return res.status(200).json({ token: usuario.token });
  //     }
  //     return res.status(401).json({ error: "Email ou senha inválidos" });
  //   } catch (erro) {
  //     return res.status(500).json(erro);
  //   }
  // }

  // async validarSenha(req, res) {
  //   const email = req.body.email;
  //   const senha = req.body.senha;
  //   try {
  //     const usuario = await database.Usuario.findOne({
  //       where: { email: email },
  //     });
  //     if (!usuario)
  //       return res.status(404).json({ error: "Usuario não encontrado" });
  //     if (await usuario.validarSenha(senha)) {
  //       return res.status(200).json({ token: usuario.token });
  //     }
  //     return res.status(401).json({ error: "Email ou senha inválidos" });
  //   } catch (erro) {
  //     return res.status(500).json(erro);
  //   }
  // }

  async definirResposta(req, res) {
    const { usuario_id, pergunta, resposta } = req.body;
    try {
      const usuario = await database.Usuario.findOne({
        where: { id: usuario_id },
      });

      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      if (usuario.pergunta && usuario.resposta) {
        return res
          .status(400)
          .json({ error: "Esse usuário já possui uma resposta cadastrada" });
      }
      // const respostaHasheada = await hash(resposta, 10);
      await database.Usuario.update(
        {
          pergunta: pergunta,
          resposta: resposta,
          updatedAt: new Date(),
        },
        { where: { id: usuario_id } }
      );
      return res
        .status(200)
        .json({ message: "Pergunta e resposta definidas com sucesso" });
    } catch (erro) {
      return res.status(500).json({ error: erro });
    }
  }

  async editarResposta(req, res) {
    const usuario_id = req.params.idusuario;
    const { pergunta, resposta } = req.body;
    try {
      const usuario = await database.Usuario.findOne({
        where: { id: usuario_id },
      });

      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      // const respostaHasheada = await hash(resposta, 10);
      await database.Usuario.update(
        {
          pergunta: pergunta,
          resposta: resposta,
          updatedAt: new Date(),
        },
        { where: { id: usuario_id } }
      );
      return res
        .status(200)
        .json({ message: "Pergunta e resposta atualizadas com sucesso" });
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  async definirNovaSenha(req, res) {
    const { usuario_id, resposta, senha } = req.body;
    try {
      if (!usuario_id || !resposta || !senha) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios." });
      }
      const usuario = await database.Usuario.findOne({
        where: { id: usuario_id },
      });

      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      const respostaCorreta = await bcrypt.compare(resposta, usuario.resposta);
      if (respostaCorreta) {
        const hashsenha = await bcrypt.hash(senha, 10);
        await database.Usuario.update(
          { senha: hashsenha },
          { where: { id: usuario_id } },
          { updatedAt: new Date() }
        );

        return res.status(200).json({ message: "Senha alterada com sucesso" });
      }

      return res.status(400).json({ error: "Resposta incorreta" });
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }
}

module.exports = new UsuarioController();
