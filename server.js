const express = require('express')
const server = express()

// Middleware para obter o endereço IP e o navegador
server.use((req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    req.clientInfo = {
        ip: ip,
        userAgent: userAgent
    };

    next();
});

// Basic URL
server.get('/', function (req, res) {
    console.log()
    return res.json({ "message": "server OK "})
})

// Rota de ip
server.get('/ip', (req, res) => {
    const clientIp = req.clientInfo.ip;
    const clientUserAgent = req.clientInfo.userAgent;
    console.log(clientIp)
    console.log(clientUserAgent)
    res.send(`IP: ${clientIp}, User-Agent: ${clientUserAgent}`);
});

// Inicie o servidor
server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});