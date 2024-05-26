//en attende de connexion pour interagir avec les cookies
module.exports = (app,model_utilisateur) =>{
    app.get("/log_ou/utilisateur",(req,res)=>{
        try {
            req.clearCookie("username_login_for_travel_agency")
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réessayer ultérieurement"
            return res.status(500).json({message})
        }
    })
}
//api non tester