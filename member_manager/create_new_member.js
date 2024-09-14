//gestion de route de façon que ça commence par utiliateur
module.exports = (app,model_member) =>{
    app.post("/utilisateurs/by_admin/create/new_member",(req,res)=>{
        const all_value_sent_by_admin = [{name : "Name",value : req.body.nom_complet},{name : "mail",value : req.body.mail}]
        for(let i of all_value_sent_by_admin){
            if(i.value == "" || i.value == undefined){
                const message = "Champs requis"
                return res.status(401).json({message})
            }
        }
        try {
            model_member.find({mail : btoa(all_value_sent_by_admin[1].value)}).then((a)=>{
                console.log(all_value_sent_by_admin[1].value)
                if(a == "" || a == []){
                    model_member.create({
                        nom_complet : btoa(all_value_sent_by_admin[0].value),
                        mail : btoa(all_value_sent_by_admin[1].value),
                        mot_de_passe : `Agency_travel${new Date().getFullYear()}`
                    }).then((a)=>{
                        const message = "Nouveau membre bien enregistrer"
                        return res.json({message})
                    })
                }else{
                    const message = "Veuillez utiliser un autre adresse mail"
                    return res.status(400).json({message})
                }
            })
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réesssayer plus tard"
            return res.status(500).json({message,error})
        }
    })
}