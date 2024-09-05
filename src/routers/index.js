const express = require('express');
const auth = require('./AuthRoutes.js');
const usuarios = require('./UsuarioRoutes.js');
const animal = require('./AnimaisRoutes.js');
const cuidador = require('./CuidadorRoutes.js');
const especie = require('./EspecieRoutes.js');
const castracao = require('./CastracaoRoutes.js');
const arrecadacao = require('./ArrecadacaoRoutes.js');
const adocao = require('./AdocaoRoutes.js');

module.exports = app => {
  app.use(
    express.json(),
    adocao,
    auth,
    usuarios,
    animal,
    cuidador,
    especie,
    castracao,
    arrecadacao,
  )
}