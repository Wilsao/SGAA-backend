"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("animais", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status_animal_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "status_animal",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      especie_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "especies",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      responsavel_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "pessoas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sexo: {
        type: Sequelize.ENUM("M", "F"),
        allowNull: false,
      },
      castracao: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      cor_pelagem: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deficiencia: {
        type: Sequelize.STRING,
      },
      data_ocorrencia: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      data_nascimento_aproximada: {
        type: Sequelize.DATE,
      },
      numero_baia: {
        type: Sequelize.STRING,
      },
      numero_chip: {
        type: Sequelize.STRING,
        unique: true,
      },
      condicao_resgate: {
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
    await queryInterface.dropTable("animais");
  },
};
