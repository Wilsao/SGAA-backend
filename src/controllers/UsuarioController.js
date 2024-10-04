const database = require("../database/models");
const { hash } = require("bcryptjs");

const usuarioDTO = require('../dtos/usuario/usuarioDTO');

class UsuarioController {
  async obterTodos(req, res) {
    try {
      const usuarios = await database.Usuario.findAll();

      if (!usuarios)
        return res.status(404).json({ error: 'Nenhum usuario foi encontrado' });

      return res.status(200).json(usuarios);
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async obterPorId(req, res) {
    const id = req.params.id;
    try {
      const usuario = await database.Usuario.findOne({ where: { id: id } });

      if (!usuario)
        return res.status(404).json({ error: 'Usuario não encontrado' });

      return res.status(200).json(usuario);
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async adicionar(req, res) {
    const dados = req.body;
    try {
      let usuario = await database.Usuario.findOne({ where: { id: dados.usuario_id } });
      let tipousuario = await database.TipoUsuario.findOne({ where: { nome: "Administrador" } });

      if (usuario && usuario.tipo_usuario_id == tipousuario.id) {
        const hashSenha = await hash(dados.senha, 10);

        const id = await database.Usuario.create({
          nome: dados.nome,
          email: dados.email,
          senha: hashSenha,
          tipo_usuario_id: dados.tipo_usuario_id
        });

        return res.status(201).json({ message: 'Usuario criado com sucesso', id });
      }

      return res.status(401).json({ error: 'Usuario não autorizado a realizar esta ação' });
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async atualizar(req, res) {
    const id = req.params.id;
    const dados = req.body;
    try {
      await database.Usuario.update(dados, { where: { id: id } });
      return res.status(200).json({ message: 'Usuario atualizado com sucesso' });
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async deletar(req, res) {
    const id = req.params.id;
    const usuario_id = req.params.usuario_id;
    try {
      let usuario = await database.Usuario.findOne({ where: { id: usuario_id } });
      let tipousuario = await database.TipoUsuario.findOne({ where: { nome: "Administrador" } });

      if (usuario && usuario.tipo_usuario_id == tipousuario.id) {

        let usuarioExcluir = await database.Usuario.findOne({ where: { id: id } });

        if (!usuarioExcluir)
          return res.status(404).json({ error: 'Usuario não encontrado' });

        let qtdeAdmins = await database.Usuario.count({ where: { tipo_usuario_id: tipousuario.id } });
        if (usuarioExcluir.tipo_usuario_id == tipousuario.id && qtdeAdmins == 1)
          return res.status(400).json({ error: 'É necessario que exista pelo menos um administrador' });

        await usuarioExcluir.destroy();

        return res.status(200).json({ message: 'Usuario excluido com sucesso' });
      }

      return res.status(401).json({ error: 'Usuario não autorizado a realizar esta ação' });
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async obterPorEmail(req, res) {
    const email = req.body.email;
    try {
      const usuario = await database.Usuario.findOne({ where: { email: email } });

      if (!usuario)
        return res.status(404).json({ error: 'Usuario não encontrado' });

      return res.status(200).json(usuario);
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async ObterPorTipoUsuarioId(req, res) {
    const tipo_id = req.params.tipo;
    try {
      const usuarios = await database.Usuario.findAll({ where: { tipo_usuario_id: tipo_id } });

      if (!usuarios)
        return res.status(404).json({ error: 'Usuario não encontrado' });

      return res.status(200).json(usuarios);
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async autenticar(req, res) {
    const email = req.body.email;
    const senha = req.body.senha;
    try {
      const usuario = await database.Usuario.findOne({ where: { email: email } });
      if (!usuario)
        return res.status(404).json({ error: 'Usuario não encontrado' });
      if (await usuario.validarSenha(senha)) {
        return res.status(200).json({ token: usuario.token });
      }
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async validarSenha(req, res) {
    const email = req.body.email;
    const senha = req.body.senha;
    try {
      const usuario = await database.Usuario.findOne({ where: { email: email } });
      if (!usuario)
        return res.status(404).json({ error: 'Usuario não encontrado' });
      if (await usuario.validarSenha(senha)) {
        return res.status(200).json({ token: usuario.token });
      }
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async definirResposta(req, res) {
    const id = req.body.id;
    const pergunta = req.body.pergunta;
    const resposta = req.body.resposta;

    try {
      await database.Usuario.findOne({ where: { id: id } });

      await database.Usuario.update(
        { pergunta: pergunta, resposta: resposta },
        { where: { id: id } }
      );

      return res.status(200).json({ message: 'Resposta definida com sucesso' });
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async definirNovaSenha(req, res) {
    const id = req.body.id;
    const resposta = req.body.resposta;
    const novaSenha = req.body.novaSenha;
    try {
      const usuario = await database.Usuario.findOne({ where: { id: id } });

      if (resposta === usuario.resposta) {
        const hashNovaSenha = await hash(novaSenha, 10);
        await database.Usuario.update({ senha: hashNovaSenha }, { where: { id: id } });

        return res.status(200).json({ message: 'Senha alterada com sucesso' });
      }

      return res.status(400).json({ error: 'Resposta incorreta' });
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }
}

module.exports = new UsuarioController();