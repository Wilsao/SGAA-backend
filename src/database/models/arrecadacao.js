'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Arrecadacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Arrecadacao.init({
    nome_evento: DataTypes.STRING,
    data_evento: DataTypes.DATE,
    valor_arrecadado: DataTypes.DECIMAL,
    descricao: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Arrecadacao',
    tableName: 'arrecadacoes'
  });
  return Arrecadacao;
};