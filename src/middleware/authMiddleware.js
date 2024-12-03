// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware para verificar o token JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obter o token do cabeçalho Authorization

    if (!token) {
        return res.sendStatus(401); // Se não houver token, retorna 401 (Não autorizado)
    }

    jwt.verify(token, process.env.JWT_SECRET || 'minha_chave_secreta_segura', (err, user) => {
        if (err) {
            return res.sendStatus(403); // Se o token for inválido, retorna 403 (Proibido)
        }
        req.user = user; // Armazenar as informações do usuário na requisição
        next(); // Passar para o próximo middleware ou rota
    });
};

module.exports = authenticateToken;
