'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StatusAnimal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StatusAnimal.hasMany(models.Animal, {
        foreignKey: 'status_animal_id'
      });
    }
  }
  StatusAnimal.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StatusAnimal',
    tableName: 'status_animal'
  });
  return StatusAnimal;
};