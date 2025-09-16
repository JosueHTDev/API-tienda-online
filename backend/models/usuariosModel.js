const pool = require('../config/db');

// Buscar usuario por nombre
const getUsuarioByNameDB = async (usuario) => {
  const [rows] = await pool.query(
    'SELECT * FROM usuarios WHERE usuario = ?',
    [usuario]
  );
  return rows[0];
};

// Crear nuevo usuario
const createUsuarioDB = async ({ usuario, password, id_rol }) => {
  const [result] = await pool.query(
    'INSERT INTO usuarios (usuario, password, id_rol) VALUES (?, ?, ?)',
    [usuario, password, id_rol]
  );
  return { id: result.insertId, usuario, id_rol };
};

module.exports = {
  getUsuarioByNameDB,
  createUsuarioDB
};
