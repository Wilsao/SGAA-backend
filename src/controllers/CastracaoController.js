const database = require("../database/models");
const { Op } = require("sequelize");
const PDFDocument = require('pdfkit');

class CastracaoController {
  async obterTodos(req, res) {
    try {
      const now = new Date();
      const inicio = new Date();
      inicio.setDate(now.getDate() - 30);

      const castracoes = await database.Castracao.findAll({
        where: {
          createdAt: {
            [Op.gte]: inicio, // 1 dia atrás
            [Op.lte]: now, // Agora
          },
        },
      });

      if (!castracoes)
        return res.status(404).json({ error: "Castracoes não encontradas" });

      return res.status(200).json(castracoes);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async obterPorId(req, res) {
    const { id } = req.params;
    try {
      const castracao = await database.Castracao.findOne({ where: { id: id } });

      if (!castracao)
        return res.status(404).json({ error: "Castracao não encontrada" });

      return res.status(200).json(castracao);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async inserir(req, res) {
    const castracao = req.body;
    try {
      const novaCastracao = await database.Castracao.create(castracao);
      return res.status(201).json(novaCastracao);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const castracao = req.body;

    try {
      await database.Castracao.update(castracao, { where: { id: id } });

      return res
        .status(200)
        .json({ message: "Castracao atualizada com sucesso" });
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async excluir(req, res) {
    const id = req.params.id;
    try {
      const resultado = await database.Castracao.destroy({ where: { id: id } });
      if (resultado === 0) {
        return res.status(404).json({ mensagem: "Castração não encontrada." });
      }
      return res.status(200).json({ message: "Item removido" });
    } catch (error) {
      console.log("Erro ao tentar excluir castração", error.message);
      res
        .status(500)
        .json({ error: "Erro ao tentar excluir castração" + error.message });
    }
  }

  async filtrar(req, res) {
    const { termobusca } = req.params;
    try {
      const castracoes = await database.Castracao.findAll({
        where: {
          [Op.or]: [
            { local_evento: { [Op.like]: `%${termobusca}%` } },
            { descricao: { [Op.like]: `%${termobusca}%` } },
          ],
        },
      });
      return res.status(200).json(castracoes);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async relatorio(req, res) {
    const { dataInicio, dataFim } = req.query;

    if (!dataInicio || !dataFim)
      return res.status(400).json({ error: 'Os parâmetros dataInicio e dataFim são obrigatórios.' });

    try {
      const castracoes = await database.Castracao.findAll({
        where: {
          createdAt: {
            [Op.gte]: new Date(dataInicio),
            [Op.lte]: new Date(dataFim),
          },
        },

        include: [
          {
            model: database.Animal,
            as: "Animal",
            attributes: ["id", "nome"],
            include: [{
              model: database.StatusAnimal,
              as: "statusAnimal",
              attributes: ["id", "nome"],
            }]
          },
          {
            model: database.Especie,
            as: "Especie",
            attributes: ["id", "nome"],
          },
          {
            model: database.Usuario,
            as: "Usuario",
            attributes: ["id", "nome"],
          }
        ],
      });

      return res.status(200).json(castracoes);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async relatorioPdf(req, res) {
    const { dataInicio, dataFim } = req.query;

    if (!dataInicio || !dataFim) {
      return res.status(400).json({ error: 'Os parâmetros dataInicio e dataFim são obrigatórios.' });
    }

    try {
      const castracoes = await database.Castracao.findAll({
        where: {
          createdAt: {
            [Op.gte]: new Date(dataInicio),
            [Op.lte]: new Date(dataFim),
          },
        },
        include: [
          {
            model: database.Animal,
            as: 'Animal',
            attributes: ['id', 'nome'],
            include: [
              {
                model: database.StatusAnimal,
                as: 'statusAnimal',
                attributes: ['id', 'nome'],
              },
            ],
          },
          {
            model: database.Especie,
            as: 'Especie',
            attributes: ['id', 'nome'],
          },
          {
            model: database.Usuario,
            as: 'Usuario',
            attributes: ['id', 'nome'],
          },
        ],
      });

      // Configuração do PDF
      const doc = new PDFDocument();
      const filename = `relatorio-castracoes-${Date.now()}.pdf`;

      // Configuração dos cabeçalhos HTTP
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

      // Cabeçalho do documento
      doc.fontSize(16).text('Relatório de Castrações', { align: 'center' });
      doc.fontSize(12).text(`Período: ${dataInicio} a ${dataFim}`, { align: 'center' });
      doc.moveDown();

      // Cabeçalho da tabela
      doc.fontSize(12).text('ID Castração', 50, doc.y, { continued: true });
      doc.text('Animal', 150, doc.y, { continued: true });
      doc.text('Status Animal', 250, doc.y, { continued: true });
      doc.text('Espécie', 350, doc.y, { continued: true });
      doc.text('Usuário', 450, doc.y);
      doc.moveDown();

      // Preenchimento da tabela
      castracoes.forEach((castracao) => {
        const { id, createdAt, Animal, Especie, Usuario } = castracao;

        doc.text(id, 50, doc.y, { continued: true });
        doc.text(Animal?.nome || '-', 150, doc.y, { continued: true });
        doc.text(Animal?.statusAnimal?.nome || '-', 250, doc.y, { continued: true });
        doc.text(Especie?.nome || '-', 350, doc.y, { continued: true });
        doc.text(Usuario?.nome || '-', 450, doc.y);
        doc.moveDown();
      });

      // Finaliza e envia o documento
      doc.pipe(res);
      doc.end();
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }
}

module.exports = new CastracaoController();
