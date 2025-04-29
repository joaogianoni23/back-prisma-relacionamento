import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Verifica se o token existe
    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido!" });
    }

    // Retirar o token do Bearer Token
    const parts = authHeader.split(" ")

    if (parts.length !== 2) {
        return res.status(401).json({ error: "Token mal formatado!" });
    }

    const [scheme, token] = parts;

    // Verifica se o token é válido
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Token inválido!" });
        }
        req.userId = decoded.indexOf;
        return next();
    })
};

export default authMiddleware;