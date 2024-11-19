// models/StatusAdocao.js

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StatusAdocao extends Model {
    static associate(models) {
      StatusAdocao.hasMany(models.Adocao, {
        foreignKey: 'status_adocao_id',
        as: 'adocoes',
      });
    }
  }
  StatusAdocao.init(
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'StatusAdocao',
      tableName: 'status_adocao',
    }
  );
  return StatusAdocao;
};
