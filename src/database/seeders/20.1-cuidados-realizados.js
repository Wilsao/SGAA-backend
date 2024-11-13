'use strict';

const { Cuidado } = require('../models'); // Importa o modelo Cuidado para consulta

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Busca todos os registros da tabela 'cuidados' e extrai os IDs
    const cuidados = await Cuidado.findAll({ attributes: ['id'] });
    const cuidadosIds = cuidados.map(cuidado => cuidado.id);

    const usuarios = await Usuario.findAll({ attributes: ['id'] });
    const usuariosIds = usuarios.map(usuario => usuario.id);

    // await queryInterface.bulkInsert('outra_tabela', cuidadosIds.map(id => ({ cuidado_id: id, ... })));
  },

  async down(queryInterface, Sequelize) {
    // Defina a lógica de reversão se necessário
  }
};
