'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CuidadoRealizado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CuidadoRealizado.belongsTo(models.Usuario, {
        foreignKey: "usuario_id",
        as: "usuario",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
      CuidadoRealizado.belongsTo(models.Cuidado, {
        foreignKey: "cuidado_id",
        as: "cuidado",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }

  CuidadoRealizado.init(
    {
      cuidado_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Define como parte da chave primária
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Define como parte da chave primária
      },
      data_inicio: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      data_fim: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'CuidadoRealizado',
      tableName: 'cuidados_realizados',
      timestamps: false,
      // Impede a criação automática da coluna "id"
      id: false,
    }
  );

  return CuidadoRealizado;
};
