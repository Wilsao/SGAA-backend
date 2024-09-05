const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController.js');
const autenticado = require('../middleware/autenticado.js');

const router = Router();

router.get('/usuario/', autenticado, UsuarioController.obterTodos);
router.get('/usuario/email/', autenticado, UsuarioController.obterPorEmail);
router.get('/usuario/tipousuario/:tipo', autenticado, UsuarioController.ObterPorTipoUsuarioId);
router.get('/usuario/:id/', autenticado, UsuarioController.obterPorId);
router.post('/usuario/', autenticado, UsuarioController.adicionar);
router.put('/usuario/:id/', autenticado, UsuarioController.atualizar);
router.delete('/usuario/:id', autenticado, UsuarioController.deletar);

module.exports = router;  