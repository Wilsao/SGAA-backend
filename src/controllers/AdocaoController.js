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
      const doc = new PDFDocument({ size: 'A4' });
      const filename = `relatorio-adoções-${Date.now()}.pdf`;

      // Configuração dos cabeçalhos HTTP
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

      // Cabeçalho do documento
      doc.fontSize(16).text('Relatório de Adoções', { align: 'center' }).moveDown(1);
      doc.fontSize(10).text(`Período: ${dataInicio || 'Não especificado'} a ${dataFim || 'Não especificado'}`, { align: 'center' }).moveDown(2);

      // Cabeçalho da tabela
      const headerY = doc.y;
      doc.fontSize(10).font('Helvetica-Bold');
      doc.text('ID Adoção', 50, headerY, { width: 60, align: 'center' });
      doc.text('Pessoa', 110, headerY, { width: 120, align: 'center' });
      doc.text('Animal', 230, headerY, { width: 120, align: 'center' });
      doc.text('Sexo', 350, headerY, { width: 50, align: 'center' });
      doc.text('Espécie', 400, headerY, { width: 100, align: 'center' });

      // Linha de separação do cabeçalho
      doc.moveTo(50, headerY + 10)
        .lineTo(550, headerY + 10)
        .stroke();
      doc.moveDown(0.5); // Espaço entre o cabeçalho e as linhas da tabela

      // Preenchendo a tabela com as adoções
      arrecadacoes.forEach((adocao) => {
        const { pessoa, animal } = adocao;
        const startY = doc.y + 10;

        // Desenhando as células da tabela
        doc.text(adocao.id, 50, startY, { width: 60, align: 'center' });
        doc.text(pessoa.nome, 110, startY, { width: 120, align: 'center' });
        doc.text(animal.nome, 230, startY, { width: 120, align: 'center' });
        doc.text(animal.sexo, 350, startY, { width: 50, align: 'center' });
        doc.text(animal.especie?.nome || '-', 400, startY, { width: 100, align: 'center' });

        doc.moveDown(0.5); // Espaço entre as linhas
      });

      // Desenhando as linhas horizontais de separação para cada linha de adoção
      arrecadacoes.forEach(() => {
        const startY = doc.y + 10;
        doc.moveTo(50, startY) // Linha de separação entre as linhas da tabela
          .lineTo(550, startY)
          .stroke();
      });

      // Finaliza o documento e envia a resposta
      doc.pipe(res);
      doc.end();
    } catch (erro) {
      return res.status(500).json({ message: erro.message });
    }
  }
}

module.exports = new AdocaoController();
