const jwt = require("jsonwebtoken")
const { config } = require("../bd/mysql/fonctionType")
module.exports = function (req,res,next) {
    try {
        console.log(req.headers)
        const authorization = req.headers['authorization']
        const Authorization = authorization.split(" ")[1]
        console.log(Authorization)
        if(!authorization) return res.status(401).json({message : "Authorization required"})
        else if(!Authorization) return res.status(401).json({message : "Authorization required"})
            else if(authorization && Authorization){
            const Authorization = authorization.split(" ")[1]
            jwt.verify(Authorization,config.KEY.toString(),function(error,decoded) {
                if(error) {
                    return res.status(403).json({message : "Authorization revoqued"})
                } else { 
                    // console.log(decoded)
                    next()
                }
            })
        }
    } catch (error) {
        return res.status(500).json({message : "Server crached middleware" + error})
    }
}