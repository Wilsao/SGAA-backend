'use strict';

const { type } = require('express/lib/response');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('enderecos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pessoa_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'pessoas',
          key: 'id'
        }
      },
      status: {
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      estado: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cep: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cidade: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rua: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bairro: {
        allowNull: false,
        type: Sequelize.STRING
      },
      numero: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('enderecos');
  }
};