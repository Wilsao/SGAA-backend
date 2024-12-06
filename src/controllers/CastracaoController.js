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
      const doc = new PDFDocument({ size: 'A4' });
      const filename = `relatorio-castracoes-${Date.now()}.pdf`;

      // Configuração dos cabeçalhos HTTP
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

      // Cabeçalho do documento
      doc.fontSize(16).text('Relatório de Castrações', { align: 'center' }).moveDown(1);
      doc.fontSize(10).text(`Período: ${dataInicio} a ${dataFim}`, { align: 'center' }).moveDown(2);

      // Define o início do cabeçalho da tabela
      const headerY = doc.y;

      // Cabeçalho da tabela
      doc.fontSize(10).font('Helvetica-Bold');
      doc.text('ID Castração', 50, headerY, { width: 60, align: 'center' });
      doc.text('Animal', 110, headerY, { width: 120, align: 'center' });
      doc.text('Status Animal', 230, headerY, { width: 100, align: 'center' });
      doc.text('Espécie', 340, headerY, { width: 100, align: 'center' });
      doc.text('Usuário', 450, headerY, { width: 100, align: 'center' });

      // Desenha a linha de separação do cabeçalho
      doc.moveTo(50, headerY + 10)
        .lineTo(550, headerY + 10)
        .stroke();
      doc.moveDown(0.5);

      // Preenchimento da tabela com os dados das castrações
      castracoes.forEach((castracao) => {
        const { id, Animal, Especie, Usuario } = castracao;
        const startY = doc.y + 10; // Posição Y para cada linha

        // Desenhando as células da tabela
        doc.text(id, 50, startY, { width: 60, align: 'center' });
        doc.text(Animal?.nome || '-', 110, startY, { width: 120, align: 'center' });
        doc.text(Animal?.statusAnimal?.nome || '-', 230, startY, { width: 100, align: 'center' });
        doc.text(Especie?.nome || '-', 340, startY, { width: 100, align: 'center' });
        doc.text(Usuario?.nome || '-', 450, startY, { width: 100, align: 'center' });

        doc.moveDown(0.5); // Espaço entre as linhas
      });

      // Desenhando as linhas horizontais de separação para cada linha de castração
      castracoes.forEach(() => {
        const startY = doc.y + 10;
        doc.moveTo(50, startY) // Linha de separação das linhas da tabela
          .lineTo(550, startY)
          .stroke();
      });

      doc.pipe(res);
      doc.end();
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

}

module.exports = new CastracaoController();
