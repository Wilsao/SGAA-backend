const { Router } = require('express');
const cuidadorController = require('../controllers/old/CuidadorController.js');
const autenticado = require('../middleware/autenticado.js');
const CuidadorController = new cuidadorController();

const router = Router();

router.get('/cuidador', autenticado, CuidadorController.obterTodos);
router.get('/cuidador/:id', autenticado, CuidadorController.obterPorId);
router.post('/cuidador', autenticado, CuidadorController.adicionar);
router.put('/cuidador/:id', autenticado, CuidadorController.atualizar);
router.delete('/cuidador/:id', autenticado, CuidadorController.excluir);

module.exports = router;