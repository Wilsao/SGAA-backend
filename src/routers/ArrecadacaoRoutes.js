const { Router } = require('express');
const ArrecadacaoController = require('../controllers/ArrecadacaoController.js');
const autenticado = require('../middleware/autenticado.js');

const router = Router();

router.get('/arrecadacao', autenticado, ArrecadacaoController.obterTodos);
router.get('/arrecadacao/:id', autenticado, ArrecadacaoController.obterPorId);
router.post('/arrecadacao', autenticado, ArrecadacaoController.adicionar);
router.put('/arrecadacao/:id', autenticado, ArrecadacaoController.atualizar);
router.delete('/arrecadacao/:id', autenticado, ArrecadacaoController.excluir);
router.get('/arrecadacao/filtrar/:termobusca', autenticado, ArrecadacaoController.filtrar);
router.get('/arrecadacao/filtrarPorAno/:ano', autenticado, ArrecadacaoController.filtrarPorAno);
module.exports = router;