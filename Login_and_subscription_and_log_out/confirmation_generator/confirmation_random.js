module.exports = (app,model_utilisateur) =>{
    const nodemailer = require("nodemailer")
    app.post("/send_mail/number_generator/:mail",(req,res)=>{
        try {
            if(!req.params.mail){
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
                                service : "gmail",
                                auth : {
                                    user : "gadeke3488@hutov.com",
                                    pass : ""
                            }
                        });
                        const message = {
                            from : "gadeke3488@hutov.com",
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
                                while (require("../../bd/storage_to_begin_set_time_out_for_delete_forget_pass").length !== 0){
                                    require("../../bd/storage_to_begin_set_time_out_for_delete_forget_pass").pop()
                                }
                                require("../../bd/storage_to_begin_set_time_out_for_delete_forget_pass").push(v)
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

