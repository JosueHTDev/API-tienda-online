const pool = require('../config/db');

// Obtener imágenes de un producto
const getImagenesByProductoDB = async (producto_id) => {
  const [rows] = await pool.query(
    'SELECT * FROM imagenes_productos WHERE producto_id = ?',
    [producto_id]
  );
  return rows;
};

// Agregar imagen a un producto
const createImagenDB = async ({ url, producto_id }) => {
  const [result] = await pool.query(
    'INSERT INTO imagenes_productos (url, producto_id) VALUES (?, ?)',
    [url, producto_id]
  );
  return { id: result.insertId, url, producto_id };
};

// Eliminar imagen
const deleteImagenDB = async (id) => {
  await pool.query('DELETE FROM imagenes_productos WHERE id = ?', [id]);
  return { mensaje: 'Imagen eliminada' };
};

module.exports = {
  getImagenesByProductoDB,
  createImagenDB,
  deleteImagenDB
};
