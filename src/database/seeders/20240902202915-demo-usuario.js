'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      {
        nome: 'Solange Estudante',
        email: 'solange@email.com',
        tipo_usuario_id: 1,
        cpf: '63058133022',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Igor Estudante',
        email: 'igor@email.com',
        cpf: '99018205028',
        tipo_usuario_id: 2,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Aline Estudante',
        email: 'aline@email.com',
        cpf: '92797497066',
        tipo_usuario_id: 2,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Fernando Estudante',
        email: 'fernando@email.com',
        cpf: '17195730000',
        tipo_usuario_id: 2,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Ricardo Docente',
        email: 'ricardo@email.com',
        cpf: '06946507061',
        tipo_usuario_id: 2,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Dine Docente',
        email: 'dine@email.com',
        cpf: '80941142078',
        tipo_usuario_id: 2,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
