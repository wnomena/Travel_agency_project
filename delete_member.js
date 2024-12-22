module.exports = (app,model_member,model_utilisateur) =>{
    app.delete("/utilisateurs/delete_admin/by_admin/:user_mail/:member_mail",(req,res)=>{
        const mail_user_and_member = [{name : "user_mail",value : req.params.user_mail},{name : "member_mail",value : req.params.member_mail}]
        for(let i of mail_user_and_member){
            if( i.value == undefined || i.value == ""){
                const message = "Champs requis"
                return res.status(400).json({message})
            }
        }
        try {
            model_utilisateur.find({mail : btoa(mail_user_and_member[0].value)}).then((a)=>{
                if(a == "" || a == []){
                    const message = "Vérifier les  informations que vous avez saisie et réessayer"
                    return res.status(400).json({message})
                }else{
                    model_member.deleteOne({mail : btoa(mail_user_and_member[1].value)}).then((b)=>{
                        const message = "Membre effacer de la liste"
                        return res.json({message})
                    })
                }
            })
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réessayer plus tard"
            return res.status(500).json({message})
        }
    })
}