const connection = require('../config/db');

const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        quantity INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`;

connection.query(createUsersTable, (err) => {
    if (err) {
        console.error('Erro ao criar tabela users:', err);
    } else {
        console.log('Tabela users criada com sucesso.');
    }
});

connection.query(createProductsTable, (err) => {
    if (err) {
        console.error('Erro ao criar tabela products:', err);
    } else {
        console.log('Tabela products criada com sucesso.');
    }
    connection.end();
});
