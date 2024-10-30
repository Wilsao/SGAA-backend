"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Animal extends Model {
    static associate(models) {
      Animal.belongsTo(models.StatusAnimal, {
        foreignKey: "status_animal_id",
        as: "statusAnimal",
        allowNull: false,
      });
      Animal.belongsTo(models.Especie, {
        foreignKey: "especie_id",
        as: "especie",
        allowNull: false,
      });
      Animal.belongsTo(models.Castracao, {
        foreignKey: "castracao_id",
        as: "castracao",
        allowNull: false,
      });
      Animal.belongsToMany(models.Pessoa, {
        through: models.Adocao,
        foreignKey: "animal_id",
        otherKey: "pessoa_id",
        as: "pessoas",
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
      cuidador: DataTypes.STRING,
      especie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Especies", 
          key: "id",
        },
      },
      castracao_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Castracao", 
          key: "id",
        },
      },
      status_animal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "StatusAnimal", 
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
