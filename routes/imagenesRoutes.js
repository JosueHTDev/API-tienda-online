const express = require('express');
const router = express.Router();
const {
  getImagenesByProducto,
  createImagen,
  deleteImagen
} = require('../controllers/imagenesController');

const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Ruta pública
router.get('/:producto_id', getImagenesByProducto);

// Rutas protegidas (solo admin)
router.post('/', authMiddleware, adminMiddleware, createImagen);
router.delete('/:id', authMiddleware, adminMiddleware, deleteImagen);

module.exports = router;
