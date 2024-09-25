'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      Pessoa.hasMany(models.Endereco, {
        foreignKey: 'pessoa_id',
      });
      Pessoa.hasMany(models.Contato, {
        foreignKey: 'pessoa_id',
      });
      Pessoa.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
      });
      Pessoa.belongsToMany(models.Animal, {
        through: models.Adocao,
        foreignKey: 'pessoa_id',
        otherKey: 'animal_id',
        as: 'animais',
      });
    }
  }
  Pessoa.init({
    status: DataTypes.BOOLEAN,
    nome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    data_envio: DataTypes.DATE,
    profissao: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas'
  });
  return Pessoa;
};