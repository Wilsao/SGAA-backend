'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('arrecadacoes', [
      {
        usuario_id: 1,
        nome_evento: 'Feira de Adoção',
        data_evento: new Date('2024-05-15'),
        valor_arrecadado: 1500.00,
        descricao: 'Evento de adoção para arrecadação de fundos.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        usuario_id: 2,
        nome_evento: 'Rifa Beneficente',
        data_evento: new Date('2024-06-10'),
        valor_arrecadado: 800.00,
        descricao: 'Rifa beneficente para ajudar animais resgatados.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        usuario_id: 3,
        nome_evento: 'Bazar Solidário',
        data_evento: new Date('2024-07-05'),
        valor_arrecadado: 1200.00,
        descricao: 'Bazar com venda de produtos doados.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        usuario_id: 4,
        nome_evento: 'Jantar Beneficente',
        data_evento: new Date('2024-08-20'),
        valor_arrecadado: 2500.00,
        descricao: 'Jantar especial para arrecadar fundos.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        usuario_id: 5,
        nome_evento: 'Doação Online',
        data_evento: new Date('2024-09-15'),
        valor_arrecadado: 500.00,
        descricao: 'Campanha online de doações para o abrigo.',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], { returning: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('arrecadacoes', null, {});
  }
};
