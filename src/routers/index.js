const express = require('express');
const auth = require('./AuthRoutes.js');
const tipousuarios = require('./tipoUsuarioRoutes.js');
const usuarios = require('./UsuarioRoutes.js');
const animal = require('./AnimaisRoutes.js');
const especie = require('./EspecieRoutes.js');
const castracao = require('./CastracaoRoutes.js');
const arrecadacao = require('./ArrecadacaoRoutes.js');
const adocao = require('./AdocaoRoutes.js');
const pessoa = require('./PessoaRoutes.js');
const cuidado = require('./CuidadoRoutes.js');
const observacao = require('./ObservacaoRoutes.js');
const statusanimal = require('./StatusAnimalRoutes.js');
const statusadocao = require('./StatusAdocaoRoutes.js');

module.exports = app => {
  app.use(
    express.json(),
    adocao,
    auth,
    tipousuarios,
    usuarios,
    animal,
    especie,
    castracao,
    arrecadacao,
    pessoa,
    cuidado,
    observacao,
    statusanimal,
    statusadocao
  )
}