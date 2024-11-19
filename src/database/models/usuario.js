// models/Usuario.js

"use strict";
const { Model, Op } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.belongsTo(models.TipoUsuario, {
        foreignKey: "tipo_usuario_id",
      });

      Usuario.hasOne(models.Pessoa, {
        foreignKey: "usuario_id",
        as: "pessoa",
      });
    }

    async isAdmin() {
      const tipoAdmin = await sequelize.models.TipoUsuario.findOne({
        where: { nome: "Administrador" },
      });
      return this.tipo_usuario_id === tipoAdmin.id;
    }

    static async validarExclusao(usuarioId, usuarioExcluindoId) {
      if (usuarioId === usuarioExcluindoId) {
        throw new Error("Você não pode excluir a si mesmo.");
      }

      const usuarioExcluindo = await Usuario.findOne({
        where: { id: usuarioExcluindoId },
      });

      if (!usuarioExcluindo || !(await usuarioExcluindo.isAdmin())) {
        throw new Error("Usuário não autorizado para exclusão.");
      }

      const tipoAdmin = await sequelize.models.TipoUsuario.findOne({
        where: { nome: "Administrador" },
      });

      const qtdeAdmins = await Usuario.count({
        where: { tipo_usuario_id: tipoAdmin.id },
      });

      if (qtdeAdmins === 1 && usuarioId === usuarioExcluindoId) {
        throw new Error("É necessário que exista pelo menos um administrador.");
      }
    }

    // Method to compare passwords
    async checkPassword(senha) {
      return await bcrypt.compare(senha, this.senha);
    }
  }

  Usuario.init(
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 100],
            msg: "O nome deve ter entre 3 e 100 caracteres.",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Esse e-mail já está em uso.",
        },
        validate: {
          isEmail: {
            msg: "O e-mail deve ser um endereço de e-mail válido.",
          },
          notEmpty: {
            msg: "O e-mail não pode estar vazio.",
          },
        },
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 100],
            msg: "A senha deve ter entre 6 e 100 caracteres.",
          },
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      pergunta: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resposta: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tipo_usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Usuario",
      tableName: "usuarios",
      defaultScope: {
        attributes: {
          exclude: ["senha"],
        },
      },
      hooks: {
        // Hook to handle password hashing and email uniqueness on creation
        async beforeCreate(usuario) {
          // Email uniqueness check
          const existingUser = await Usuario.findOne({
            where: { email: usuario.email },
          });
          if (existingUser) {
            throw new Error("Já existe um usuário com esse e-mail.");
          }
          // Password hashing
          if (usuario.senha) {
            const hash = await bcrypt.hash(usuario.senha, 10);
            usuario.senha = hash;
          }
        },
        // Hook to handle password hashing and email uniqueness on update
        async beforeUpdate(usuario) {
          // Email uniqueness check
          if (usuario.changed("email")) {
            const existingUser = await Usuario.findOne({
              where: {
                email: usuario.email,
                id: { [Op.ne]: usuario.id },
              },
            });
            if (existingUser) {
              throw new Error("Esse e-mail já está em uso por outro usuário.");
            }
          }
          // Password hashing if the password has changed
          if (usuario.changed("senha")) {
            if (usuario.senha) {
              const hash = await bcrypt.hash(usuario.senha, 10);
              usuario.senha = hash;
            }
          }
        },
      },
    }
  );

  return Usuario;
};
