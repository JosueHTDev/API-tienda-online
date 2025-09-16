const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUsuarioByNameDB, createUsuarioDB } = require('../models/usuariosModel');

// Registro de usuario
const register = async (req, res) => {
  try {
    // destructuramos los datos del body
    const { usuario, password } = req.body;
    // nos aseguramos que vengan todos los datos
    if (!usuario || !password) {
      return res.status(400).json({ error: "Faltan datos" });
    }
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const id_rol = req.body.id_rol || 1;
    // Guardar en DB
    const nuevo = await createUsuarioDB({ usuario, password: hashedPassword, id_rol });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      usuario: nuevo.usuario
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login de usuario
const login = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    const user = await getUsuarioByNameDB(usuario);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, usuario: user.usuario, rol: user.id_rol },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ message: "Login exitoso", token, rol: user.id_rol});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };
