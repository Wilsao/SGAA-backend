const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');
const autenticado = require('../middleware/autenticado.js');

const router = Router();

router.get('/pessoa/', autenticado, PessoaController.obterTodos);
router.get('/pessoa/cpf', autenticado, PessoaController.obterPorCpf);
router.get('/pessoa/:id', autenticado, PessoaController.obterPorId);
router.post('/pessoa/', autenticado, PessoaController.adicionar);
router.put('/pessoa/:id/', autenticado, PessoaController.atualizar);
router.delete('/pessoa/:id', autenticado, PessoaController.deletar);
router.get('/pessoa/endereco/:id', autenticado, PessoaController.obterEnderecos);

module.exports = router;  