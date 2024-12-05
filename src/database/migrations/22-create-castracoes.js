'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('castracoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      especie_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'especies',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: "RESTRICT"
      },
      usuario_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: "RESTRICT"
      },
      animal_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'animais',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: "RESTRICT"
      },
      local_evento: {
        type: Sequelize.STRING,
      },
      descricao: {
        type: Sequelize.STRING,
      },
      data_evento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      quantidade_macho: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      quantidade_femea: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable('castracoes');
  },
};
