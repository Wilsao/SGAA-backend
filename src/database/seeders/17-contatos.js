'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('contatos', [
      {
        pessoa_id: 1,
        status: 1,
        tipo: 'email',
        valor: 'mail@mail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pessoa_id: 2,
        status: 0,
        tipo: 'whatsapp',
        valor: '11912345678',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pessoa_id: 3,
        status: 1,
        tipo: 'telefone',
        valor: '1123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pessoa_id: 4,
        status: 1,
        tipo: 'email',
        valor: 'mail@mail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pessoa_id: 5,
        status: 0,
        tipo: 'whatsapp',
        valor: '21912345678',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pessoa_id: 6,
        status: 1,
        tipo: 'telefone',
        valor: '2134567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pessoa_id: 7,
        status: 1,
        tipo: 'email',
        valor: 'mail@mail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pessoa_id: 8,
        status: 0,
        tipo: 'whatsapp',
        valor: '31912345678',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pessoa_id: 9,
        status: 1,
        tipo: 'telefone',
        valor: '3134567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pessoa_id: 10,
        status: 1,
        tipo: 'email',
        valor: 'mail@mail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], { returning: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contatos', null, {});
  }
};
