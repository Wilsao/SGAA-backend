const { Router } = require('express');
const fileUpload = require('express-fileupload');
const AdocaoController = require('../controllers/AdocaoController.js');

const router = Router();

router.use(fileUpload());

// Rotas para formulários de adoção
//ROTAS **NÃO** AUTENTICADAS
router.get('/adocao', AdocaoController.obterTodos);  // ESTÁ NO POSTMAN (Listar adocoes - testado - com validações)
router.post('/adocao', AdocaoController.adicionar);
router.get('/adocao/:id', AdocaoController.obterPorId);
router.put('/adocao/:id', AdocaoController.atualizar);
router.delete('/adocao/:id', AdocaoController.excluir);

module.exports = router;