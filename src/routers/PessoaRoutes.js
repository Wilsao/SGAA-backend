const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');
const autenticado = require('../middleware/autenticado.js');

const router = Router();

/**
 * @swagger
 * /pessoa/:
 *   get:
 *     summary: Retorna uma lista de pessoas
 *     security:
 *       - bearerAuth: []  # JWT token
 *     responses:
 *       200:
 *         description: Lista de pessoas obtida com sucesso
 *       401:
 *         description: Não autorizado (Token JWT inválido ou ausente)
 */
router.get('/pessoa/', autenticado, PessoaController.obterTodos);

/**
 * @swagger
 * /pessoa/id/:
 *   get:
 *     summary: Retorna uma pessoa pelo ID
 *     security:
 *       - bearerAuth: []  # JWT token
 *     responses:
 *       200:
 *         description: Pessoa obtida com sucesso
 *       401:
 *         description: Não autorizado (Token JWT inválido ou ausente)
 *       404:
 *         description: Pessoa não encontrada
 */
router.post('/pessoa/id/', autenticado, PessoaController.obterPorId);

/**
 * @swagger
 * /pessoa/cpf/:
 *   get:
 *     summary: Retorna uma pessoa pelo CPF
 *     security:
 *       - bearerAuth: []  # JWT token
 *     responses:
 *       200:
 *         description: Pessoa obtida com sucesso
 *       401:
 *         description: Não autorizado (Token JWT inválido ou ausente)
 *       404:
 *         description: Pessoa não encontrada
 */
router.post('/pessoa/cpf/', autenticado, PessoaController.obterPorCpf);

/**
 * @swagger
 * /pessoa/:
 *   post:
 *     summary: Adiciona uma nova pessoa
 *     security:
 *       - bearerAuth: []  # JWT token
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
 *       201:
 *         description: Pessoa criada com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 *       401:
 *         description: Não autorizado (Token JWT inválido ou ausente)
 */
router.post('/pessoa/', autenticado, PessoaController.adicionar);

/**
 * @swagger
 * /usuario/{id}/:
 *   put:
 *     summary: Atualiza um usuário existente pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O ID do usuário a ser atualizado
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []  # JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 *       401:
 *         description: Não autorizado (Token JWT inválido ou ausente)
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/pessoa/:id/', autenticado, PessoaController.atualizar);

/**
 * @swagger
 * /usuario/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O ID do usuário a ser deletado
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []  # JWT token
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       401:
 *         description: Não autorizado (Token JWT inválido ou ausente)
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/usuario/:id', autenticado, UsuarioController.deletar);


module.exports = router;  