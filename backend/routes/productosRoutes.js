const express = require('express');
const router = express.Router();
const {
  getAllProductos,
  getProductosByCategoria,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
} = require('../controllers/productosController');

const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Rutas públicas
router.get('/', getAllProductos);
router.get('/categoria/:categoria_id', getProductosByCategoria);
router.get('/:id', getProductoById);

// Rutas protegidas (solo admin)
router.post('/', authMiddleware, adminMiddleware, createProducto);
router.put('/:id', authMiddleware, adminMiddleware, updateProducto);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProducto);

module.exports = router;

