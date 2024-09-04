const { Router } = require('express');
const CastracaoController = require('../controllers/old/CastracaoController.js');

const router = Router();

router.get('/castracao', CastracaoController.obterTodos);
router.get('/castracao/:id', CastracaoController.obterPorId);
router.post('/castracao', CastracaoController.adicionar);
router.put('/castracao/:id', CastracaoController.atualizar);
router.delete('/castracao/:id', CastracaoController.excluir);
router.get('/castracao/filtrar/:termobusca', CastracaoController.filtrar);
router.get('/castracao/filtrarPorAno/:ano', CastracaoController.filtrarPorAno);

module.exports = router;