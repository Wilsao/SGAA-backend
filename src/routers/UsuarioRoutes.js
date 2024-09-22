const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController.js');
const autenticado = require('../middleware/autenticado.js');

const router = Router();

/**
 * @swagger
 * /usuario/:
 *   get:
 *     summary: Retorna uma lista de usuários
 *     security:
 *       - bearerAuth: []  # JWT token
 *     responses:
 *       200:
 *         description: Lista de usuários obtida com sucesso
 *       401:
 *         description: Não autorizado (Token JWT inválido ou ausente)
 */
router.get('/usuario/', autenticado, UsuarioController.obterTodos);

/**
 * @swagger
 * /usuario/email/:
 *   get:
 *     summary: Retorna um usuário por e-mail
 *     security:
 *       - bearerAuth: []  # JWT token
 *     responses:
 *       200:
 *         description: Usuário obtido com sucesso
 *       401:
 *         description: Não autorizado (Token JWT inválido ou ausente)
 *       404:
 *         description: Usuário não encontrado
 */
router.post('/usuario/email/', autenticado, UsuarioController.obterPorEmail);

/**
 * @swagger
 * /usuario/tipousuario/{tipo}:
 *   get:
 *     summary: Retorna usuários pelo tipo de usuário
 *     parameters:
 *       - name: tipo
 *         in: path
 *         required: true
 *         description: O ID do tipo de usuário
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []  # JWT token
 *     responses:
 *       200:
 *         description: Usuários obtidos com sucesso
 *       401:
 *         description: Não autorizado (Token JWT inválido ou ausente)
 *       404:
 *         description: Tipo de usuário não encontrado
 */
router.get('/usuario/tipousuario/:tipo', autenticado, UsuarioController.ObterPorTipoUsuarioId);

/**
 * @swagger
 * /usuario/{id}/:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O ID do usuário
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []  # JWT token
 *     responses:
 *       200:
 *         description: Usuário obtido com sucesso
 *       401:
 *         description: Não autorizado (Token JWT inválido ou ausente)
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/usuario/:id/', autenticado, UsuarioController.obterPorId);

/**
 * @swagger
 * /usuario/:
 *   post:
 *     summary: Adiciona um novo usuário
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
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 *       401:
 *         description: Não autorizado (Token JWT inválido ou ausente)
 */
router.post('/usuario/', autenticado, UsuarioController.adicionar);

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
router.put('/usuario/:id/', autenticado, UsuarioController.atualizar);

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