const { Router } = require('express');
const EspecieController = require('../controllers/old/EspecieController.js');

const router = Router();

router.get('/especie', EspecieController.obterTodos);
router.get('/especie/:id', EspecieController.obterPorId);
router.post('/especie', EspecieController.adicionar);
router.put('/especie/:id', EspecieController.atualizar);
router.delete('/especie/:id', EspecieController.excluir);

module.exports = router;