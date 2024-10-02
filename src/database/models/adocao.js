'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Adocao extends Model {
    static associate(models) {
      Adocao.belongsTo(models.Pessoa, {
        foreignKey: 'pessoa_id',
        as: 'pessoa'
      });
      Adocao.belongsTo(models.Animal, {
        foreignKey: 'animal_id',
        as: 'animal'
      });
      Adocao.belongsTo(models.status_adocao, {
        foreignKey: 'status_adocao_id',
        as: 'status_adocao'
      });
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