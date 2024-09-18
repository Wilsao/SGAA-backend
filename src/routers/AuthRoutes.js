const { Router } = require('express');
const AuthController = require('../controllers/AuthController.js');

const router = Router();

/**
 * @swagger
 * /login/:
 *   post:
 *     summary: Realiza o login do usuário e retorna um token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: O e-mail do usuário
 *                 example: usuario@exemplo.com
 *               senha:
 *                 type: string
 *                 description: A senha do usuário
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login bem-sucedido e token JWT retornado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: O token JWT para autenticação futura
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Solicitação inválida (credenciais ausentes ou incorretas)
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login/', AuthController.Login);

// router.get('/auth/token', AuthController.ObterToken);

module.exports = router;