const  model_utilisateur = require("./bd/schema/schema_users")
module.exports = (req,res) => {
    let a = req.params.admin
    let b= req.params.new_admin
    let nom_complet = req.params.nom_complet

    model_utilisateur.find({mail : btoa(a)}).then((created) => {
        if(created.lenght == 0) {
            res.status(401).json({message :'Not authorized'})
        }else{
            if(b !== undefined) {
                for(let i = 0; i < created.length; i++){
                    if(created[i].mail == btoa(req.body.b)){
                        const re = "Use an other mail"
                        return res.status(400).json({re})
                        
                    }
                }
                model_utilisateur.create({
                    mail : btoa(b),
                    nom_complet : nom_complet,
                    mot_de_passe :  `Agency_travel${new Date().getFullYear()}`
                }).then((res) => {
                    res.json({message : "New member created"})
                }).catch((err) => {
                    res.status(500).json({message : "server crached"})
                })
            }
        }
    })
}