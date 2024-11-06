const { Router } = require("express");
const fileUpload = require("express-fileupload");
const ObservacoesController = require("../controllers/");
const autenticado = require("../middleware/autenticado.js");

const router = Router();

router.use(fileUpload());

router.post("/animal/observacoes", autenticado, ObservacoesController);
router.put("/animal/observacao/:id", autenticado, ObservacoesController.atualizar);
router.delete("/animal/observacao/:id", autenticado, ObservacoesController.deletar);
router.get("/animal/observacao", autenticado, ObservacoesController.obterTodos);
router.get("/animal/observacao/:id", autenticado, ObservacoesController.obterPorId);

module.exports = router;