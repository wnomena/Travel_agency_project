module.exports = (app,model_utilisateurs,parent_road_model,child_road_model) =>{
    app.delete("/utilisateurs/:mail/user/deleter/:parent_circuit_id",(req,res)=>{
        const tab = [{name : "mail",value : req.params.mail},{name : "parent_circuit_id",value : req.params.parent_circuit_id}]
        for(let i of tab){
            if(i.value == undefined || i.value == ""){
                const message = "Vérifiez le svaleurs que vous avez saisi et réessayer"
                return res.status(400).json({message})
            }
        }
        try {
            model_utilisateurs.find({mail : btoa(tab[0].value)}).then((a)=>{
                if(a == "" ||a == []){
                    const message = "Accès non autorisé"
                    return res.status(403).jsson({message})
                }
                parent_road_model.find({identifiant : tab[1].value}).then((b)=>{
                    if(b == "" ||b == []){
                        const message = "Vérifiez votre choix et réessayer"
                        return res.status(400).json({message})
                    }
                    child_road_model.deleteMany({ident_to_look_for_parent_ident : tab[1].value}).then((c)=>{
                        parent_road_model.deleteOne({identifiant : tab[1].value}).then((d)=>{
                            const message = "Circuit effacé avec succès, ainsi que toutes les information lier à celui ci"
                            return res.json({message})
                        })
                    })
                })
            })
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réessayer  plus tard"
            return res.status(500).json({message,error})
        }
    })
}