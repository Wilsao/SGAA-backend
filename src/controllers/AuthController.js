const database = require('../database/models');
const { sign } = require('jsonwebtoken');
const { compare } = require('bcryptjs');

class AuthController {
  async Login(req, res) {
    const { email, senha } = req.body;

    try {
      const usuario = await database.Usuario.findOne({
        attributes: ['senha'],
        where: {
          email: email
        }
      });

      if (!usuario)
        return res.status(404).json({ error: 'Usuario não encontrado' });

      const login = await compare(senha, usuario.senha);
      if (!login)
        return res.status(401).json({ error: 'Email ou senha inválidos' });

      const accessToken = sign(
        {
          id: usuario.id,
          email: usuario.email
        },
        "secret",
        { expiresIn: 86400 }
      );

      return res.status(200).json({ token: accessToken });
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }
}

module.exports = new AuthController();