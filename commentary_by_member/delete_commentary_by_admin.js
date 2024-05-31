module.exports = (app,commentary_model) =>{
    app.delete("/utilisateurs/delete_commentary_by_admin/:mail_mem/:id_commentary",(req,res)=>{
        const table = [{name : "mail_cible",value : req.params.mail_mem},{name : "commentary_id",value : req.params.id_commentary}]
        for(let i of table){
            if(i.value == undefined || i.value == ""){
                const message = "Veuillez vérifier les informations que vous avez saisi"
                return res.status(400).json({message})
            }
        }
        try {
            commentary_model.deleteOne({id : table[1].value}).then((a)=>{
                const message = "Commentaire effacé avec succès"
                return res.json({message})
            })
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réessayer plus tard"
            return res.status(500).json({message,error})
        }
    })
}