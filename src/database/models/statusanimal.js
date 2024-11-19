'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StatusAnimal extends Model {
    static associate(models) {
      StatusAnimal.hasMany(models.Animal, {
        foreignKey: 'status_animal_id'
      });
    }
  }
  StatusAnimal.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'StatusAnimal',
    tableName: 'status_animal'
  });
  return StatusAnimal;
};
