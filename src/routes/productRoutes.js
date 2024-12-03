// src/routes/productRoutes.js
const express = require('express');
const {
    createProduct,
    getAllProducts, // Corrigido para corresponder à função no controller
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const authenticateToken = require('../middleware/authMiddleware'); // Importando o middleware

const router = express.Router();

// Rota para criar um novo produto
router.post('/', authenticateToken, createProduct); // Adicionando autenticação

// Rota para obter todos os produtos
router.get('/', getAllProducts); // Corrigido para corresponder à função no controller

// Rota para obter um produto específico por ID
router.get('/:id', getProductById); // Essa função deve ser implementada no productController

// Rota para atualizar um produto
router.put('/:id', authenticateToken, updateProduct); // Adicionando autenticação

// Rota para deletar um produto
router.delete('/:id', authenticateToken, deleteProduct); // Adicionando autenticação

module.exports = router;
