const auth = require("../token_manager/verification_of_created_token")
module.exports = (app,model_utilisateur,bcrypt) =>{
    app.put("/utilisateurs/update/password/:client_mail_for_updating",auth ,(req,res)=>{
    const new_pass_and_last_pass_array = [{name : "old_pass",value : req.body.old_pass},{name : "new_pass",value : req.body.new_pass}]
    if( new_pass_and_last_pass_array[0].value == new_pass_and_last_pass_array[1].value){
        const message = "L'ancien mot de passe et le nouveau ne devrait pas être identique"
        res.status(400).json({message})
        return false
    }
    for(let i = 0; i < new_pass_and_last_pass_array.length; i++){
        if(new_pass_and_last_pass_array[i].value == "" || new_pass_and_last_pass_array[i].value == undefined){
            const message = "Champs requis"
            res.status(400).json({message})
            return false
        }
    }
    try {
        model_utilisateur.find({mail : btoa(req.params.client_mail_for_updating)}).then((a)=>{
            if(a == "" || a == []){
                const message = "Vérifier l'adresse mail que vous avez saisi, et réessayer"
                return res.status(400).json({message})
            }else{
                bcrypt.compare(new_pass_and_last_pass_array[0].value,a[0].mot_de_passe).then((b)=>{
                    if(b){
                        bcrypt.hash(new_pass_and_last_pass_array[1].value,10).then((c)=>{
                            model_utilisateur.findByIdAndUpdate(a[0]._id,{mot_de_passe : c}).then((d)=>{
                                const message = "Mot de passe mis à jours"
                                return res.json({message})
                            })
                        })
                    }
                })
            }
        })
    } catch (error) {
        const message = "Le serveur ne répond pas, veuillez réessayer ultérieurment"
        return res.status(500).json({message})
    }

})}
//route fonctionnel