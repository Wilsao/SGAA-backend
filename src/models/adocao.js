'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Adocao extends Model {
    static associate(models) {
      // define association here
    }
  }
  Adocao.init({
    nome: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    email: DataTypes.STRING,
    telefone: DataTypes.STRING,
    endereco: DataTypes.STRING,
    cidade: DataTypes.STRING,
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