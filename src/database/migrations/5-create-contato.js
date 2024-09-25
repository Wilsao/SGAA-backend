'use strict';

const { type } = require('express/lib/response');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contatos', {
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
      tipo: {
        type: Sequelize.STRING
      },
      valor: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('contatos');
  }
};