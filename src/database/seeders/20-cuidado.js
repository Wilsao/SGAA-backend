'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const cuidadosData = [];
    const cuidadosTipos = [
      { titulo: 'Vacinar', descricao: 'Vacinação anual obrigatória', status: 'pendente' },
      { titulo: 'Dar Remédio', descricao: 'Administrar remédio prescrito pelo veterinário', status: 'em_progresso' },
      { titulo: 'Tozar', descricao: 'Corte de pelo e limpeza das orelhas', status: 'concluida' },
      { titulo: 'Exame Veterinário', descricao: 'Exame de rotina para avaliar a saúde geral', status: 'pendente' },
      { titulo: 'Banho', descricao: 'Banho semanal para higiene', status: 'em_progresso' }
    ];

    for (let i = 1; i <= 15; i++) {
      cuidadosTipos.forEach(cuidado => {
        cuidadosData.push({
          animal_id: i,
          titulo: cuidado.titulo,
          status: cuidado.status,
          descricao: cuidado.descricao,
          data_inicio: new Date(2024, 0, 1), // Exemplo de data de início fixa (ajuste conforme necessário)
          data_fim: new Date(2024, 11, 31), // Exemplo de data de fim fixa (ajuste conforme necessário)
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
    }

    await queryInterface.bulkInsert('cuidados', cuidadosData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cuidados', null, {});
  }
};
