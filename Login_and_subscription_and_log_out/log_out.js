//en attende de connexion pour interagir avec les cookies
module.exports = (app) =>{
    app.get("/utilisateurs/log_ou/utilisateur",(req,res)=>{
        let i = require("../bd/local_storage_for_token")[0]
        try {
            for(let i = 0; i < require("../bd/local_storage_for_token").length + 1; i++){
                require("../bd/local_storage_for_token").pop()
            }
            const message = "Succès de la déconnexion"
            return res.json({message,token : i})
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réessayer ultérieurement"
            return res.status(500).json({message,token : i})
        }
    })
}
//api non tester