const { Router } = require('express');
const fileUpload = require('express-fileupload');
const AdocaoController = require('../controllers/AdocaoController.js');

const router = Router();

router.use(fileUpload());

// Rotas para formulários de adoção
//ROTAS **NÃO** AUTENTICADAS
router.get('/adocao', AdocaoController.obterTodos);  // ESTÁ NO POSTMAN (Listar adocoes - testado - com validações)
router.get('/adocao/:id', AdocaoController.obterPorId); // ESTÁ NO POSTMAN (Buscar adocao por ID - testado - com validações)
router.put('/adocao/:id', AdocaoController.atualizar); // ESTÁ NO POSTMAN (Editar adocao - testado - com validações)
router.delete('/adocao/:id', AdocaoController.excluir); 

router.post('/adocao', AdocaoController.adicionar); // ERROOOOO >>> ESTOU RECEBENDO UM ERRO QUE PESSOA_ID NÃO PODE SER NULL - MAS NAO ESTOU MANDANDO NULL.. 


module.exports = router;