'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('especies', [{
      nome: 'Cachorro',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Gato',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('especies', null, {});
  }
};
