const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController.js");
const autenticado = require("../middleware/autenticado.js");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pessoas
 *   description: Gerenciamento de pessoas
 */

/**
 * @swagger
 * /pessoa/:
 *   get:
 *     summary: Obtém todas as pessoas
 *     tags: [Pessoas]
 *     responses:
 *       200:
 *         description: Lista de pessoas
 *       404:
 *         description: Pessoas não encontradas
 *       500:
 *         description: Erro do servidor
 */

/**
 * @swagger
 * /pessoa/cpf:
 *   get:
 *     summary: Obtém uma pessoa pelo CPF
 *     tags: [Pessoas]
 *     parameters:
 *       - name: cpf
 *         in: query
 *         required: true
 *         description: O CPF da pessoa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pessoa encontrada
 *       404:
 *         description: Pessoa não encontrada
 *       500:
 *         description: Erro do servidor
 */

/**
 * @swagger
 * /pessoa/{id}:
 *   get:
 *     summary: Obtém uma pessoa pelo ID
 *     tags: [Pessoas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O ID da pessoa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pessoa encontrada
 *       404:
 *         description: Pessoa não encontrada
 *       500:
 *         description: Erro do servidor
 */

/**
 * @swagger
 * /pessoa/:
 *   post:
 *     summary: Adiciona uma nova pessoa
 *     tags: [Pessoas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *               contatos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     tipo:
 *                       type: string
 *                     valor:
 *                       type: string
 *               enderecos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     estado:
 *                       type: string
 *                     cidade:
 *                       type: string
 *                     rua:
 *                       type: string
 *                     bairro:
 *                       type: string
 *                     numero:
 *                       type: string
 *                     complemento:
 *                       type: string
 *                     cep:
 *                       type: string
 *     responses:
 *       200:
 *         description: Pessoa adicionada com sucesso
 *       500:
 *         description: Não foi possível cadastrar pessoa
 */

/**
 * @swagger
 * /pessoa/{id}:
 *   put:
 *     summary: Atualiza uma pessoa existente
 *     tags: [Pessoas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O ID da pessoa a ser atualizada
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pessoa atualizada com sucesso
 *       500:
 *         description: Erro do servidor
 */

/**
 * @swagger
 * /pessoa/{id}:
 *   delete:
 *     summary: Exclui uma pessoa pelo ID
 *     tags: [Pessoas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O ID da pessoa a ser excluída
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pessoa excluída com sucesso
 *       500:
 *         description: Erro do servidor
 */

/**
 * @swagger
 * /pessoa/endereco/{id}:
 *   get:
 *     summary: Obtém todos os endereços de uma pessoa
 *     tags: [Pessoas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O ID da pessoa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de endereços
 *       404:
 *         description: Pessoa não encontrada
 *       500:
 *         description: Erro do servidor
 */

/**
 * @swagger
 * /pessoa/{id}/endereco:
 *   post:
 *     summary: Adiciona um endereço a uma pessoa
 *     tags: [Pessoas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O ID da pessoa
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *               cidade:
 *                 type: string
 *               rua:
 *                 type: string
 *               bairro:
 *                 type: string
 *               numero:
 *                 type: string
 *               complemento:
 *                 type: string
 *               cep:
 *                 type: string
 *     responses:
 *       200:
 *         description: Endereço adicionado com sucesso
 *       500:
 *         description: Erro ao adicionar endereço
 */

/**
 * @swagger
 * /pessoa/{id}/endereco/{enderecoId}:
 *   delete:
 *     summary: Remove um endereço de uma pessoa
 *     tags: [Pessoas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O ID da pessoa
 *         schema:
 *           type: integer
 *       - name: enderecoId
 *         in: path
 *         required: true
 *         description: O ID do endereço a ser removido
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Endereço removido com sucesso
 *       404:
 *         description: Endereço não encontrado
 *       500:
 *         description: Erro do servidor
 */

//ROTAS AUTENTICADAS

//pessoas
router.get("/pessoa/", autenticado, PessoaController.obterTodos); // ESTÁ NO POSTMAN (Listar pessoas - testado - com validações)
router.get("/pessoa/cpf", autenticado, PessoaController.obterPorCpf); // ESTÁ NO POSTMAN (Buscar pessoa por CPF - testado - com validações)
router.get("/pessoa/:id", autenticado, PessoaController.obterPorId); // ESTÁ NO POSTMAN (Buscar pessoa por ID - testado - com validações)
router.put("/pessoa/:id/", autenticado, PessoaController.atualizar); // ESTÁ NO POSTMAN (Editar pessoa - testado - com validações)
router.delete("/pessoa/:id", autenticado, PessoaController.deletar); // ESTÁ NO POSTMAN (Deletar pessoa - testado - com validações)

//endereços
router.get(
  "/pessoa/endereco/:id",
  autenticado,
  PessoaController.obterEnderecos
); // ESTÁ NO POSTMAN (Buscar endereço por ID pessoa - testado - com validações)
router.delete(
  "/pessoa/:id/endereco/:enderecoId",
  autenticado,
  PessoaController.removeEndereco
); // ESTÁ NO POSTMAN (Deletar um endereço de uma pessoa  - testado - com validações)

//ROTAS **NÃO** AUTENTICADAS

//pessoas
router.post("/pessoa/", PessoaController.adicionar); // ESTÁ NO POSTMAN (Cadastrar pessoa - testado - com validações)

//endereços
// WILSOOOOOOOOOOOOOOON -> troquei o nome da rota para "busca-endereco", pois por estar igual a rota autenticada não funcionava sem o token
router.get("/pessoa/busca-endereco/:id", PessoaController.obterEnderecos); // ESTÁ NO POSTMAN (Buscar endereço por ID pessoa - testado - com validações)
router.post("/pessoa/:id/endereco/", PessoaController.addEndereco); // ESTÁ NO POSTMAN (Cadastrar endereço para uma pessoa - testado - com validações)
router.put(
  "/pessoa/:id/endereco/:enderecoId",
  PessoaController.atualizarEndereco
); // ESTÁ NO POSTMAN (Editar endereço de uma pessoa - testado - com validações)

//contatos
router.get("/pessoa/contato/:id", PessoaController.obterContatos); // ESTÁ NO POSTMAN (Listar contatos de uma pessoa - testado - com validações)
router.post("/pessoa/:id/contato/", PessoaController.addContato); // ESTÁ NO POSTMAN (Cadastrar contato para pessoa - testado - com validações)
router.put("/pessoa/:id/contato/:contatoId", PessoaController.atualizarContato); // ESTÁ NO POSTMAN (Editar um contato de uma pessoa - testado - com validações)
router.delete("/pessoa/:id/contato/:contatoId", PessoaController.removeContato); // ESTÁ NO POSTMAN (Deletar um contato de uma pessoa - testado - com validações)

module.exports = router;
