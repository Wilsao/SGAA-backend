'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('castracoes', [
      {
        especie_id: 1,
        usuario_id: 2,
        animal_id: null,
        local_evento: 'Clínica VetCare',
        descricao: 'Evento de castração coletiva em cães',
        data_evento: new Date('2024-05-10'),
        quantidade_macho: 5,
        quantidade_femea: 3,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        especie_id: 2,
        usuario_id: 4,
        animal_id: null,
        local_evento: 'Centro de Controle de Zoonoses',
        descricao: 'Castração de gatos resgatados',
        data_evento: new Date('2024-06-15'),
        quantidade_macho: 4,
        quantidade_femea: 6,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        especie_id: 1,
        usuario_id: 1,
        animal_id: null,
        local_evento: 'Abrigo de Animais Amigo Fiel',
        descricao: 'Mutirão de castração para cães comunitários',
        data_evento: new Date('2024-07-20'),
        quantidade_macho: 7,
        quantidade_femea: 4,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        especie_id: 2,
        usuario_id: 6,
        animal_id: null,
        local_evento: 'Associação Protetora dos Animais',
        descricao: 'Evento gratuito de castração para gatos',
        data_evento: new Date('2024-08-10'),
        quantidade_macho: 3,
        quantidade_femea: 5,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        especie_id: 1,
        usuario_id: 3,
        animal_id: null,
        local_evento: 'Unidade Móvel de Castração',
        descricao: 'Campanha de castração para cães de rua',
        data_evento: new Date('2024-09-05'),
        quantidade_macho: 6,
        quantidade_femea: 7,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], { returning: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('castracoes', null, {});
  }
};
