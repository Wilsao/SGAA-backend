const { Router } = require('express');
const CastracaoController = require('../controllers/CastracaoController.js');
const autenticado = require('../middleware/autenticado.js');

const router = Router();

router.get('/castracao', autenticado, CastracaoController.obterTodos);
router.get('/castracao/:id', autenticado, CastracaoController.obterPorId);
router.post('/castracao', autenticado, CastracaoController.inserir);
router.put('/castracao/:id', autenticado, CastracaoController.atualizar);
router.delete('/castracao/:id', autenticado, CastracaoController.excluir);
router.get('/castracao/filtrar/:termobusca', autenticado, CastracaoController.filtrar);
// router.get('/castracao/filtrarPorAno/:ano', autenticado, CastracaoController.filtrarPorAno);

module.exports = router;