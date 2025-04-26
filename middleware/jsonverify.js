const jwt = require("jsonwebtoken")
const randomToken = require("../cookies/private")
module.exports = function (req,res,next) {
    try {
        console.log(req.url)
        const authorization = req.headers["authorization"]
        if(authorization == undefined) return res.status(401).json({message : "Authorization required"})
        else if(authorization !== undefined){
            console.log(authorization)
            const Authorization = authorization.split(" ")[1]
            jwt.verify(Authorization,randomToken,function(error,decoded) {
                if(error) {
                    return res.status(401).json({message : "Authorization revoqued"})
                } else {
                    console.log(decoded)
                    next()
                }
            })
        }
    } catch (error) {
        return res.status(500).json({message : "Server crached" + error})
    }
}