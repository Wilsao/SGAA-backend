const { Router } = require("express");
const StatusAnimalController = require("../controllers/StatusAnimalController.js");
const autenticado = require("../middleware/autenticado.js");

const router = Router();

// ROTAS AUTENTICADAS
router.post("/statusanimal", autenticado, StatusAnimalController.adicionar);
router.put("/statusanimal/:id", autenticado, StatusAnimalController.atualizar);
router.delete("/statusanimal/:id", autenticado, StatusAnimalController.deletar);

// ROTAS **NÃO** AUTENTICADAS
router.get("/statusanimal", StatusAnimalController.obterTodos);
router.get("/statusanimal/:id", StatusAnimalController.obterPorId);
router.get("/statusanimal/nome/:nome", StatusAnimalController.obterPorNome);

module.exports = router;
