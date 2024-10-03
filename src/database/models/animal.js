'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Animal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Animal.belongsTo(models.StatusAnimal, {
        foreignKey: 'status_animal_id'
      });
      Animal.belongsTo(models.Especie, {
        foreignKey: 'especie_id'
      });
      Animal.belongsTo(models.Castracao, {
        foreignKey: 'castracao_id'
      });
      Animal.belongsToMany(models.Pessoa, {
        through: models.Adocao,
        foreignKey: 'animal_id',
        otherKey: 'pessoa_id',
        as: 'pessoas',
      });
    }
  }
  Animal.init({
    nome: DataTypes.STRING,
    sexo: DataTypes.STRING,
    pelagem: DataTypes.STRING,
    deficiencia: DataTypes.STRING,
    idade: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    numero_chip: DataTypes.STRING,
    numero_baia: DataTypes.STRING,
    condicao_resgate: DataTypes.STRING,
    especie_id: DataTypes.INTEGER,
    castracao_id: DataTypes.INTEGER,
    data_nascimento: DataTypes.DATE,
    data_morte: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Animal',
    tableName: 'animais'
  });
  return Animal;
};