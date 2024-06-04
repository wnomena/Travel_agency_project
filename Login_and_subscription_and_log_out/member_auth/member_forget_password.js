module.exports = (app,model_utilisateur,bcrypt) =>{
    app.put("/forget_pass/update_without_entering/old_pass/:mail/for_member",(req,res)=>{
        if(req.params.mail == undefined || req.params.mail == ""){
            const message = "Vous n'avez pas l'autorisation nécessaire pour effectuer cette action"
            return res.status(401).json({message})            
        }
        if(req.body.new_pass_after_reset == "" || req.body.new_pass_after_reset == []){
            const message = "Champs requis"
            return res.staus(400).json({message})
        }
        try {
            model_utilisateur.find({mail : btoa(req.params.mail)}).then((b)=>{
                if(b == "" || b == []){
                    const message = "Vérifier le mail que vous avez saisie et réessayer"
                    return res.status(400).json({message})
                }else{
                    bcrypt.hash(req.body.new_pass_after_reset,10).then((d)=>{
                        model_utilisateur.findByIdAndUpdate(b[0]._id,{mot_de_passe : d}).then((c)=>{
                            const message = "Mot de passe mit à jours"
                            return res.json({message})
                        })
                    })
                }
            })
        } catch (error) {
            const message = "Le serveur ne répond pas"
            return res.status(500).json({message})
        }
    })
}
//non tester