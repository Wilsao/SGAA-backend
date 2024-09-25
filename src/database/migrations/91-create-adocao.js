'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('adocoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      animal_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'animais',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      pessoa_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'pessoas',
          key: 'id'
        }
      },
      data_adocao: {
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
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('adocoes');
  }
};