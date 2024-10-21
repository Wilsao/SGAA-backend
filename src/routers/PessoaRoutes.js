const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');
const autenticado = require('../middleware/autenticado.js');

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


router.get('/pessoa/', autenticado, PessoaController.obterTodos);
router.get('/pessoa/cpf', autenticado, PessoaController.obterPorCpf);
router.get('/pessoa/:id', autenticado, PessoaController.obterPorId);
router.post('/pessoa/', PessoaController.adicionar);
router.put('/pessoa/:id/', autenticado, PessoaController.atualizar);
router.delete('/pessoa/:id', autenticado, PessoaController.deletar);
router.get('/pessoa/endereco/:id', autenticado, PessoaController.obterEnderecos);

router.get('/pessoa/endereco/:id', PessoaController.obterEnderecos);
router.post('/pessoa/:id/endereco/', PessoaController.addEndereco);
router.put('/pessoa/:id/endereco/:enderecoId', PessoaController.atualizarEndereco);
router.delete('/pessoa/:id/endereco/:enderecoId', PessoaController.removeEndereco);

router.get('/pessoa/contato/:id', PessoaController.obterContatos);
router.post('/pessoa/:id/contato/', PessoaController.addContato);
router.put('/pessoa/:id/contato/:contatoId', PessoaController.atualizarContato);
router.delete('/pessoa/:id/contato/:contatoId', PessoaController.removeContato);

module.exports = router;  