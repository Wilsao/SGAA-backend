'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('arrecadacoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      usuario_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      },
      nome_evento: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      data_evento: {
        type: Sequelize.DATE,
        allowNull: false, 
        defaultValue: Sequelize.NOW,
      },
      valor_arrecadado: {
        type: Sequelize.DECIMAL,
        allowNull: false, 
        defaultValue: 0,
      },
      descricao: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('arrecadacoes');
  },
};
