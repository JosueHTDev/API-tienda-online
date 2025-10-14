// middlewares/ipFilter.js
const ipFilter = (req, res, next) => {
    // Lista de IPs permitidas (puedes ponerlas en el .env también)
    const allowedIPs = (process.env.ALLOWED_IPS || '').split(',').map(ip => ip.trim());

    // Obtener la IP real del cliente
    const clientIP =
        req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress;

    const normalizedIP = clientIP.replace('::ffff:', ''); // normaliza IPv6 -> IPv4

    // Verificar si está en la lista
    if (allowedIPs.includes(normalizedIP)) {
        next();
    } else {
        console.warn(`⛔ Acceso denegado desde IP: ${normalizedIP}`);
        return res.status(403).json({ message: 'Acceso denegado: IP no autorizada' });
    }
};

module.exports = ipFilter;