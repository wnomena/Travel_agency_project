module.exports = (app,model_member) =>{
    app.put("/verification_of/mail_send/member/:mail",(req,res)=>{
        const value_of_requets = [{name : "mail",value : req.params.mail},{name : "code_mail",value : req.body.code_mail}]
        for(let i of value_of_requets){
            if(i.value == "" || i.value == undefined){
                const message = "Champs requis"
                return res.status(400).json({message})
            }
        }
        try {
            model_member.find({$and : [{mail : value_of_requets[0].value},{forget_pass : value_of_requets[1].value}]}).then((a)=>{
                if(a == "" || a == []){
                    const message = "Vérifier les informations que vous avez saisi"
                    return res.status(400).json({message})
                }
                require("../../bd/storage_to_begin_set_time_out_for_delete_forget_pass").forEach((element)=>{
                    if(JSON.stringify(element) == value_of_requets[1].value ){
                        const message = "Accès autorisé"
                        return res.json({message})
                    }else if(element.forget_pass == require("../../bd/storage_to_begin_set_time_out_for_delete_forget_pass")[require("../../bd/storage_to_begin_set_time_out_for_delete_forget_pass").length - 1] && element !== value_of_requets[1].value){
                        const message = "Accès revoqué"
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