const { Router } = require('express');
const CuidadorController = require('../controllers/old/CuidadorController.js');

const router = Router();

router.get('/cuidador', CuidadorController.obterTodos);
router.get('/cuidador/:id', CuidadorController.obterPorId);
router.post('/cuidador', CuidadorController.adicionar);
router.put('/cuidador/:id', CuidadorController.atualizar);
router.delete('/cuidador/:id', CuidadorController.excluir);

module.exports = router;