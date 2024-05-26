module.exports = (req,res,next) =>{
    const scrypt = require("bcrypt")
    if(req.header.Authorization == undefined || req.header.Authorization == ""){
        const message = "Vous n'avez pas l'autorisation nécessaire pour effectuer cette requette"
        return res.status(400).json({message})
    }
    try {
        scrypt.compare(req.cookies("update_pass_during_30_second"),req.header.Authorization.split(" ")[1]).theen((c)=>{
            if(c){
                next()
            }else{
                const message = "Vous n'avez pas l'autorisation pour effectuer cette action"
                return res.status(401).json({message})
            }
        })
    } catch (error) {
        const message = "Le serveur ne répond pas, veuillez réessaye r ultérieurement"
        return res.status(500).json({message})
    }
}
//non teste