const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController.js');
const autenticado = require('../middleware/autenticado.js');

const router = Router();
router.use(autenticado);

router.get('/usuario/', UsuarioController.obterTodos);
router.get('/usuario/email/', UsuarioController.obterPorEmail);
router.get('/usuario/tipousuario/:tipo', UsuarioController.ObterPorTipoUsuarioId);
router.get('/usuario/:id/', UsuarioController.obterPorId);
router.post('/usuario/', UsuarioController.adicionar);
router.put('/usuario/:id/', UsuarioController.atualizar);
router.delete('/usuario/:id', UsuarioController.deletar);

module.exports = router;  