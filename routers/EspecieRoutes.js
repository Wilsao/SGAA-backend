const EspecieController = require('../controller/EspecieController');
const especieController = new EspecieController();
const express = require('express');
const router = express.Router();

router.get('/especie', especieController.obterTodos);
router.get('/especie/:id', especieController.obterPorId);
router.post('/especie', especieController.adicionar);
router.put('/especie/:id', especieController.atualizar);
router.delete('/especie/:id', especieController.excluir);
module.exports = router;