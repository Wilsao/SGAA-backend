'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      senha: {
        type: Sequelize.STRING
      },
      tipo_usuario_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'tipos_usuarios',
          key: 'id'
        }
      },
      status: {
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      pergunta: {
        allowNull: true,
        type: Sequelize.STRING
      },
      resposta: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};