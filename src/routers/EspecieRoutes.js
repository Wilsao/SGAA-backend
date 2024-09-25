const { Router } = require('express');
const EspecieController = require('../controllers/EspecieController.js');
const autenticado = require('../middleware/autenticado.js');

const router = Router();

router.get('/especie', EspecieController.obterTodos);
router.get('/especie/:id', EspecieController.obterPorId);
router.post('/especie', autenticado, EspecieController.adicionar);
router.put('/especie/:id', autenticado, EspecieController.atualizar);
router.delete('/especie/:id', autenticado, EspecieController.excluir);

module.exports = router;