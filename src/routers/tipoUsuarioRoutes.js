const { Router } = require('express');
const TipoUsuarioController = require('../controllers/TipoUsuarioController.js');
const autenticado = require('../middleware/autenticado.js');

const router = Router();


//ROTAS AUTENTICADAS
router.get('/tipousuario', autenticado, TipoUsuarioController.obterTodos);  // ESTÁ NO POSTMAN (Tipo usuário - testado - com validações)
router.get('/tipousuario/:id', autenticado, TipoUsuarioController.obterPorId); // ESTÁ NO POSTMAN (Listar tipo de usuário por ID TIPO - testado - com validações)
router.post('/tipousuario', autenticado, TipoUsuarioController.adicionar); // ESTÁ NO POSTMAN (Cadastrar tipo usuário - testado - com validações)
router.put('/tipousuario/:id', autenticado, TipoUsuarioController.atualizar); // ESTÁ NO POSTMAN (Editar tipo de usuário - testado - com validações)
router.delete('/tipousuario/:id', autenticado, TipoUsuarioController.deletar); // ESTÁ NO POSTMAN (Deletar tipo de usuário - testado - com validações)

//ROTAS **NÃO** AUTENTICADAS
//não tem ainda

module.exports = router;  