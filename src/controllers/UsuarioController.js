const database = require("../models");

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

      if (!adocao)
        return res.status(404).json({ error: 'Adocão não encontrada' });

      return res.status(200).json(usuario);
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }
}

module.exports = new UsuarioController();