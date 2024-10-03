'use strict';

const { status } = require('express/lib/response');
const castracao = require('../models/castracao');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('animais', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status_animal_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'status_animal',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      especie_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'especies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      castracao_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'castracoes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      nome: {
        type: Sequelize.STRING
      },
      sexo: {
        type: Sequelize.STRING
      },
      pelagem: {
        type: Sequelize.STRING
      },
      idade: {
        type: Sequelize.STRING
      },
      numero_chip: {
        type: Sequelize.STRING
      },
      numero_baia: {
        type: Sequelize.STRING
      },
      condicao_resgate: {
        type: Sequelize.STRING
      },
      data_nascimento: {
        type: Sequelize.DATE
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
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('animais');
  }
};