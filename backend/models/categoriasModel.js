const pool = require('../config/db');

// Obtener todas las categorías
const getAllCategoriasDB = async () => {
  const [rows] = await pool.query('SELECT * FROM categorias');
  return rows;
};

// Crear categoría
const createCategoriaDB = async ({ nombre }) => {
  const [result] = await pool.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre]);
  return { id: result.insertId, nombre };
};

// Actualizar categoría
const updateCategoriaDB = async (id, { nombre }) => {
  await pool.query('UPDATE categorias SET nombre = ? WHERE id = ?', [nombre, id]);
  return { id, nombre };
};

// Eliminar categoría
const deleteCategoriaDB = async (id) => {
  await pool.query('DELETE FROM categorias WHERE id = ?', [id]);
  return { mensaje: 'Categoría eliminada' };
};

module.exports = {
  getAllCategoriasDB,
  createCategoriaDB,
  updateCategoriaDB,
  deleteCategoriaDB
};
