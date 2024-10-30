'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserir dados na tabela `pessoas`
    const pessoas = await queryInterface.bulkInsert('pessoas', [
      {
        nome: 'Pessoa 1',
        cpf: '12345678901',
        sexo: 'M',
        data_nascimento: new Date('1999-11-11'),
        cuidador: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Pessoa 2',
        cpf: '23456789012',
        sexo: 'F',
        data_nascimento: new Date('1990-05-22'),
        cuidador: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Pessoa 3',
        cpf: '34567890123',
        sexo: 'M',
        data_nascimento: new Date('1985-03-15'),
        cuidador: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Pessoa 4',
        cpf: '45678901234',
        sexo: 'F',
        data_nascimento: new Date('2000-07-30'),
        cuidador: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Pessoa 5',
        cpf: '56789012345',
        sexo: 'M',
        data_nascimento: new Date('1992-10-10'),
        cuidador: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Pessoa 6',
        cpf: '67890123456',
        sexo: 'F',
        data_nascimento: new Date('1988-01-20'),
        cuidador: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Pessoa 7',
        cpf: '78901234567',
        sexo: 'M',
        data_nascimento: new Date('1995-12-12'),
        cuidador: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Pessoa 8',
        cpf: '89012345678',
        sexo: 'F',
        data_nascimento: new Date('1983-09-09'),
        cuidador: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Pessoa 9',
        cpf: '90123456789',
        sexo: 'M',
        data_nascimento: new Date('1991-06-18'),
        cuidador: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Pessoa 10',
        cpf: '01234567890',
        sexo: 'F',
        data_nascimento: new Date('1998-04-25'),
        cuidador: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { returning: true });

    // Associar cada pessoa a um contato e um endereço
    const contatos = [
      { tipo: 'telefone', valor: '12123411234', status: true },
      { tipo: 'telefone', valor: '12123456789', status: true },
      { tipo: 'telefone', valor: '12123498765', status: true },
      { tipo: 'telefone', valor: '12123456700', status: true },
      { tipo: 'telefone', valor: '12123465432', status: true },
      { tipo: 'telefone', valor: '12123432100', status: true },
      { tipo: 'telefone', valor: '12123455555', status: true },
      { tipo: 'telefone', valor: '12123499999', status: true },
      { tipo: 'telefone', valor: '12123488888', status: true },
      { tipo: 'telefone', valor: '12123477777', status: true },
    ];

    const enderecos = [
      { estado: 'SP', cep: '132344444', cidade: 'teste', rua: 'Rua 1', bairro: 'centro', numero: '568', complemento: 'Apto 1', ponto_referencia: 'ponto 1', status: true },
      { estado: 'SP', cep: '132355555', cidade: 'teste', rua: 'Rua 2', bairro: 'centro', numero: '569', complemento: 'Apto 2', ponto_referencia: 'ponto 2', status: true },
      { estado: 'SP', cep: '132366666', cidade: 'teste', rua: 'Rua 3', bairro: 'centro', numero: '570', complemento: 'Apto 3', ponto_referencia: 'ponto 3', status: true },
      { estado: 'SP', cep: '132377777', cidade: 'teste', rua: 'Rua 4', bairro: 'centro', numero: '571', complemento: 'Apto 4', ponto_referencia: 'ponto 4', status: true },
      { estado: 'SP', cep: '132388888', cidade: 'teste', rua: 'Rua 5', bairro: 'centro', numero: '572', complemento: 'Apto 5', ponto_referencia: 'ponto 5', status: true },
      { estado: 'SP', cep: '132399999', cidade: 'teste', rua: 'Rua 6', bairro: 'centro', numero: '573', complemento: 'Apto 6', ponto_referencia: 'ponto 6', status: true },
      { estado: 'SP', cep: '132400000', cidade: 'teste', rua: 'Rua 7', bairro: 'centro', numero: '574', complemento: 'Apto 7', ponto_referencia: 'ponto 7', status: true },
      { estado: 'SP', cep: '132411111', cidade: 'teste', rua: 'Rua 8', bairro: 'centro', numero: '575', complemento: 'Apto 8', ponto_referencia: 'ponto 8', status: true },
      { estado: 'SP', cep: '132422222', cidade: 'teste', rua: 'Rua 9', bairro: 'centro', numero: '576', complemento: 'Apto 9', ponto_referencia: 'ponto 9', status: true },
      { estado: 'SP', cep: '132433333', cidade: 'teste', rua: 'Rua 10', bairro: 'centro', numero: '577', complemento: 'Apto 10', ponto_referencia: 'ponto 10', status: true },
    ];

    // Loop para inserir contatos e endereços associados a cada pessoa
    for (let i = 0; i < pessoas.length; i++) {
      await queryInterface.bulkInsert('contatos', [{
        tipo: contatos[i].tipo,
        valor: contatos[i].valor,
        status: contatos[i].status,
        pessoaId: pessoas[i].id, // Associar contato à pessoa
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);

      await queryInterface.bulkInsert('enderecos', [{
        estado: enderecos[i].estado,
        cep: enderecos[i].cep,
        cidade: enderecos[i].cidade,
        rua: enderecos[i].rua,
        bairro: enderecos[i].bairro,
        numero: enderecos[i].numero,
        complemento: enderecos[i].complemento,
        ponto_referencia: enderecos[i].ponto_referencia,
        status: enderecos[i].status,
        pessoaId: pessoas[i].id, // Associar endereço à pessoa
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remover os dados inseridos na ordem inversa
    await queryInterface.bulkDelete('enderecos', null, {});
    await queryInterface.bulkDelete('contatos', null, {});
    await queryInterface.bulkDelete('pessoas', null, {});
  }
};
