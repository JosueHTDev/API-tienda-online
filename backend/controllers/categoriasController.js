const {
  getAllCategoriasDB,
  createCategoriaDB,
  updateCategoriaDB,
  deleteCategoriaDB
} = require('../models/categoriasModel');

const getAllCategorias = async (req, res) => {
  try {
    const categorias = await getAllCategoriasDB();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCategoria = async (req, res) => {
  try {
    const nueva = await createCategoriaDB(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCategoria = async (req, res) => {
  try {
    const actualizada = await updateCategoriaDB(req.params.id, req.body);
    res.json(actualizada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCategoria = async (req, res) => {
  try {
    const eliminada = await deleteCategoriaDB(req.params.id);
    res.json(eliminada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria
};
