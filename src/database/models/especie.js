'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Especie extends Model {
    static associate(models) {
      Especie.hasMany(models.Animal, {
        foreignKey: 'especie_id',
        as: 'animais',
      });
    }
  }

  Especie.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Nome da espécie já existe. Escolha outro nome.",
      },
      validate: {
        notEmpty: {
          msg: "O campo nome não pode ser vazio."
        },
        len: {
          args: [2, 50],
          msg: "O nome deve ter entre 2 e 50 caracteres."
        },
        isUnique: async (value, next) => {
          try {
            const especie = await Especie.findOne({ where: { nome: value.toLowerCase() } });
            if (especie) {
              return next(new Error('Nome da espécie já existe. Escolha outro nome.'));
            }
            return next();
          } catch (error) {
            return next(error);
          }
        }
      },
      set(value) {
        this.setDataValue('nome', value.toLowerCase());
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true 
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Especie',
    tableName: 'especies'
  });

  return Especie;
};
