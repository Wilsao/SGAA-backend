const express = require('express');
const router = express.Router();
const AdocaoController = require('../controller/AdocaoController');
const adocaoController = new AdocaoController();
const fileUpload = require('express-fileupload');

router.use(fileUpload());

// Rotas para formulários de adoção
router.post('/adocao', adocaoController.adicionar);
router.get('/adocao', adocaoController.obterTodos);
router.get('/adocao/:id', adocaoController.obterPorId);
router.put('/adocao/:id', adocaoController.atualizar);
router.delete('/adocao/:id', adocaoController.excluir);

module.exports = router;