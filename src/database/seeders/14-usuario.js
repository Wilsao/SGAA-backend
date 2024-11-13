const { hash } = require('bcryptjs');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashSenha = await hash('123123', 10);
    const hashTeste = await hash('Teste@123', 10);

    await queryInterface.bulkInsert('usuarios', [
      {
        nome: 'User Tester',
        email: 'teste@hotmail.com',
        senha: hashTeste,
        tipo_usuario_id: 1,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Solange',
        email: 'admin@admin.com',
        senha: hashSenha,
        tipo_usuario_id: 1,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Igor Estudante',
        email: 'igor@email.com',
        senha: hashSenha,
        tipo_usuario_id: 2,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Aline Estudante',
        email: 'aline@email.com',
        senha: hashSenha,
        tipo_usuario_id: 2,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Fernando Estudante',
        email: 'fernando@email.com',
        senha: hashSenha,
        tipo_usuario_id: 2,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Ricardo Docente',
        email: 'ricardo@email.com',
        senha: hashSenha,
        tipo_usuario_id: 2,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Dine Docente',
        email: 'dine@email.com',
        senha: hashSenha,
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
