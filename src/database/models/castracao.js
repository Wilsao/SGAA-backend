"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Castracao extends Model {
    static associate(models) {
      Castracao.belongsTo(models.Especie, {
        foreignKey: "especie_id",
        as: "especie",
      });
      Castracao.belongsTo(models.Usuario, {
        foreignKey: "usuario_id",
        as: "usuario",
      });
      Castracao.belongsTo(models.Animal, {
        foreignKey: "animal_id",
        as: "animal",
      });
    }
  }
  Castracao.init(
    {
      especie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      animal_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      local_evento: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      data_evento: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      quantidade_macho: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      quantidade_femea: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Castracao",
      tableName: "castracoes",
    }
  );
  return Castracao;
};
