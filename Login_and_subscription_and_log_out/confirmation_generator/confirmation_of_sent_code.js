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
            model_utilisateur.find({$and : [{mail : value_of_requets[0].value},{forget_pass : value_of_requets[1].value}]}).then(async(a)=>{
                if(a == "" || a == []){
                    const message = "Vérifier les informations que vous avez saisi"
                    return res.status(400).json({message})
                }
                const token = await require("../../token_manager/create_random_value")()
                while(require("../../bd/local_storage_token_to_reset_password").length !== 0){
                    require("../../bd/local_storage_token_to_reset_password").pop()
                }
                require("../../bd/local_storage_token_to_reset_password").push(token)
            })
        } catch (error) {
            const message = "Le serveur ne répond pas"
            return res.status(500).json({message})
        }
    })
}
//api non tester