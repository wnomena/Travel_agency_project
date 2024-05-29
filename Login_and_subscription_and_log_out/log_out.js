//en attende de connexion pour interagir avec les cookies
module.exports = (app) =>{
    app.get("/utilisateurs/log_ou/utilisateur",(req,res)=>{
        try {
            for(let i = 0; i < require("../bd/local_storage_for_token").length + 1; i++){
                require("../bd/local_storage_for_token").pop()
            }
            const message = "Succès de la déconnexion"
            return res.json({message})
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réessayer ultérieurement"
            return res.status(500).json({message})
        }
    })
}
//api non tester