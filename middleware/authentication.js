const jwt = require('jsonwebtoken');

const authenticate = (req , res , next) =>{

    const token = req.header('Authorization');

    if(!token){

        return res.status(401).json({message : 'Unauthorized'});
    
    }

    try {
        const decoded = jwt.verify(token , process.env.SECRET || process.env.SECRET_KEY || 'your-secret-key');

        req.user = decoded.user;
        next();
    }
    catch(err){
        return res.status(401).json({message :' Token is not valid'});
    }

};


module.exports = authenticate;