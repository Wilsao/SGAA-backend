const database = require("../database/models");
const { hash } = require("bcryptjs");

class UsuarioController {
  async obterTodos(req, res) {
    try {
      const usuarios = await database.Usuario.findAll();
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
      const hashSenha = await hash(dados.senha, 10);
      const id = await database.Usuario.create({
        nome: dados.nome,
        email: dados.email,
        senha: hashSenha,
        tipo_usuario_id: dados.tipo_usuario_id
      });

      return res.status(201).json({ message: 'Usuario criado com sucesso', id });
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
    try {
      await database.Usuario.destroy({ where: { id: id } });
      return res.status(200).json({ message: 'Usuario excluido com sucesso' });
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

      return res.status(200).json({ usuario });
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async ObterPorTipoUsuarioId(req, res) {
    const tipo_id = req.params.tipo;
    try {
      const usuarios = await database.Usuario.findAll({ where: { tipo_usuario_id: tipo_id } });
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

  async obterPorToken(req, res) {
    const token = req.body.token;
    try {
      const usuario = await database.Usuario.findOne({ where: { token: token } });
      if (!usuario)
        return res.status(404).json({ error: 'Usuario não encontrado' });
      return res.status(200).json({ token: usuario.token });
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }
}

module.exports = new UsuarioController();