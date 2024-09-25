'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Especie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Especie.hasMany(models.Animal, {
        foreignKey: 'especie_id'
      })
    }
  }
  Especie.init({
    nome: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    upatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Especie',
    tableName: 'especies'
  });
  return Especie;
};