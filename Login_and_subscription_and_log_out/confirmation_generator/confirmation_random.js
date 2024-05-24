module.exports = (app,model_utilisateur) =>{
    app.post("/number_generator/:mail",(req,res)=>{
        try {
            if(!mail){
                const message = "Veuillez ajouter l'adresse mail pour l'envoi du code"
                return res.status(400).json({message})
            }
            else{
                model_utilisateur.find({mail : btoa(req.params.mail)}).then((a)=>{
                    if(a == "" || a == []){
                        const message = "Vérifier votre adresse mail"
                        return res.status(401).json({message})
                    }else{
                        const v = Math.floor(Math.random()* (999999 - 100000))  + 100000
                        const smtpConfig = nodemailer.createTransport({
                                host : "smtp.gmail.com",
                                port : 587,
                                auth : {
                                    user : "wnomena58@gmail.com",
                                    pass : "Fifaliana2712@"
                            }
                        });
                        const message = {
                            from : "wnomena58@gmail.com",
                            to : mail,
                            subject : "Réinitialisation de mot de passe",
                            text : `Veuillez copier le code dans le page pour pouvoir réinitialiser votre mot de passe : ${Math.floor(v)}`
                        };
                        smtpConfig.sendMail(message,(err,info)=>{
                            if(err){
                                const message = "Il y a une erreur lors de l'envoi du mail"
                                return res.status(500).json({message})
                            }else {
                                let token_update_password = require("../../token_manager/create_random_value")(res,"update_pass_during_30_second")
                                model_utilisateur.findByIdAndUpdate(a[0]._id,{forget_pass : btoa(v.toString())}).then((b)=>{
                                    let token_send = require("../../token_manager/create_random_value")(res,"token_for_updating_password")
                                    const message = "Mail envoyer avec suuces"
                                    res.json({message,token_update_password})

                                })
                                setTimeout(() => {
                                    model_utilisateur.find({forget_pass : btoa(v.toString())}).then((c)=>{
                                        if(c){
                                            model_utilisateur.findByIdAndUpdate(c[0]._id,{forget_pass : 0}).then((d)=>{
                                                console.log(d)
                                                return false
                                            })
                                        }
                                    })
                                },1800);
                            }
                        })
                    }
                })
            }
        } catch (error) {
            const message = "Erreur  lors de l'envoi de mail automatique"
            return res.status(500).json({message})
        }
    })
}

