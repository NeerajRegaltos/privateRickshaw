const jwt = require("jsonwebtoken");

const validateToken = async (req, res , next) =>{
    let token;

    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET , (err, data) =>{
            if(err){
                res.json({result : "User is not authorized"});
            }else{
                req.user = data;
                next();
            }
        });
    }else{
        res.json({result : "User is not authorized or token is missing"});
    }
}

module.exports = validateToken;