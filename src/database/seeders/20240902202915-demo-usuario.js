const { hash } = require('bcryptjs');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashSenha = await hash('password', 10);
    const hashTeste = await hash('Teste@123', 10);

    await queryInterface.bulkInsert('usuarios', [
      {
        nome: 'User Tester',
        email: 'teste@hotmail.com',
        senha: hashTeste,
        tipo_usuario_id: 1,
        cpf: '63058133022',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Solange Estudante',
        email: 'solange@email.com',
        senha: hashSenha,
        tipo_usuario_id: 1,
        cpf: '63058133022',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Igor Estudante',
        email: 'igor@email.com',
        senha: hashSenha,
        cpf: '99018205028',
        tipo_usuario_id: 2,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Aline Estudante',
        email: 'aline@email.com',
        senha: hashSenha,
        cpf: '92797497066',
        tipo_usuario_id: 2,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Fernando Estudante',
        email: 'fernando@email.com',
        senha: hashSenha,
        cpf: '17195730000',
        tipo_usuario_id: 2,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Ricardo Docente',
        email: 'ricardo@email.com',
        senha: hashSenha,
        cpf: '06946507061',
        tipo_usuario_id: 2,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Dine Docente',
        email: 'dine@email.com',
        senha: hashSenha,
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
