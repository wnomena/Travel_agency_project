module.exports = (app,model_utilisateur,commentary_model) =>{
    app.post("/add_new/commentary/by/member/:mail",(req,res)=>{
        if(req.params.mail == undefined || req.params.mail == ""){
            const message = "vous n'avez pas les autorisations nécessaire pour acceder à cette ressources"
            return res.status(400).json({message})
        }
        const date = new Date()
        const all_value_in_requests = [{name : "commentary",value : req.body.commentary},{name : "creation_date", value : `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}]
        for(let i of all_value_in_requests){
            if(i.value == undefined){
                const message = "Champs requis"
                return res.status(400).json({message})
            }
        }
        try {
            model_utilisateur.find({mail : btoa(req.params.mail)}).then(async(a)=>{
                if(a == "" || a == []){
                    const message = "Vous n'avez pas l'autorisation nécessaire pour acceder à cette ressource"
                    return res.status(400).json({message})
                }
                else{
                    commentary_model.create({
                        id : await require("../bd/schema/function_aut_increment_ident_for_commentary_model")(commentary_model),
                        mail : btoa(req.params.mail),
                        created : btoa(all_value_in_requests[1].value),
                        string_commentary : btoa(all_value_in_requests[0].value)
                    }).then((b)=>{
                         const message = "Commentaire ajouter avec succès"
                         return res.json({message})
                    })            
                }
            })
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réessayerplus tard" + error
            return res.status(500).json({message})
        }
    })
}