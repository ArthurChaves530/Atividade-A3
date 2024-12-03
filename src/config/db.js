require('dotenv').config(); // Para carregar variáveis de ambiente
const mysql = require('mysql2');

// Verificar se as variáveis de ambiente foram carregadas corretamente
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS ? '******' : 'NÃO DEFINIDO');
console.log('DB_NAME:', process.env.DB_NAME);

const connection = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'test_db',
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        console.error('Detalhes:', err);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida.');
});

module.exports = connection;
