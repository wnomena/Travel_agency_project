const multer = require("../multer_middleware")
module.exports = (app,model_utilisateur,model_member,bcrypt) =>{
    const model = [model_member,model_utilisateur]
    app.put("/utilisateurs/update/password/admin/:client_mail_for_updating/:type",multer,(req,res)=>{
    const new_pass_and_last_pass_array = [{name : "old_pass",value : req.body.old_pass},{name : "new_pass",value : req.body.new_pass}]
    if( new_pass_and_last_pass_array[0].value == new_pass_and_last_pass_array[1].value){
        const message = "Password not identical"
        res.status(400).json({message})
        return false
    }
    for(let i = 0; i < new_pass_and_last_pass_array.length; i++){
        if(new_pass_and_last_pass_array[i].value == "" || new_pass_and_last_pass_array[i].value == undefined){
            const message = "required field"
            res.status(400).json({message})
            return false
        }
    }
    try {
        model[parseInt(req.params.type)].find({mail : btoa(req.params.client_mail_for_updating)}).then((a)=>{
            if(a.length == 0){
                const message = "Please, use an other mail"
                return res.status(400).json({message})
            }else{
                if(a[0].mot_de_passe == new_pass_and_last_pass_array[1].value){
                    bcrypt.hash(new_pass_and_last_pass_array[1].value,10).then((c)=>{
                        model[parseInt(req.params.type)].findByIdAndUpdate(a[0]._id,{mot_de_passe : c}).then((d)=>{
                            const message = "Password updated"
                            console.log("updated")
                            return res.json({message})
                        })
                    })
                }
                else {
                    bcrypt.compare(new_pass_and_last_pass_array[0].value,a[0].mot_de_passe).then((b)=>{
                        if(b){
                            bcrypt.hash(new_pass_and_last_pass_array[1].value,10).then((c)=>{
                                model[parseInt(req.params.type)].findByIdAndUpdate(a[0]._id,{mot_de_passe : c}).then((d)=>{
                                    const message = "Password updated"
                                    console.log("updated")
                                    return res.json({message})
                                })
                            })
                        }
                    })
                }
            }
        })
    } catch (error) {
        const message = "Le serveur ne répond pas, veuillez réessayer ultérieurment"
        return res.status(500).json({message})
    }

})}
//route fonctionnel