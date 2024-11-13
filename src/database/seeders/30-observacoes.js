'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const observacoesData = [];
    const observacoesTipos = [
      { titulo: 'Vacinar', descricao: 'Pata trazeira machucada', status: 'pendente' },
      { titulo: 'Dar Remédio', descricao: 'Remelando olho direito', status: 'em_progresso' },
      { titulo: 'Tozar', descricao: 'Corte na lingua', status: 'pendente' },
      { titulo: 'Exame Veterinário', descricao: 'Exame de rotina para avaliar a saúde geral', status: 'pendente' },
      { titulo: 'Banho', descricao: 'Banho semanal para higiene e tambem teste de doenças', status: 'em_progresso' }
    ];

    for (let i = 1; i <= 15; i++) {
      observacoesTipos.forEach(observacao => {
        observacoesData.push({
          animal_id: i,
          titulo: observacao.titulo,
          status: observacao.status,
          descricao: observacao.descricao,
          data_inicio: new Date(2024, 0, 1), // Exemplo de data de início fixa (ajuste conforme necessário)
          data_fim: new Date(2024, 11, 31), // Exemplo de data de fim fixa (ajuste conforme necessário)
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
    }

    await queryInterface.bulkInsert('observacoes', observacoesData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('observacoes', null, {});
  }
};
