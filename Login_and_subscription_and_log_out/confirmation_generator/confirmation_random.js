module.exports = (model_utilisateur,mail) =>{
    const nodemailer = require("nodemailer")
    try {
        if(!mail){
            const message = "Veuillez ajouter l'adresse mail pour l'envoi du code"
            return message
        }
        else{
            model_utilisateur.find({mail : atob(mail)}).then((a)=>{
                if(a == "" || a == []){
                    const message = "Vérifier votre adresse mail"
                    return message
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
                            return message
                        }else {
                            model_utilisateur.findByIdAndUpdate()
                            const message = "Mail envoyer avec suuces"
                            return message
                        }
                    })
                }
            })
        }
    } catch (error) {
        const message = "Erreur  lors de l'envoi de mail automatique"
        return message
    }
}