'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contatos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pessoa_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'pessoas', 
          key: 'id',
        }, 
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      tipo: {
        type: Sequelize.ENUM('celular', 'telefone', 'whatsapp'),
        allowNull: false,
      },
      valor: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contatos');
  },
};
