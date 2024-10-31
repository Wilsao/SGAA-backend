"use strict";
/** @type {import('sequelize-cli').Migration} */
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Adocao extends Model {
    static associate(models) {
      Adocao.belongsTo(models.Pessoa, {
        foreignKey: "pessoa_id",
        as: "pessoa",
      });
      Adocao.belongsTo(models.Animal, {
        foreignKey: "animal_id",
        as: "animal",
      });
      Adocao.belongsTo(models.StatusAdocao, {
        foreignKey: "status_adocao_id",
        as: "status_adocao",
      });
    }
  }
  Adocao.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      data_adocao: DataTypes.DATE,
      observacao: DataTypes.STRING,
      data_inicio: DataTypes.DATE,
      data_fim: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Adocao",
      tableName: "adocoes",
    }
  );
  return Adocao;
};
