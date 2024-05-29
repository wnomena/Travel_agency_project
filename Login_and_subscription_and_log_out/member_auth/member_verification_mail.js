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
                model_member.findByIdAndUpdate(a[0]._id,{forget_pass : ""}).then((b)=>{
                    const message = "Accès autoriser pour la suite"
                    return res.json({message})
                })
            })
        } catch (error) {
            const message = "Le serveur ne répond pas"
            return res.status(500).json({message})
        }
    })
}