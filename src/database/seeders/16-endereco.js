'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const pessoas = await queryInterface.sequelize.query(
      `SELECT id FROM pessoas;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const enderecosData = [
      { estado: 'SP', cep: '132344444', cidade: 'Teste', rua: 'Rua 1', bairro: 'Centro', numero: '568', complemento: 'Apto 1', ponto_referencia: 'Ponto 1', status: true },
      { estado: 'SP', cep: '132355555', cidade: 'Teste', rua: 'Rua 2', bairro: 'Centro', numero: '569', complemento: 'Apto 2', ponto_referencia: 'Ponto 2', status: true },
      { estado: 'SP', cep: '132366666', cidade: 'Teste', rua: 'Rua 3', bairro: 'Centro', numero: '570', complemento: 'Apto 3', ponto_referencia: 'Ponto 3', status: true },
      { estado: 'SP', cep: '132377777', cidade: 'Teste', rua: 'Rua 4', bairro: 'Centro', numero: '571', complemento: 'Apto 4', ponto_referencia: 'Ponto 4', status: true },
      { estado: 'SP', cep: '132388888', cidade: 'Teste', rua: 'Rua 5', bairro: 'Centro', numero: '572', complemento: 'Apto 5', ponto_referencia: 'Ponto 5', status: true },
      { estado: 'SP', cep: '132399999', cidade: 'Teste', rua: 'Rua 6', bairro: 'Centro', numero: '573', complemento: 'Apto 6', ponto_referencia: 'Ponto 6', status: true },
      { estado: 'SP', cep: '132400000', cidade: 'Teste', rua: 'Rua 7', bairro: 'Centro', numero: '574', complemento: 'Apto 7', ponto_referencia: 'Ponto 7', status: true },
      { estado: 'SP', cep: '132411111', cidade: 'Teste', rua: 'Rua 8', bairro: 'Centro', numero: '575', complemento: 'Apto 8', ponto_referencia: 'Ponto 8', status: true },
      { estado: 'SP', cep: '132422222', cidade: 'Teste', rua: 'Rua 9', bairro: 'Centro', numero: '576', complemento: 'Apto 9', ponto_referencia: 'Ponto 9', status: true },
      { estado: 'SP', cep: '132433333', cidade: 'Teste', rua: 'Rua 10', bairro: 'Centro', numero: '577', complemento: 'Apto 10', ponto_referencia: 'Ponto 10', status: true },
    ];

    const enderecos = pessoas.map((pessoa, index) => ({
      ...enderecosData[index],
      pessoa_id: pessoa.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('enderecos', enderecos);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('enderecos', null, {});
  }
};
