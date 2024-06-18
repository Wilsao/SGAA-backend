const CuidadorController = require('../controller/CuidadorController');
const cuidadorController = new CuidadorController();
const express = require('express');
const router = express.Router();

router.get('/cuidador', cuidadorController.obterTodos);
router.get('/cuidador/:id', cuidadorController.obterPorId);
router.post('/cuidador', cuidadorController.adicionar);
router.put('/cuidador/:id', cuidadorController.atualizar);
router.delete('/cuidador/:id', cuidadorController.excluir);
module.exports = router;