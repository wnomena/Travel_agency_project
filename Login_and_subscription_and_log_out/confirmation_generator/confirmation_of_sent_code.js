module.exports = (app,model_utilisateur) =>{
    app.put("/verification_of/code_sent/:code_mail/:mail",(req,res)=>{
        const value_of_requets = [{name : "mail",value : req.params.mail},{name : "code_mail",value : req.body.code_mail}]
        for(let i of value_of_requets){
            if(i.value == "" || i.value == undefined){
                const message = "Champs requis"
                return res.status(400).json({message})
            }
        }
        try {
            model_utilisateur.find({mail : value_of_requets[0].value}).then((a)=>{
                if(a == "" || a == []){
                    const message = "Vérifier les informations que vous avez saisi"
                    return res.status(400).json({message})
                }
                require("../../bd/storage_to_begin_set_time_out_for_delete_forget_pass").forEach((element)=>{
                    if (element == value_of_requets[1].value) {
                        while (require("../../bd/storage_to_begin_set_time_out_for_delete_forget_pass").length !== 0) {
                            require("../../bd/storage_to_begin_set_time_out_for_delete_forget_pass").pop()
                        }
                        const message = "Accès autorisé"
                        return res.json({message})
                    } else {
                        const message = "Autorisation revoquée"
                        return res.status(401).json({message})
                    }
                })
            })
        } catch (error) {
            const message = "Le serveur ne répond pas"
            return res.status(500).json({message})
        }
    })
}
//api non tester