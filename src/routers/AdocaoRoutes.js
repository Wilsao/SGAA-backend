const { Router } = require('express');
const fileUpload = require('express-fileupload');
const adocaoController = require('../controllers/old/AdocaoController.js');
const AdocaoController = new adocaoController();

const router = Router();

router.use(fileUpload());

// Rotas para formulários de adoção
router.post('/adocao', AdocaoController.adicionar);
router.get('/adocao', AdocaoController.obterTodos);
router.get('/adocao/:id', AdocaoController.obterPorId);
router.put('/adocao/:id', AdocaoController.atualizar);
router.delete('/adocao/:id', AdocaoController.excluir);

module.exports = router;