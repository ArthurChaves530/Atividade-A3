const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/db'); // Importando a conexão com o banco

// Use uma variável de ambiente para a chave secreta
const secretKey = process.env.JWT_SECRET || 'minha_chave_secreta_segura';

// Função para registrar um novo usuário
const registerUser = (req, res) => {
    const { username, email, password } = req.body;

    // Verificando se todos os campos foram fornecidos
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Validação básica do formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Email inválido.' });
    }

    // Verificando se o email já está cadastrado
    const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
    connection.query(checkEmailSql, [email], (checkError, checkResults) => {
        if (checkError) {
            console.error('Erro ao verificar o email:', checkError);
            return res.status(500).json({ message: 'Erro interno ao verificar o email.' });
        }

        if (checkResults.length > 0) {
            return res.status(409).json({ message: 'Email já cadastrado.' });
        }

        // Criptografando a senha
        bcrypt.hash(password, 10, (hashError, hash) => {
            if (hashError) {
                console.error('Erro ao criptografar a senha:', hashError);
                return res.status(500).json({ message: 'Erro interno ao processar a senha.' });
            }

            // Inserindo o novo usuário no banco de dados
            const insertUserSql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            connection.query(insertUserSql, [username, email, hash], (insertError) => {
                if (insertError) {
                    console.error('Erro ao registrar usuário:', insertError);
                    return res.status(500).json({ message: 'Erro interno ao registrar usuário.' });
                }
                res.status(201).json({ message: 'Usuário registrado com sucesso!' });
            });
        });
    });
};

// Função para login do usuário
const loginUser = (req, res) => {
    const { email, password } = req.body;

    // Verificando se todos os campos foram fornecidos
    if (!email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Buscando o usuário pelo email
    const getUserSql = 'SELECT * FROM users WHERE email = ?';
    connection.query(getUserSql, [email], (queryError, results) => {
        if (queryError) {
            console.error('Erro ao buscar o usuário:', queryError);
            return res.status(500).json({ message: 'Erro interno ao buscar o usuário.' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const user = results[0];

        // Comparando a senha fornecida com a senha criptografada
        bcrypt.compare(password, user.password, (compareError, isMatch) => {
            if (compareError || !isMatch) {
                console.error('Erro ao verificar a senha:', compareError || 'Senha incorreta.');
                return res.status(401).json({ message: 'Credenciais inválidas.' });
            }

            // Gerando o token de autenticação
            const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
            res.status(200).json({ token, message: 'Login bem-sucedido.' });
        });
    });
};

module.exports = { registerUser, loginUser };
