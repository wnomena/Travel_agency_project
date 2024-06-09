module.exports = (app) =>{
    const commentary_model = require("./bd/schema/commentary_schema")
    const child_road_model = require("./bd/schema/road_child_manager/child_road_schema")
    const parent_road_model = require("./bd/schema/road_parent_manager/parent_schema")
    const member_model = require("./bd/schema/member_schema")
    const array_model = [commentary_model,child_road_model,parent_road_model,member_model]
    app.delete("/utilisateurs/fafana/:code_to_delete/:mail_users",(req,res)=>{
        try {
            if(req.params.code_to_delete == 3){
                if(req.params.mail_users == undefined || req.params.mail_users == ""){
                    return res.status(400).json({message : "Vérifier les informations que vous avez saisi"})
                }
                array_model[2].find({mail : btoa(req.params.mail_users)}).then(async(a)=>{
                    if(a == "" || a == []){
                        const message = "Veuillez vous réidentifier pour effectuer cette action"
                        return res.json({message})
                    }
                    await array_model[2].deleteMany({}).then(async(a)=>{
                        await array_model[2].create({
                            mail : a[0].mail,
                            mot_de_passe : a[0].mot_de_passe,
                            nom_complet : a[0].nom_complet
                        })
                    }).then(_=>{
                        const message = "Effacement effectué"
                        return res.json({message})
                    })
                })
            }else{
                array_model[parseInt(req.params.code_to_delete) - 1].deleteMany({}).then((a)=>{
                    const message = "Information effacée avec succès"
                    return res.json({message})
                })
            }
        } catch (error) {
            const message = "Le serveur ne répond pas veuillez réessayer plus tard"
            return res.status(500).json({message})
        }
    })
}
//fonctionnel