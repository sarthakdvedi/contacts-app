const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization; // because some clients send it in lowercase and some in uppercase

    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1];
        
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                res.status(401);
                throw new Error('User is not authorized');
            }
            console.log('Decoded token: ', decoded);
            req.user = decoded.user; // this will be available in the next middleware or controller function
            next();
        });

        if(!token){
            res.status(401);
            throw new Error('User is not authorized, no token');
        }
    }
});


module.exports = validateToken;