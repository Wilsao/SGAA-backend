const { Router } = require('express');
const cuidadorController = require('../controllers/old/CuidadorController.js');
const CuidadorController = new cuidadorController();

const router = Router();

router.get('/cuidador', CuidadorController.obterTodos);
router.get('/cuidador/:id', CuidadorController.obterPorId);
router.post('/cuidador', CuidadorController.adicionar);
router.put('/cuidador/:id', CuidadorController.atualizar);
router.delete('/cuidador/:id', CuidadorController.excluir);

module.exports = router;