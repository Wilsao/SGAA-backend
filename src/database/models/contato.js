"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Contato extends Model {
    static associate(models) {
      Contato.belongsTo(models.Pessoa, {
        foreignKey: "pessoa_id",
        as: "pessoa",
      });
    }
  }

  Contato.init(
    {
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // Contatos são ativos por padrão
      },
      tipo: {
        type: DataTypes.ENUM("celular", "telefone", "whatsapp"),
        allowNull: false,
      },
      valor: {
        type: DataTypes.STRING,
        allowNull: false, // O número com DDD é obrigatório
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Contato",
      tableName: "contatos",
      timestamps: true,
    }
  );

  return Contato;
};
