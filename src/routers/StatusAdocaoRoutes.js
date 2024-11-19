// routes/StatusAdocaoRoutes.js

const { Router } = require('express');
const StatusAdocaoController = require('../controllers/StatusAdocaoController.js');

const router = Router();

router.get('/statusadocao', StatusAdocaoController.obterTodos);
router.get('/statusadocao/:id', StatusAdocaoController.obterPorId);
router.post('/statusadocao', StatusAdocaoController.adicionar);
router.put('/statusadocao/:id', StatusAdocaoController.atualizar);
router.delete('/statusadocao/:id', StatusAdocaoController.excluir);

module.exports = router;
