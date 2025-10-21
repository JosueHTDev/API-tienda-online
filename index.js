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

app.use(cors()); 
app.use(express.json()); 

// Lista de IPs permitidas (las del instituto)
const allowedIPs = [
  '168.194.102.29',  // ejemplo IP 1
  '168.194.102.27',  // ejemplo IP 2
  '168.194.102.30'   // ejemplo IP 3
];

// Middleware para restringir IPs
app.use((req, res, next) => {
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  // Algunas veces Railway pasa la IP con "::ffff:" delante
  const cleanIP = clientIP.replace('::ffff:', '');

  if (!allowedIPs.includes(cleanIP)) {
    console.log(`❌ Acceso denegado desde IP: ${cleanIP}`);
    return res.status(403).json({ message: 'Acceso no autorizado desde esta red.' });
  }

  console.log(`✅ Acceso permitido desde IP: ${cleanIP}`);
  next();
});

app.use('/api/auth', authRoutes); 
app.use('/api/productos', productosRoutes);  
app.use('/api/categorias', categoriasRoutes); 
app.use('/api/imagenes', imagenesRoutes);    

app.use('/api/productos', authMiddleware, adminMiddleware, productosRoutes);
app.use('/api/categorias', authMiddleware, adminMiddleware, categoriasRoutes);
app.use('/api/imagenes', authMiddleware, adminMiddleware, imagenesRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
});