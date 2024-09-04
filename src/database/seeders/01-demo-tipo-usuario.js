'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tipos_usuarios', [
      {
        nome: 'Administrador',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Cuidador',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Visitantes',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
