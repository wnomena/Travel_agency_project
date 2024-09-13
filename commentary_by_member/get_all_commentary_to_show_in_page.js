module.exports = (app,commentary_model) =>{
    app.get("/get_all_commentary",(req,res)=>{
        try {
            commentary_model.find({}).then((a)=>{
                const message = "Tout les liste de commentaires"
                let decrypted_value = []
                for(let i of a) {
                    decrypted_value.push({
                        identifiant : i.identifiant,
                        mail : atob(i.mail),
                        created : atob(i.created),
                        string_commentary : atob(i.string_commentary)
                    })
                }
                return res.json({message,liste : decrypted_value})
            })
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réessayer plsu tard"
            return res.status(500).json({message,error})
        }
    })
}