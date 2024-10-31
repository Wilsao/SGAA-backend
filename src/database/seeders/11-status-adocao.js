'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('status_adocao', [
      {
        nome: 'Pendente',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Cancelado',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Aprovado',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Recusado',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('status_adocao', null, {});
  }
};
