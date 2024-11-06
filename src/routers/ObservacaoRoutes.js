const { Router } = require("express");
const fileUpload = require("express-fileupload");
const ObservacoesController = require("../controllers/ObservacaoController.js");
const autenticado = require("../middleware/autenticado.js");

const router = Router();

router.use(fileUpload());

router.post("/animal/observacao", autenticado, ObservacoesController.adicionar);
router.put("/animal/observacao/:id", autenticado, ObservacoesController.atualizar);
router.delete("/animal/observacao/:id", autenticado, ObservacoesController.deletar);
router.get("/animal/observacao/:id", autenticado, ObservacoesController.obterPorAnimalId);

module.exports = router;