const { Router } = require('express');
const ArrecadacaoController = require('../controllers/ArrecadacaoController.js');
const autenticado = require('../middleware/autenticado.js');

const router = Router();

//ROTAS AUTENTICADAS
router.get('/arrecadacao/relatorio', ArrecadacaoController.relatorio);
router.get('/arrecadacao/relatorio/pdf', ArrecadacaoController.relatorioPdf);
router.get('/arrecadacao', autenticado, ArrecadacaoController.obterTodos);  // ESTÁ NO POSTMAN (Listar arrecadacoes - testado - com validações)
router.get('/arrecadacao/:id', autenticado, ArrecadacaoController.obterPorId); // ESTÁ NO POSTMAN (Buscar arrecadacao por ID - testado - com validações)
router.post('/arrecadacao', autenticado, ArrecadacaoController.adicionar);  // ESTÁ NO POSTMAN (Cadastrar arrecadacao - testado - com validações)
router.put('/arrecadacao/:id', autenticado, ArrecadacaoController.atualizar);  // ESTÁ NO POSTMAN (Editar arrecadacao - testado - com validações)
router.delete('/arrecadacao/:id', autenticado, ArrecadacaoController.deletar);  // ESTÁ NO POSTMAN (Deletar arrecadacao - testado - com validações)
router.get('/arrecadacao/filtrar/:termobusca', autenticado, ArrecadacaoController.filtrar);  // ESTÁ NO POSTMAN (Filtrar arrecadacao por nome do evento e descricao - testado - com validações)
router.get('/arrecadacao/filtrarPorAno/:ano', autenticado, ArrecadacaoController.filtrarPorAno); // ESTÁ NO POSTMAN (Filtrar arrecadacao por ano - testado - com validações)

//ROTAS **NÃO** AUTENTICADAS
//não tem ainda

module.exports = router;