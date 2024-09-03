const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController.js');

const router = Router();

router.get('/usuario', UsuarioController.obterTodos);
router.get('/usuario/:id', UsuarioController.obterPorId);

module.exports = router;