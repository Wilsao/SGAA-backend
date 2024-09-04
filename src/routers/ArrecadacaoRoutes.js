const { Router } = require('express');
const arrecadacaoController = require('../controllers/old/ArrecadacaoController.js');
const ArrecadacaoController = new arrecadacaoController();

const router = Router();

router.get('/arrecadacao', ArrecadacaoController.obterTodos);
router.get('/arrecadacao/:id', ArrecadacaoController.obterPorId);
router.post('/arrecadacao', ArrecadacaoController.adicionar);
router.put('/arrecadacao/:id', ArrecadacaoController.atualizar);
router.delete('/arrecadacao/:id', ArrecadacaoController.excluir);
router.get('/arrecadacao/filtrar/:termobusca', ArrecadacaoController.filtrar);
router.get('/arrecadacao/filtrarPorAno/:ano', ArrecadacaoController.filtrarPorAno);
module.exports = router;