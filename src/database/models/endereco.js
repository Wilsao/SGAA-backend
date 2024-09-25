'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Endereco extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Endereco.belongsTo(models.Pessoa, {
        foreignKey: 'pessoa_id',
        as: 'pessoa'
      })
    }
  }
  Endereco.init({
    status: DataTypes.BOOLEAN,
    estado: DataTypes.STRING,
    cep: DataTypes.STRING,
    cidade: DataTypes.STRING,
    rua: DataTypes.STRING,
    bairro: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    complemento: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Endereco',
    tableName: 'enderecos',
  });
  return Endereco;
};