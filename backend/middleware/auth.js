const config = require('config')
const jwt = require('jsonwebtoken')

function auth(req, res, next){
    const token = req.header('x-auth-token')

    //Check for Token

    if(!token){
        console.log("No Token, authorization denied")
        res.status(401).json({ msg: 'No Token, authorization denied'})
    }

    try{
        //Verify Token

    const decoded = jwt.verify(token, config.get('jwtSecret'))

    //Add user from payload

    req.login = decoded;
    next();
    }
    catch(e){   
        res.status(400).json({ msg: 'Token is invalid'})
    }
}
module.exports =auth