module.exports = (app,member_model) =>{
    app.post("/send_mail/member",(req,res)=>{
        try {
            if(!req.body.mail){
                const message = "Veuillez ajouter l'adresse mail pour l'envoi du code"
                return res.status(400).json({message})
            }
            else{
                member_model.find({mail : btoa(req.body.mail)}).then((a)=>{
                    if(a == "" || a == []){
                        const message = "Vérifier votre adresse mail"
                        return res.status(401).json({message})
                    }else{
                        const v = Math.floor(Math.random()* (999999 - 100000))  + 100000
                        const smtpConfig = nodemailer.createTransport({
                                service : "gmail",
                                auth : {
                                    user : "wnomena58@gmail.com",
                                    pass : "Fifaliana2712@"
                            }
                        });
                        const message = {
                            from : "wnomena58@gmail.com",
                            to : req.params.mail,
                            subject : "Réinitialisation de mot de passe",
                            text : `Veuillez copier le code dans le page pour pouvoir réinitialiser votre mot de passe : ${Math.floor(v)}`
                        };
                        smtpConfig.sendMail(message,(err,info)=>{
                            if(err){
                                const message = "Il y a une erreur lors de l'envoi du mail : " + err 
                                console.log(err)
                                return res.status(500).json({message})
                            }else {
                                member_model.findByIdAndUpdate(a[0]._id,{forget_pass : btoa(v.toString())}).then(async(b)=>{
                                    let token_send = await require("../../token_manager/create_random_value")()
                                    require("../../bd/local_storage_token_to_reset_password").push(token_send)
                                    const message = "Mail envoyer avec suuces"
                                    res.json({message,token : token_send})

                                })
                                setTimeout(() => {
                                    member_model.find({forget_pass : btoa(v.toString())}).then((c)=>{
                                        if(c){
                                            member_model.findByIdAndUpdate(c[0]._id,{forget_pass : 0}).then((d)=>{
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
            const message = "Erreur  lors de l'envoi de mail automatique :: " + error
            return res.status(500).json({message})
        }
    })
}