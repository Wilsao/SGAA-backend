const { Router } = require('express');
const fileUpload = require('express-fileupload');
const AnimalController = require('../controllers/AnimaisController.js');
const autenticado = require('../middleware/autenticado.js');

const router = Router();

router.use(fileUpload());

router.get('/animal', AnimalController.obterTodos); // ESTÁ NO POSTMAN
router.get('/animal/:id', AnimalController.obterPorId); // ESTÁ NO POSTMAN
router.post('/animal', autenticado, AnimalController.adicionar); // ESTÁ NO POSTMAN
router.put('/animal/:id', autenticado, AnimalController.atualizar); // ESTÁ NO POSTMAN
router.delete('/animal/:id', autenticado, AnimalController.deletar); // ESTÁ NO POSTMAN
router.get('/animal/filtrar/:termobusca', AnimalController.filtrar); // ESTÁ NO POSTMAN

router.post('/animais', (req, res) => AnimalController.adicionar(req, res)); //Não soube usar essa rota no postman
router.put('/animais/:id', (req, res) => AnimalController.atualizar(req, res)); //Não soube usar essa rota no postman

module.exports = router;