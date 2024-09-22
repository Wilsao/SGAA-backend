const database = require("../database/models");

class TipoUsuarioController {
  async obterTodos(req, res) {
    try {
      const tipos = await database.TipoUsuario.findAll({
        where: { status: true }, 
        include: [{
          model: database.Usuario,
          as: 'usuarios',
          attributes: { exclude: ['senha'] }
        }]
      });
      return res.status(200).json(tipos);
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  async obterPorId(req, res) {
    const id = req.params.id;
    try {
      const tipo = await database.TipoUsuario.findOne({
        where: { id: id },
        include: [{
          model: database.Usuario,
          as: 'usuarios',
          attributes: { exclude: ['senha'] }
        }]
      });

      if (!tipo)
        return res.status(404).json({ error: 'Tipo de usuário não encontrado' });

      return res.status(200).json(tipo);
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  async adicionar(req, res) {
    const { nome, status } = req.body;
    try {
      const novoTipo = await database.TipoUsuario.create({ nome, status });
      return res.status(201).json({ message: 'Tipo de usuário criado com sucesso', tipo: novoTipo });
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  async atualizar(req, res) {
    const id = req.params.id;
    const { nome, status } = req.body;
    try {
      const [updated] = await database.TipoUsuario.update(
        { nome, status },
        { where: { id: id } }
      );

      if (updated) {
        const tipoAtualizado = await database.TipoUsuario.findOne({ where: { id: id } });
        return res.status(200).json({ message: 'Tipo de usuário atualizado com sucesso', tipo: tipoAtualizado });
      }

      return res.status(404).json({ error: 'Tipo de usuário não encontrado' });
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  async deletar(req, res) {
    const id = req.params.id;
    try {
      const deleted = await database.TipoUsuario.destroy({ where: { id: id } });

      if (deleted) {
        return res.status(200).json({ message: 'Tipo de usuário excluído com sucesso' });
      }

      return res.status(404).json({ error: 'Tipo de usuário não encontrado' });
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }
}

module.exports = new TipoUsuarioController();
