const ArrecadacaoController = require('../controller/ArrecadacaoController');
const arrecadacaoController = new ArrecadacaoController();
const express = require('express');
const router = express.Router();

router.get('/arrecadacao', arrecadacaoController.obterTodos);
router.get('/arrecadacao/:id', arrecadacaoController.obterPorId);
router.post('/arrecadacao', arrecadacaoController.adicionar);
router.put('/arrecadacao/:id', arrecadacaoController.atualizar);
router.delete('/arrecadacao/:id', arrecadacaoController.excluir);
router.get('/arrecadacao/filtrar/:termobusca', arrecadacaoController.filtrar);
router.get('/arrecadacao/filtrarPorAno/:ano', arrecadacaoController.filtrarPorAno);
module.exports = router;