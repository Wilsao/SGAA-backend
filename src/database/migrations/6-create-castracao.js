'use strict';

const { type } = require('express/lib/response');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('castracoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      local_evento: {
        type: Sequelize.STRING
      },
      nome_evento: {
        type: Sequelize.STRING
      },
      data_evento: {
        type: Sequelize.DATE
      },
      sexo: {
        type: Sequelize.STRING
      },
      quantidade_castrada: {
        type: Sequelize.STRING
      },
      status: {
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('castracoes');
  }
};