// importando los módulos de express y cors 
const express = require('express'); // framework para construir APIs
const cors = require('cors'); // permite compartir recursos entre distintos orígenes
require('dotenv').config(); // carga variables de entorno desde .env

// Importar rutas
const productosRoutes = require('./routes/productosRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes');
const imagenesRoutes = require('./routes/imagenesRoutes');
const authRoutes = require('./routes/authRoutes');

// Importar middlewares de autenticación y roles
const authMiddleware = require('./middlewares/authMiddleware');
const adminMiddleware = require('./middlewares/adminMiddleware');

// Crear instancia de express 
const app = express();

// Middlewares globales
app.use(cors()); 
app.use(express.json()); 

// Rutas públicas (no necesitan autenticación)
app.use('/api/auth', authRoutes); 
app.use('/api/productos', productosRoutes);   // GET público
app.use('/api/categorias', categoriasRoutes); // GET público
app.use('/api/imagenes', imagenesRoutes);     // GET público

// Rutas protegidas (solo admin puede crear, modificar o eliminar)
app.use('/api/productos', authMiddleware, adminMiddleware, productosRoutes);
app.use('/api/categorias', authMiddleware, adminMiddleware, categoriasRoutes);
app.use('/api/imagenes', authMiddleware, adminMiddleware, imagenesRoutes);

// Puerto de conexión
const PORT = process.env.PORT || 3000;

// Inicializar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});
