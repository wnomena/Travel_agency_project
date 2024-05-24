module.exports = (app,bcrypt,model) =>{
    app.post("/login",(req,res) =>{
        const all_client_information = [{name : "mail",value : req.body.mail},{name : "mot_de_passe",value : req.body.mot_de_passe}]
        for(let i = 0; i < all_client_information.length; i++){
            if(all_client_information[i].value == "" || all_client_information[i].value == undefined){
                const message = "Champs requis"
                return res.status(400).json({message})
            }
        }
        try {
            model.find({mail : btoa(all_client_information[0].value)}).then((a)=>{
                if(a == "" || a == []){
                    const message = "Verifier votre adresse mail"
                    return res.status(400).json({message})
                }else{
                    bcrypt.compare(all_client_information[1].value,a[0].mot_de_passe).then(async(c)=>{
                        if(c){
                            const token = require("../token_manager/create_random_value")(res,"usename_to_navigate_and_register_on_bd")
                            // console.log(JSON.stringify(token))
                            const message = "Connexion reussi"
                            return res.json({message,token})
                        }else{
                            const message = "Votre mot de passe est éronné, veuillez le vérifier et lessayer à nouveau"
                            return res.status(400).json({message})
                        }
                    })
                }
            })
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réessayer ultérierement \n " + error
            return res.status(500).json({message})
        }
    })
}
//route fonctionnel