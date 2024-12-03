// src/controllers/productController.js
const connection = require('../config/db');

// Função para criar um novo produto
const createProduct = (req, res) => {
    const { name, price } = req.body;

    // Verificando se todos os campos foram fornecidos
    if (!name || !price) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const sql = 'INSERT INTO products (name, price) VALUES (?, ?)';
    connection.query(sql, [name, price], (error, results) => {
        if (error) {
            console.error('Erro ao criar produto:', error);
            return res.status(500).json({ message: 'Erro ao criar produto.' });
        }
        res.status(201).json({ id: results.insertId, message: 'Produto criado com sucesso!' });
    });
};

// Função para listar todos os produtos
const getAllProducts = (req, res) => {
    const sql = 'SELECT * FROM products';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Erro ao listar produtos:', error);
            return res.status(500).json({ message: 'Erro ao listar produtos.' });
        }
        res.status(200).json(results);
    });
};

// Função para obter um produto específico por ID
const getProductById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM products WHERE id = ?';

    connection.query(sql, [id], (error, results) => {
        if (error || results.length === 0) {
            console.error('Erro ao obter produto:', error);
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }
        res.status(200).json(results[0]);
    });
};

// Função para atualizar um produto
const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    const sql = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
    connection.query(sql, [name, price, id], (error, results) => {
        if (error) {
            console.error('Erro ao atualizar produto:', error);
            return res.status(500).json({ message: 'Erro ao atualizar produto.' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }
        res.status(200).json({ message: 'Produto atualizado com sucesso!' });
    });
};

// Função para deletar um produto
const deleteProduct = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM products WHERE id = ?';
    connection.query(sql, [id], (error, results) => {
        if (error) {
            console.error('Erro ao deletar produto:', error);
            return res.status(500).json({ message: 'Erro ao deletar produto.' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }
        res.status(200).json({ message: 'Produto deletado com sucesso!' });
    });
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
