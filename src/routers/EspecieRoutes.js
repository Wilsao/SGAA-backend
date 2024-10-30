const { Router } = require("express");
const EspecieController = require("../controllers/EspecieController.js");
const autenticado = require("../middleware/autenticado.js");

const router = Router();

router.get("/especie", EspecieController.obterTodos); // ESTÁ NO POSTMAN (testado - com validações)
router.get("/especie/:id", EspecieController.obterPorId); // ESTÁ NO POSTMAN (testado - com validações)
router.get("/especie/nome/:nome", EspecieController.obterPorNome); // ESTÁ NO POSTMAN (testado - com validações)
router.post("/especie", autenticado, EspecieController.adicionar); // ESTÁ NO POSTMAN (testado - com validações)
router.put("/especie/:id", autenticado, EspecieController.atualizar); // ESTÁ NO POSTMAN (testado - com validações)
router.delete("/especie/:id", autenticado, EspecieController.deletar); // ESTÁ NO POSTMAN (testado - com validações)

module.exports = router;
