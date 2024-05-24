module.exports = (req,res,next) =>{
    const scrypt = require("bcrypt")
    const authorization = req.header.Authorization
    if(req.header.authorization == undefined || req.header.Authorization == ""){
        const message = "Vous n'avez pas les authorisations nécessaires pour ceeder à cette ressources"
        return res.status(400).json({message})
    }else{
        if(authorization.split(" ")[0] !== "nomena_walker"){
            const message = "Vous n'avez pas l'authorisation nécessaire pour acceder à cette ressource"
            return res.status(401).json({message})
        }
        try {
            scrypt.compare(req.cookies("username_login_for_travel_agency"),authorization.split(" ")[1]).then((a)=>{
                if(a){
                    next()
                }else{
                    const message = "Vous n'avez pas l'authorisation nécessaire pour acceder à cette ressource"
                    return res.status(401).json({message})
                }
            })
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réessayer ultérieurement : " + error
            return res.status(500).json({message})
        }
    }
}