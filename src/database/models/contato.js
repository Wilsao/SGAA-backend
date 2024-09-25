'use strict';
const {
  Model
} = require('sequelize');
const pessoa = require('./pessoa');
module.exports = (sequelize, DataTypes) => {
  class Contato extends Model {
    static associate(models) {
      Contato.belongsTo(models.Pessoa, {
        foreignKey: 'pessoa_id',
        as: 'pessoa'
      })
    }
  }
  Contato.init({
    status: DataTypes.BOOLEAN,
    tipo: DataTypes.STRING,
    valor: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Contato',
    tableName: 'contatos'
  });
  return Contato;
};