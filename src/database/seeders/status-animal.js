"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "status_animal",
      [
        {
          nome: "Disponível",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Indisponível",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Adotado",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Desaparecido",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Óbito",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("status_animal", null, {});
  },
};
