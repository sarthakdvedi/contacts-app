const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization; // because some clients send it in lowercase and some in uppercase
    // ye frontend se API config m Auth Header set karke bheja jata h backend p
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(401);
        throw new Error("Not authenticated or token is missing");
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        res.status(401);
        throw new Error('User is not authorized, no token');
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );
        req.user = decoded.user; // this will be available in the next middleware or controller function
        next();
    } catch {
        res.status(401);
        throw new Error("Invalid token or User is not authorized");
    }
});


module.exports = validateToken;