const router = require("express").Router();
const AnimalController = require("../controllers/AnimaisController.js");
const autenticado = require("../middleware/autenticado.js");

//ROTAS AUTENTICADAS
router.post("/animal", autenticado, AnimalController.adicionar); // ESTÁ NO POSTMAN (Cadastrar animal - testado - com validações)
router.put("/animal/:id", autenticado, AnimalController.atualizar); // ESTÁ NO POSTMAN (Editar animal - testado - com validações)
router.delete("/animal/:id", autenticado, AnimalController.deletar); // ESTÁ NO POSTMAN (Deletar animal - testado - com validações)

//ROTAS **NÃO** AUTENTICADAS
router.get("/animal", AnimalController.obterTodos); // ESTÁ NO POSTMAN (Listar animais - testado - com validações)
router.get("/animal/:id", AnimalController.obterPorId); // ESTÁ NO POSTMAN (Buscar animal por ID - testado - com validações)
router.get("/animal/filtrar/:termobusca", AnimalController.filtrar); // ESTÁ NO POSTMAN (Buscar animal por nome, cor/pelagem, baia, chip, deficiência e condição resgate - testado - com validações)
router.get("/animal/imagens/:id", AnimalController.listarImagens);
// router.post("/animais", (req, res) => AnimalController.adicionar(req, res)); //Não soube usar essa rota no postman
// router.put("/animais/:id", (req, res) => AnimalController.atualizar(req, res)); //Não soube usar essa rota no postman
router.delete('/animal/imagens/:key', autenticado, AnimalController.deletarImagem);

module.exports = router;
