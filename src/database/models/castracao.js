"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Castracao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Castracao.belongsTo(models.Especie, {
        foreignKey: "especie_id",
      });
      Castracao.belongsTo(models.Usuario, {
        foreignKey: "usuario_id",
      });
      Castracao.belongsTo(models.Animal, {
        foreignKey: "animal_id",
      });
    }
  }
  Castracao.init(
    {
      local_evento: DataTypes.STRING,
      descricao: DataTypes.STRING,
      data_evento: DataTypes.DATE,
      quantidade_macho: DataTypes.INTEGER,
      quantidade_femea: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
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
