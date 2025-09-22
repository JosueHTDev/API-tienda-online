const {
  getImagenesByProductoDB,
  createImagenDB,
  deleteImagenDB
} = require('../models/imagenesModel');

// Obtener imágenes de un producto
const getImagenesByProducto = async (req, res) => {
  try {
    const imagenes = await getImagenesByProductoDB(req.params.producto_id);
    res.json(imagenes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Agregar imagen a un producto
const createImagen = async (req, res) => {
  try {
    const nueva = await createImagenDB(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar imagen
const deleteImagen = async (req, res) => {
  try {
    const eliminada = await deleteImagenDB(req.params.id);
    res.json(eliminada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getImagenesByProducto,
  createImagen,
  deleteImagen
};
