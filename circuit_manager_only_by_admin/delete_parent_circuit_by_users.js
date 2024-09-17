const fs = require("fs")
module.exports = (app,model_utilisateurs,parent_road_model,child_road_model) =>{
    app.delete("/utilisateurs/:mail/user/deleter/:parent_circuit_id",(req,res)=>{
        const tab = [{name : "mail",value : req.params.mail},{name : "parent_circuit_id",value : req.params.parent_circuit_id}]
        for(let i of tab){
            if(i.value == undefined || i.value == ""){
                const message = "Vérifiez le svaleurs que vous avez saisi et réessayer"
                return res.status(400).json({message})
            }
        }
        try {
            model_utilisateurs.find({mail : btoa(tab[0].value)}).then((a)=>{
                if(a == "" ||a == []){
                    const message = "Accès non autorisé"
                    return res.status(403).jsson({message})
                }
                parent_road_model.find({identifiant : tab[1].value}).then((b)=>{
                    if(b == "" ||b == []){
                        const message = "Vérifiez votre choix et réessayer"
                        return res.status(400).json({message})
                    }
                    console.log(b)
                    find_and_unlink_many(child_road_model,tab[1].value)
                    child_road_model.deleteMany({ident_to_look_for_parent_ident : tab[1].value}).then((c)=>{
                        find_one_and_unlink(b[0].presentation_image.split("/")[b[0].presentation_image.split("/").length - 1])
                        parent_road_model.deleteOne({identifiant : tab[1].value}).then((d)=>{

                            const message = "Circuit effacé avec succès, ainsi que toutes les information lier à celui ci"
                            return res.json({message})
                        })
                    })
                })
            })
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réessayer  plus tard"
            return res.status(500).json({message,error})

        }
    })
}
function find_and_unlink_many(model,id) {
    model.find({ident_to_look_for_parent_ident : id}).then((a) =>  {
       Array.from(a).forEach((res) => {
        console.log(a)
        fs.unlink(`./file/${res.presentation_image.split("/")[res.presentation_image.split("/").length - 1]}`,(err) => console.log(err))
       })
    })
}
function find_one_and_unlink(name) {
     fs.unlink(`./file/${name}`,(err) => console.log(err))
}
//ds