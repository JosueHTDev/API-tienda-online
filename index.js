const express = require('express'); 
const cors = require('cors'); 
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
require('dotenv').config(); 

const productosRoutes = require('./routes/productosRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes');
const imagenesRoutes = require('./routes/imagenesRoutes');
const authRoutes = require('./routes/authRoutes');

const authMiddleware = require('./middlewares/authMiddleware');
const adminMiddleware = require('./middlewares/adminMiddleware');

const app = express();

const allowedOrigins = [
  'http://169.197.85.174',
  'http://localhost:3000',
  'https://tienda-online-olive.vercel.app/'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/productos', authMiddleware, adminMiddleware, productosRoutes);
app.use('/api/categorias', authMiddleware, adminMiddleware, categoriasRoutes);
app.use('/api/imagenes', authMiddleware, adminMiddleware, imagenesRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
});