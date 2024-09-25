'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.belongsTo(models.TipoUsuario, {
        foreignKey: 'tipo_usuario_id'
      });
    }
  }
  Usuario.init({
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    defaultScope: {
      attributes: {
        exclude: ['senha']
      }
    }
  });
  return Usuario;
};