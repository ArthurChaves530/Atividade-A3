const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // ou qualquer porta que preferir
const connection = require('./config/db'); // Conexão com o banco de dados

app.use(bodyParser.json()); // Para permitir o recebimento de JSON no corpo da requisição

// Rota inicial
app.get('/', (req, res) => {
    res.send('API de Produtos está funcionando!');
});

// Importar as rotas de usuário
const userRoutes = require('./routes/userRoutes');
// Importar as rotas de produtos
const productRoutes = require('./routes/productRoutes'); // Adicione esta linha

// Usar as rotas de usuário
app.use('/api/users', userRoutes);
// Usar as rotas de produtos
app.use('/api/products', productRoutes); // Adicione esta linha

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
