const pool = require('../config/db');

// Obtener todos los productos con su categoría y primera imagen
const getAllProductosDB = async () => {
  const [rows] = await pool.query(`
    SELECT p.id, p.nombre, p.precio, c.nombre AS categoria,
           (SELECT url FROM imagenes_productos i WHERE i.producto_id = p.id LIMIT 1) AS imagen
    FROM productos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
  `);
  return rows;
};

// Obtener productos por categoría
const getProductosByCategoriaDB = async (categoria_id) => {
  const [rows] = await pool.query(`
    SELECT p.id, p.nombre, p.precio, c.nombre AS categoria,
           (SELECT url FROM imagenes_productos i WHERE i.producto_id = p.id ORDER BY i.id ASC LIMIT 1) AS imagen
    FROM productos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    WHERE p.categoria_id = ?
  `, [categoria_id]);
  return rows;
};

// Obtener detalle de un producto con todas sus imágenes
const getProductoByIdDB = async (id) => {
  const [producto] = await pool.query(`
    SELECT p.id, p.nombre, p.precio, c.nombre AS categoria
    FROM productos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    WHERE p.id = ?
  `, [id]);

  if (producto.length === 0) return null;

  const [imagenes] = await pool.query(`
    SELECT id, url FROM imagenes_productos WHERE producto_id = ?
  `, [id]);

  return { ...producto[0], imagenes };
};

// Crear producto
const createProductoDB = async ({ nombre, precio, categoria_id }) => {
  const [result] = await pool.query(
    'INSERT INTO productos (nombre, precio, categoria_id) VALUES (?, ?, ?)',
    [nombre, precio, categoria_id]
  );
  return { id: result.insertId, nombre, precio, categoria_id };
};

// Actualizar producto
const updateProductoDB = async (id, { nombre, precio, categoria_id }) => {
  await pool.query(
    'UPDATE productos SET nombre = ?, precio = ?, categoria_id = ? WHERE id = ?',
    [nombre, precio, categoria_id, id]
  );
  return { id, nombre, precio, categoria_id };
};

// Eliminar producto
const deleteProductoDB = async (id) => {
  await pool.query('DELETE FROM productos WHERE id = ?', [id]);
  return { mensaje: 'Producto eliminado' };
};

module.exports = {
  getAllProductosDB,
  getProductosByCategoriaDB,
  getProductoByIdDB,
  createProductoDB,
  updateProductoDB,
  deleteProductoDB
};