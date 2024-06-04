const CastracaoController = require('../controller/CastracaoController');
const castracaoController = new CastracaoController();
const express = require('express');
const router = express.Router();

router.get('/castracao', castracaoController.obterTodos);
router.get('/castracao/:id', castracaoController.obterPorId);
router.post('/castracao', castracaoController.adicionar);
router.put('/castracao/:id', castracaoController.atualizar);
router.delete('/castracao/:id', castracaoController.excluir);
router.get('/castracao/filtrar/:termobusca', castracaoController.filtrar);
router.get('/castracao/filtrarPorAno/:ano', castracaoController.filtrarPorAno);
module.exports = router;