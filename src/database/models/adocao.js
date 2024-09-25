'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Adocao extends Model {
    static associate(models) {
    }
  }
  Adocao.init({
    data_adocao: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Adocao',
    tableName: 'adocoes'
  });
  return Adocao;
};