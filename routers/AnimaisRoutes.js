const AnimalController = require('../controller/AnimalController');
const animalController = new AnimalController();
const express = require('express');
const router = express.Router();

router.get('/animal', animalController.obterTodos);
router.get('/animal/:id', animalController.obterPorId);
router.post('/animal', animalController.adicionar);
router.put('/animal/:id', animalController.atualizar);
router.delete('/animal/:id', animalController.excluir);
router.get('/animal/filtrar/:termobusca', animalController.filtrar);
module.exports = router;