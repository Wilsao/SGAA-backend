const database = require("../database/models");
const { Op } = require("sequelize");
const PDFDocument = require('pdfkit');

class ArrecadacaoController {
  async obterTodos(req, res) {
    try {
      const now = new Date();
      const inicio = new Date();
      inicio.setDate(now.getDate() - 30); // Subtrai 1 dia

      const arrecadacoes = await database.Arrecadacao.findAll({
        where: {
          createdAt: {
            [Op.gte]: inicio, // 1 dia atrás
            [Op.lte]: now, // Agora
          },
        },
      });

      if (!arrecadacoes)
        return res.status(404).json({ error: "Arrecadacoes não encontradas" });

      return res.status(200).json(arrecadacoes);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async obterPorId(req, res) {
    const id = req.params.id;
    try {
      const arrecadacao = await database.Arrecadacao.findOne({
        where: { id: id },
      });

      if (!arrecadacao)
        return res.status(404).json({ error: "Arrecadacao não encontrada" });

      return res.status(200).json(arrecadacao);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async adicionar(req, res) {
    const dados = req.body;
    try {
      const arrecadacao = await database.Arrecadacao.create(dados);
      return res.status(201).json(arrecadacao);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async atualizar(req, res) {
    const id = req.params.id;
    const dados = req.body;
    try {
      await database.Arrecadacao.update(dados, { where: { id: id } });

      return res
        .status(200)
        .json({ message: "Arrecadacao atualizada com sucesso" });
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async deletar(req, res) {
    const id = req.params.id;
    try {
      const resultado = await database.Arrecadacao.destroy({
        where: { id: id },
      });
      if (resultado === 0) {
        return res
          .status(404)
          .json({ mensagem: "Arrecadação não encontrada." });
      }
      return res
        .status(200)
        .json({ message: "Arrecadacao excluída com sucesso" });
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async filtrar(req, res) {
    const { termobusca } = req.params;
    try {
      const arrecadacoes = await database.Arrecadacao.findAll({
        where: {
          [Op.or]: [
            { nome_evento: { [Op.like]: `%${termobusca}%` } },
            { descricao: { [Op.like]: `%${termobusca}%` } },
          ],
        },
      });
      return res.status(200).json(arrecadacoes);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async filtrarPorAno(req, res) {
    const ano = req.params.ano;
    try {
      const arrecadacoes = await database.Arrecadacao.findAll({
        where: {
          data_evento: {
            [Op.gte]: `${ano}-01-01`,
            [Op.lt]: `${ano}-12-31`
          }
        }
      });
      return res.status(200).json(arrecadacoes);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async relatorio(req, res) {
    const { dataInicio, dataFim } = req.query;

    if (!dataInicio || !dataFim) {
      return res.status(400).json({ error: 'Os parâmetros dataInicio e dataFim são obrigatórios.' });
    }

    try {
      const arrecadacoes = await database.Arrecadacao.findAll({
        where: {
          createdAt: {
            [Op.gte]: new Date(dataInicio),
            [Op.lte]: new Date(dataFim),
          },
        },

        include: [
          {
            model: database.Usuario,
            as: "Usuario",
            attributes: ["id", "nome"],
          }
        ],
      });

      return res.status(200).json(arrecadacoes);
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
      const arrecadacoes = await database.Arrecadacao.findAll({
        where: {
          createdAt: {
            [Op.gte]: new Date(dataInicio),
            [Op.lte]: new Date(dataFim),
          },
        },
        include: [
          {
            model: database.Usuario,
            as: 'Usuario',
            attributes: ['id', 'nome'],
          },
        ],
      });

      const totalArrecadacoes = await database.Arrecadacao.sum('valor_arrecadado', {
        where: {
          createdAt: {
            [Op.gte]: new Date(dataInicio),
            [Op.lte]: new Date(dataFim),
          },
        }
      });

      // Configuração do PDF
      const doc = new PDFDocument();
      const filename = `relatorio-arrecadacoes-${Date.now()}.pdf`;

      // Configuração dos cabeçalhos HTTP
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

      // Cabeçalho do documento
      doc.fontSize(16).text('Relatório de Arrecadações', { align: 'center' });
      doc.moveDown(2);  // Espaço entre título e tabela

      // Tabela com informações iniciais
      doc.fontSize(12).font('Helvetica-Bold');
      doc.text('Total Arrecadado:', 50, doc.y, { continued: true });
      doc.text(`R$ ${parseFloat(totalArrecadacoes).toFixed(2)}`, 200, doc.y);
      doc.moveDown();

      doc.text('Número de Arrecadações:', 50, doc.y, { continued: true });
      doc.text(`${arrecadacoes.length}`, 200, doc.y);
      doc.moveDown();

      doc.text('Período:', 50, doc.y, { continued: true });
      doc.text(`${new Date(dataInicio).toLocaleString()} a ${new Date(dataFim).toLocaleString()}`, 200, doc.y);
      doc.moveDown(2);

      // Cabeçalho da tabela de arrecadações
      doc.fontSize(12).font('Helvetica-Bold');
      doc.text('ID', 50, doc.y, { width: 50, align: 'center' });
      doc.text('Usuário', 150, doc.y, { width: 150, align: 'center' });
      doc.text('Valor Arrecadado', 300, doc.y, { width: 100, align: 'center' });
      doc.text('Data de Criação', 400, doc.y, { width: 150, align: 'center' });
      doc.moveDown();

      // Desenhando as linhas horizontais de separação
      doc.moveTo(50, doc.y)  // Linha de separação do cabeçalho
        .lineTo(550, doc.y)
        .stroke();
      doc.moveDown();

      // Preenchimento da tabela com as arrecadações
      arrecadacoes.forEach((arrecadacao, index) => {
        const { id, Usuario, valor_arrecadado, createdAt } = arrecadacao;

        // Converte valor_arrecadado para número e formata com duas casas decimais
        const valorFormatado = parseFloat(valor_arrecadado).toFixed(2);

        const startY = doc.y + 10; // Define a posição Y para cada linha

        // Desenhando as células da tabela para cada linha
        doc.text(id, 50, startY, { width: 50, align: 'center' }); // ID
        doc.text(Usuario.nome, 150, startY, { width: 150, align: 'center' }); // Nome do Usuário
        doc.text(`R$ ${valorFormatado}`, 300, startY, { width: 100, align: 'center' }); // Valor arrecadado
        doc.text(new Date(createdAt).toLocaleString(), 400, startY, { width: 150, align: 'center' }); // Data de criação
        doc.moveDown();
      });

      // Desenhando as linhas horizontais de separação para cada linha de arrecadação
      arrecadacoes.forEach((_, index) => {
        const startY = doc.y + 10;
        doc.moveTo(50, startY)  // Linha de separação das linhas da tabela
          .lineTo(550, startY)
          .stroke();
      });

      // Finaliza e envia o documento
      doc.pipe(res);
      doc.end();
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }



}

module.exports = new ArrecadacaoController();
