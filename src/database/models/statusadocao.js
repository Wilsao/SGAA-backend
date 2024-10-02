'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StatusAdocao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StatusAdocao.hasMany(models.Adocao, {
        foreignKey: 'status_adocao_id'
      });
    }
  }
  status_adocao.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StatusAdocao',
    tableName: 'status_adocao'
  });
  return status_adocao;
};