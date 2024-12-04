const { Router } = require('express');
const CastracaoController = require('../controllers/CastracaoController.js');
const autenticado = require('../middleware/autenticado.js');

const router = Router();

//ROTAS AUTENTICADAS
router.get('/castracao/relatorio', CastracaoController.relatorio);
router.get('/castracao/relatorio/pdf', CastracaoController.relatorioPdf);
router.get('/castracao', autenticado, CastracaoController.obterTodos); // ESTÁ NO POSTMAN (Listar castracoes - testado - com validações)
router.get('/castracao/:id', autenticado, CastracaoController.obterPorId); // ESTÁ NO POSTMAN (Buscar castracao por ID - testado - com validações)
router.post('/castracao', autenticado, CastracaoController.inserir); // ESTÁ NO POSTMAN (Cadastrar castracao - testado - com validações)
router.put('/castracao/:id', autenticado, CastracaoController.atualizar); // ESTÁ NO POSTMAN (Editar castracao - testado - com validações)
router.delete('/castracao/:id', autenticado, CastracaoController.excluir); // ESTÁ NO POSTMAN (Deletar castracao - testado - com validações)
router.get('/castracao/filtrar/:termobusca', autenticado, CastracaoController.filtrar); // ESTÁ NO POSTMAN (Filtrar por local do evento e descricao - testado - com validações)

//ROTAS **NÃO** AUTENTICADAS
//não tem ainda



module.exports = router;