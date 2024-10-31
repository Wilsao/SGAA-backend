'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('adocoes', [
      {
        status_adocao_id: 1,
        animal_id: 3,
        pessoa_id: 5,
        data_adocao: new Date('2024-01-15'),
        observacao: 'Adoção pendente de documentação.',
        data_inicio: new Date('2024-01-10'),
        data_fim: new Date('2024-02-10'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status_adocao_id: 2,
        animal_id: 7,
        pessoa_id: 2,
        data_adocao: new Date('2023-12-20'),
        observacao: 'Adoção cancelada devido a desistência do adotante.',
        data_inicio: new Date('2023-12-01'),
        data_fim: new Date('2023-12-20'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status_adocao_id: 3,
        animal_id: 5,
        pessoa_id: 8,
        data_adocao: new Date('2024-03-05'),
        observacao: 'Adoção aprovada após visita ao abrigo.',
        data_inicio: new Date('2024-02-20'),
        data_fim: new Date('2024-03-10'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status_adocao_id: 4,
        animal_id: 10,
        pessoa_id: 6,
        data_adocao: new Date('2024-04-15'),
        observacao: 'Adoção recusada após análise de perfil.',
        data_inicio: new Date('2024-03-30'),
        data_fim: new Date('2024-04-15'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status_adocao_id: 1,
        animal_id: 12,
        pessoa_id: 3,
        data_adocao: new Date('2024-05-01'),
        observacao: 'Adoção pendente de pagamento da taxa.',
        data_inicio: new Date('2024-04-20'),
        data_fim: new Date('2024-05-20'),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], { returning: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('adocoes', null, {});
  }
};
