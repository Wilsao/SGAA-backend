const { Router } = require('express');
const TipoUsuarioController = require('../controllers/TipoUsuarioController.js');
const autenticado = require('../middleware/autenticado.js');

const router = Router();

router.get('/tipousuario', autenticado, TipoUsuarioController.obterTodos);
router.get('/tipousuario/:id', autenticado, TipoUsuarioController.obterPorId);
router.post('/tipousuario', autenticado, TipoUsuarioController.adicionar);
router.put('/tipousuario/:id', autenticado, TipoUsuarioController.atualizar);
router.delete('/tipousuario/:id', autenticado, TipoUsuarioController.deletar);

module.exports = router;  