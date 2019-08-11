const jwt = require('jsonwebtoken');
const config = require('../config/database.js');
module.exports = (req, res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, config.secret);
        req.userData = {email: decodedToken.email, userid: decodedToken.userid}
        next();
    }catch(error){
        res.json({success: false, msg: 'Auth failed!'})
    }
}
