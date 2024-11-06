const database = require("../database/models");

class CuidadoController {
  async obterCuidadoPorUsuario(req, res) {
    const id = req.params.id;
    try {
      const cuidados_id = await database.CuidadoRealizado.findAll({ where: { usuario_id: id } });

      if (cuidados_id.length > 0) {
        const cuidados = await database.Cuidado.findAll({
          where: {
            id: cuidados_id.map((cuidado) => cuidado.cuidado_id)
          }
        });

        if (cuidados)
          return res.status(200).json(cuidados);
      }

      return res.status(404).json({ message: "Nenhum cuidado encontrado" });
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async obterCuidadosPorAnimal(req, res) {
    const id = req.params.id;
    try {
      const cuidados = await database.Cuidado.findAll({ where: { animal_id: id } });

      if (cuidados)
        return res.status(200).json(cuidados);

      return res.status(404).json({ message: "Nenhum cuidado encontrado" });
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async adicionar(req, res) {
    const dados = req.body;
    try {
      const novoCuidado = await database.Cuidado.create(dados);
      return res.status(200).json(novoCuidado);
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async atualizar(req, res) {
    const id = req.params.id;
    const dados = req.body;
    try {
      await database.Cuidado.update(dados, { where: { id: id } });
      return res.status(200).json({ message: "Cuidado atualizado com sucesso" });
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }

  async deletar(req, res) {
    const id = req.params.id;
    try {
      await database.Cuidado.destroy({ where: { id: id } });
      return res.status(200).json({ message: "Cuidado excluído com sucesso" });
    }
    catch (erro) {
      return res.status(500).json(erro);
    }
  }
}
module.exports = new CuidadoController();