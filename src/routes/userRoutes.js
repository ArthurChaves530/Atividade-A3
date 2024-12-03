const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware'); // Importando o middleware
const router = express.Router();

// Rota para registro de usuários
router.post('/register', registerUser);

// Rota para login de usuários
router.post('/login', loginUser);

// Removida a rota protegida de exemplo

module.exports = router;
