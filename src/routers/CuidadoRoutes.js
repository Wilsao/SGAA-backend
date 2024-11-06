const { Router } = require("express");
const fileUpload = require("express-fileupload");
const CuidadoController = require("../controllers/CuidadoController.js");
const autenticado = require("../middleware/autenticado.js");

const router = Router();

router.use(fileUpload());

router.post("/cuidado", autenticado, CuidadoController.adicionar);
router.put("/cuidado/:id", autenticado, CuidadoController.atualizar);
router.delete("/cuidado/:id", autenticado, CuidadoController.deletar);
router.get("/cuidado/animal/:id", autenticado, CuidadoController.obterCuidadosPorAnimal);
router.get("/cuidado/cuidador/:id", autenticado, CuidadoController.obterCuidadoPorUsuario);

module.exports = router;