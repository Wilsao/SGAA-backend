'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      Pessoa.hasMany(models.Endereco, {
        foreignKey: 'pessoa_id',
        as: 'enderecos'
      });
      Pessoa.hasMany(models.Contato, {
        foreignKey: 'pessoa_id',
        as: 'contatos'
      });
      Pessoa.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario'
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
    nome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    sexo: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    cuidador: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas'
  });
  return Pessoa;
};