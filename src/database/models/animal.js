"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Animal extends Model {
    static associate(models) {
      Animal.belongsTo(models.StatusAnimal, {
        foreignKey: "status_animal_id",
        as: "statusAnimal",
      });
      Animal.belongsTo(models.Especie, {
        foreignKey: "especie_id",
        as: "especie",
      });
      Animal.belongsToMany(models.Pessoa, {
        through: models.Adocao,
        foreignKey: "animal_id",
        otherKey: "pessoa_id",
        as: "pessoas",
      });
      Animal.belongsTo(models.Pessoa, {
        foreignKey: "responsavel_id",
        as: "responsavel",
      });
    }
  }

  Animal.init(
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sexo: {
        type: DataTypes.ENUM("M", "F"),
        allowNull: false,
        validate: {
          isIn: [["M", "F"]],
        },
      },
      cor_pelagem: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deficiencia: DataTypes.STRING,
      data_ocorrencia: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      data_nascimento_aproximada: DataTypes.DATE,
      numero_baia: DataTypes.STRING,
      numero_chip: {
        type: DataTypes.STRING,
        unique: true,
      },
      condicao_resgate: DataTypes.STRING,
      status_animal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "status_animais",
          key: "id",
        },
      },
      especie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "especies",
          key: "id",
        },
      },
      responsavel_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "pessoas",
          key: "id",
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Animal",
      tableName: "animais",
    }
  );

  return Animal;
};
