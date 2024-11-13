"use strict";
const { Model } = require("sequelize");
const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  class Imagem extends Model {
    static associate(models) {
      Imagem.belongsTo(models.StatusAnimal, {
        foreignKey: "animal_id",
        as: "Animal",
        allowNull: false,
      });
    }
  }

  Imagem.init(
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
    },
    {
      sequelize,
      modelName: "Imagem",
      tableName: "imagens_animais",
      timestamps: false,
    }
  );

  return Imagem;
};
