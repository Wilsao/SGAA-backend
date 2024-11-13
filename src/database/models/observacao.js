'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class observacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      observacao.belongsTo(models.Animal, {
        foreignKey: "animal_id",
        as: "animal",
      });
    }
  }
  observacao.init({
    titulo: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('pendente', 'em_progresso', 'concluida'),
      allowNull: false,
      defaultValue: 'pendente',
    },
    descricao: DataTypes.STRING,
    data_inicio: DataTypes.DATE,
    data_fim: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Observacao',
    tableName: 'observacoes'
  });
  return observacao;
};