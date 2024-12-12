// models/Arrecadacao.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Arrecadacao extends Model {
    static associate(models) {
      Arrecadacao.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario',
      });
    }
  }

  Arrecadacao.init(
    {
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nome_evento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data_evento: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      valor_arrecadado: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Arrecadacao",
      tableName: "arrecadacoes",
    }
  );
  return Arrecadacao;
};
