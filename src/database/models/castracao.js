'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Castracao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Castracao.hasMany(models.Animal, {
        foreignKey: 'castracao_id',
      })
    }
  }
  Castracao.init({
    local_evento: DataTypes.STRING,
    nome_evento: DataTypes.STRING,
    data_evento: DataTypes.DATE,
    sexo: DataTypes.STRING,
    quantidade_castrada: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Castracao',
    tableName: 'castracoes'
  });
  return Castracao;
};