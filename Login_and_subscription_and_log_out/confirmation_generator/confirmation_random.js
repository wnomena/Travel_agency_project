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
                        let transporter = nodemailer.createTransport({
                            sendmail : true,
                            newline : "windows",
                            logger : false
                        });
                        let message = {
                            from : "Developpeur Web <jsdev.web2@gmail.com>",
                            to : req.params.mail,
                            Subject : "Réinitialisation de mot de passe",
                            text : v,
                        }
                        transporter.sendMail(message)
                    }
                })
            }
        } catch (error) {
            const message = "Erreur  lors de l'envoi de mail automatique :: " + error
            return res.status(500).json({message})
        }
    })
}

