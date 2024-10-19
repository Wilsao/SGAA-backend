'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('status_animal', [
      {
        nome: 'Vivo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Morto',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Adotado',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Desaparecido',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Encontrado',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Perdido',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Castrado',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Desparasitado',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Doente',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], { returning: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('status_animal', null, {});
  }
};
