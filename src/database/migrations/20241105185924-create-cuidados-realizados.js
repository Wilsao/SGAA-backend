'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cuidados_realizados', {
      cuidado_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true, // Define cuidado_id como parte da chave primária
        references: {
          model: "cuidados",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      usuario_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true, // Define usuario_id como parte da chave primária
        references: {
          model: "usuarios",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      data_inicio: {
        type: Sequelize.DATE
      },
      data_fim: {
        type: Sequelize.DATE
      }
    }, {
      id: false, // Desabilita a criação automática da coluna id
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cuidados_realizados');
  }
};
