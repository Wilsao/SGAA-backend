const AnimalController = require('../controller/AnimalController');
const animalController = new AnimalController();
const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();

router.use(fileUpload());

router.get('/animal', animalController.obterTodos);
router.get('/animal/:id', animalController.obterPorId);
router.post('/animal', animalController.adicionar);
router.put('/animal/:id', animalController.atualizar);
router.delete('/animal/:id', animalController.excluir);
router.get('/animal/filtrar/:termobusca', animalController.filtrar);
router.post('/animais', (req, res) => animalController.adicionar(req, res));
router.put('/animais/:id', (req, res) => animalController.atualizar(req, res));
module.exports = router;