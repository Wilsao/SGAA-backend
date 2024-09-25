const { Router } = require('express');
const fileUpload = require('express-fileupload');
const AnimalController = require('../controllers/AnimaisController.js');
const autenticado = require('../middleware/autenticado.js');

const router = Router();

router.use(fileUpload());

router.get('/animal', AnimalController.obterTodos);
router.get('/animal/:id', AnimalController.obterPorId);
router.post('/animal', autenticado, AnimalController.adicionar);
router.put('/animal/:id', autenticado, AnimalController.atualizar);
router.delete('/animal/:id', autenticado, AnimalController.excluir);
router.get('/animal/filtrar/:termobusca', AnimalController.filtrar);
router.post('/animais', (req, res) => AnimalController.adicionar(req, res));
router.put('/animais/:id', (req, res) => AnimalController.atualizar(req, res));

module.exports = router;