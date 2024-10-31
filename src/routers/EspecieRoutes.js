const { Router } = require("express");
const EspecieController = require("../controllers/EspecieController.js");
const autenticado = require("../middleware/autenticado.js");

const router = Router();

//ROTAS AUTENTICADAS
router.post("/especie", autenticado, EspecieController.adicionar); // ESTÁ NO POSTMAN (Cadastrar especie - testado - com validações)
router.put("/especie/:id", autenticado, EspecieController.atualizar); // ESTÁ NO POSTMAN (Editar especie - testado - com validações)
router.delete("/especie/:id", autenticado, EspecieController.deletar); // ESTÁ NO POSTMAN (Deletar especie - testado - com validações)


//ROTAS **NÃO** AUTENTICADAS
router.get("/especie", EspecieController.obterTodos); // ESTÁ NO POSTMAN (Listar especies - testado - com validações)
router.get("/especie/:id", EspecieController.obterPorId); // ESTÁ NO POSTMAN (Buscar especie por ID - testado - com validações)
router.get("/especie/nome/:nome", EspecieController.obterPorNome); // ESTÁ NO POSTMAN (Buscar especie por NOME - testado - com validações)

module.exports = router;
