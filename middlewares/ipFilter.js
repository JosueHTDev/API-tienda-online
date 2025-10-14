// middlewares/ipFilter.js
const ipFilter = (req, res, next) => {
    // IP autorizada (la IP pública de tu red o servidor permitido)
    const allowedIP = process.env.ALLOWED_IP; // ej: "181.64.23.100"

    // Express puede devolver IP en distintos encabezados si está detrás de proxy
    const clientIP = 
        req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
        req.connection.remoteAddress || 
        req.socket.remoteAddress;

    // Normaliza formato IPv6 -> IPv4 si es necesario
    const normalizedIP = clientIP.replace('::ffff:', '');

    if (normalizedIP === allowedIP) {
        next();
    } else {
        console.warn(`Acceso denegado desde IP: ${normalizedIP}`);
        return res.status(403).json({ message: 'Acceso denegado: IP no autorizada' });
    }
};

module.exports = ipFilter;