const { Router } = require('express');
const AuthController = require('../controllers/AuthController.js');

const router = Router();

router.post('/login/', AuthController.Login);
// router.get('/auth/token', AuthController.ObterToken);

module.exports = router;