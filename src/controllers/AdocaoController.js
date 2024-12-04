const database = require("../database/models");
const { Op } = require('sequelize');
const PDFDocument = require('pdfkit');

class AdocaoController {
  async adicionar(req, res) {
    const {
      pessoa_id,
      animal_id,
      observacao,
      status_adocao_id,
      data_inicio,
      data_fim,
    } = req.body;

    try {
      const novaAdocao = await database.Adocao.create({
        pessoa_id: pessoa_id,
        animal_id: animal_id,
        observacao: observacao,
        status_adocao_id: status_adocao_id || 1,
        data_inicio: data_inicio || new Date(),
        data_fim: data_fim,
      });

      return res.status(201).json(novaAdocao);
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const {
      status_adocao_id,
      observacao,
    } = req.body;

    try {
      const [updated] = await database.Adocao.update(
        {
          status_adocao_id: status_adocao_id,
          observacao: observacao,
          updatedAt: new Date(),
        },
        { where: { id } }
      );

      if (!updated)
        return res.status(404).json({ error: "Adoção não encontrada" });

      const adocao = await database.Adocao.findOne({ where: { id } });

      return res.status(200).json(adocao);
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  async obterTodos(req, res) {
    const { status_adocao_id } = req.query;
    const where = {};

    if (status_adocao_id) {
      where.status_adocao_id = status_adocao_id;
    }

    try {
      const adocoes = await database.Adocao.findAll({
        where,
        include: [
          {
            model: database.Pessoa,
            as: 'pessoa',
            attributes: ['id', 'nome'],
          },
          {
            model: database.Animal,
            as: 'animal',
            attributes: ['id', 'nome'],
          },
          {
            model: database.StatusAdocao,
            as: 'status_adocao',
            attributes: ['id', 'nome'],
          },
        ],
      });

      return res.status(200).json(adocoes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async obterPorId(req, res) {
    const { id } = req.params;

    try {
      const adocao = await database.Adocao.findOne({
        where: { id },
        include: [
          {
            model: database.Pessoa,
            as: 'pessoa',
            attributes: ['id', 'nome'],
          },
          {
            model: database.Animal,
            as: 'animal',
            attributes: ['id', 'nome'],
          },
          {
            model: database.StatusAdocao,
            as: 'status_adocao',
            attributes: ['id', 'nome'],
          },
        ],
      });

      if (!adocao)
        return res.status(404).json({ error: "Adoção não encontrada" });

      return res.status(200).json(adocao);
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  async excluir(req, res) {
    const { id } = req.params;
    try {
      await database.Adocao.destroy({ where: { id: id } });

      res.status(200).json({ message: "Adoção excluída com sucesso" });
    } catch (erro) {
      res.status(500).json({ error: erro.message });
    }
  }

  async relatorio(req, res) {
    const { dataInicio, dataFim, sexo, especie_id } = req.query;

    // Filtro para `Adocao` (tabela principal)
    const filtroAdocao = {};

    if (dataInicio) {
      filtroAdocao.createdAt = {
        ...filtroAdocao.createdAt,
        [Op.gte]: new Date(dataInicio),
      };
    }

    if (dataFim) {
      filtroAdocao.createdAt = {
        ...filtroAdocao.createdAt,
        [Op.lte]: new Date(dataFim),
      };
    }

    // Filtros para `Animal`
    const filtroAnimal = {};

    if (sexo) {
      filtroAnimal.sexo = {
        [Op.like]: `%${sexo}%`,
      };
    }

    if (especie_id) {
      filtroAnimal.especie_id = especie_id;
    }

    try {
      const adocoes = await database.Adocao.findAll({
        where: filtroAdocao,
        include: [
          {
            model: database.Pessoa,
            as: 'pessoa',
            attributes: ['id', 'nome'],
          },
          {
            model: database.Animal,
            as: 'animal',
            attributes: ['id', 'nome', 'sexo'],
            where: filtroAnimal,
            include: [
              {
                model: database.StatusAnimal,
                as: 'statusAnimal',
                attributes: ['id', 'nome'],
              },
              {
                model: database.Especie,
                as: 'especie',
                attributes: ['id', 'nome'],
              },
            ],
          },
        ],
      });

      return res.status(200).json(adocoes);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  async relatorioPdf(req, res) {
    const { dataInicio, dataFim, sexo, especie_id } = req.query;

    // Filtro para `Adocao` (tabela principal)
    const filtroAdocao = {};

    if (dataInicio) {
      filtroAdocao.createdAt = {
        ...filtroAdocao.createdAt,
        [Op.gte]: new Date(dataInicio),
      };
    }

    if (dataFim) {
      filtroAdocao.createdAt = {
        ...filtroAdocao.createdAt,
        [Op.lte]: new Date(dataFim),
      };
    }

    // Filtros para `Animal`
    const filtroAnimal = {};

    if (sexo) {
      filtroAnimal.sexo = {
        [Op.like]: `%${sexo}%`,
      };
    }

    if (especie_id) {
      filtroAnimal.especie_id = especie_id;
    }

    try {
      // Busca os dados
      const arrecadacoes = await database.Adocao.findAll({
        where: filtroAdocao,
        include: [
          {
            model: database.Pessoa,
            as: 'pessoa',
            attributes: ['id', 'nome'],
          },
          {
            model: database.Animal,
            as: 'animal',
            attributes: ['id', 'nome', 'sexo'],
            where: filtroAnimal,
            include: [
              {
                model: database.StatusAnimal,
                as: 'statusAnimal',
                attributes: ['id', 'nome'],
              },
              {
                model: database.Especie,
                as: 'especie',
                attributes: ['id', 'nome'],
              },
            ],
          },
        ],
      });

      // Criação do PDF
      const doc = new PDFDocument();
      const filename = `relatorio-${Date.now()}.pdf`;

      // Cabeçalho
      doc.fontSize(16).text('Relatório de Adoções', { align: 'center' });
      doc.moveDown();

      // Tabela
      doc.fontSize(12);
      doc.text('ID', 50, doc.y, { continued: true });
      doc.text('Pessoa', 100, doc.y, { continued: true });
      doc.text('Animal', 200, doc.y, { continued: true });
      doc.text('Sexo', 300, doc.y, { continued: true });
      doc.text('Espécie', 400, doc.y);

      doc.moveDown();

      // Preenchendo a tabela
      arrecadacoes.forEach((adocao) => {
        const { pessoa, animal } = adocao;

        doc.text(adocao.id, 50, doc.y, { continued: true });
        doc.text(pessoa.nome, 100, doc.y, { continued: true });
        doc.text(animal.nome, 200, doc.y, { continued: true });
        doc.text(animal.sexo, 300, doc.y, { continued: true });
        doc.text(animal.especie.nome, 400, doc.y);

        doc.moveDown();
      });

      // Finaliza o PDF e envia ao cliente
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

      doc.pipe(res); // Envia o PDF diretamente para o cliente
      doc.end();
    } catch (erro) {
      return res.status(500).json({ message: erro.message });
    }
  }
}

module.exports = new AdocaoController();
