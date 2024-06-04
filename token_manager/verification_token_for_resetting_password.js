module.exports = (req,res,next) =>{
    const scrypt = require("bcrypt")
    if(req.headers.authorization == undefined || req.headers.authorization == ""){
        const message = "Vous n'avez pas l'autorisation nécessaire pour effectuer cette requette"
        return res.status(400).json({message})
    }
    try {
        require("../bd/local_storage_token_to_reset_password").forEach((a)=>{
            if(a == req.headers.authorization){
                next()
            }else if(a !== req.headers.authorization && a == require("../bd/local_storage_token_to_reset_password")[require("../bd/local_storage_token_to_reset_password").length - 1]){
                const message = "Accès revoqué"
                return res.status(401).json({message})
            }
        })
    } catch (error) {
        const message = "Le serveur ne répond pas, veuillez réessaye r ultérieurement"
        return res.status(500).json({message})
    }
}
//non teste