'use strict';
const {
  Model
} = require('sequelize');
const usuario = require('./usuario');
module.exports = (sequelize, DataTypes) => {
  class TipoUsuario extends Model {
    static associate(models) {
      TipoUsuario.hasMany(models.Usuario, {
        foreignKey: 'id'
      })
    }
  }
  TipoUsuario.init({
    nome: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'TipoUsuario',
    tableName: 'tipos_usuarios'
  });
  return TipoUsuario;
};