"use strict";
const { Model } = require("sequelize");
const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  class Imagem extends Model {
    static associate(models) {
      Imagem.belongsTo(models.Animal, {
        foreignKey: "animal_id",
        as: "Animal",
        allowNull: false,
      });
    }
  }

  Imagem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      animal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'animais',
          key: 'id',
        },
      },
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
      },
    },
    {
      sequelize,
      modelName: 'Imagem',
      tableName: 'imagens_animais',
      timestamps: false,
    }
  );

  return Imagem;
};
