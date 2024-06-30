module.exports = (req,res,next) =>{
    let scrypt = require("bcrypt")
    const authorization = req.headers.authorization
    if(req.headers.authorization == undefined || req.headers.authorization == ""){
        const message = "Vous n'avez pas les authorisations nécessaires pour acceder à cette ressources 1"
        return res.status(400).json({message})
    }else{
        if(authorization.split(" ")[0] !== "nomena_walker"){
            const message = "Vous n'avez pas l'authorisation nécessaire pour acceder à cette ressource 2"
            return res.status(401).json({message})
        }
        try {
            if(require("../bd/local_storage_for_token")[0] == authorization.split(" ")[1]){
               next()
            }
            else{
                const message = "Vous n'avez pas l'autorisation nécessaire pour acceder à cette ressource"
                return res.status(401).json({message})
            }
            
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réessayer ultérieurement : " + error
            return res.status(500).json({message})
        }
    }
}
//non tester