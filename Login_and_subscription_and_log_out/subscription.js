const multer = require("../multer_middleware")
module.exports = (app,bcrypt,model) =>{
    app.post("/utilisateurs/Login_and_subscription_and_log_out/subsscription",multer,(req,res)=>{
            const element_array = [{name : "mail", value : req.body.mail},{name : "mot_de_passe",value : req.body.mot_de_passe},{name : "nom_complet",value : req.body.nom_complet}]
            for(let i = 0; i < element_array.length; i++){
                console.log("mande le boucle")
                if(element_array[i].value == "" || element_array[i].value == undefined){
                    const message = "Champs requis"
                    return res.status(400).json({message})
                }
            }
            try {
                model.find({}).then((a)=>{
                    for(let i = 0; i < a.length; i++){
                        if(a[i].mail == btoa(req.body.mail)){
                            const re = "Veuillez choisir un autre adresse mail"
                            res.status(400).json({re})
                            return false
                        }
                    }
                    bcrypt.hash(req.body.mot_de_passe,10).then((b)=>{
                        model.create({
                            mail : btoa(req.body.mail),
                            nom_complet : btoa(req.body.nom_complet),
                            mot_de_passe : b
                        }).then((c)=>{
                            const re = "Souscription effectuer avec succès"
                            res.json({re})
                            return false
                        })
                    })
                })
            } catch (error) {
                const message = "Le serveur ne répond pas veuillez réessayer plus tard"
                return res.status(500).json({message})
            }
})}
//route fonctionnel