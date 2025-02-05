const jwt = require('jsonwebtoken');

const isGranted = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send('Token manquant !');
    }

    let token;
    if (authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else {
        token = authHeader;
    }

    jwt.verify(token, process.env.secret_key, (err, decoded) => {
        if (err) {
            return res.status(401).send('Accès refusé');
        }

        req.user = decoded;

        next();
    });
};

module.exports = isGranted;
