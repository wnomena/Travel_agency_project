module.exports = (app,commentary_model) =>{
    app.get("/get_all_commentary",(req,res)=>{
        try {
            commentary_model.find({}).then((a)=>{
                const message = "Tout les liste de commentaires"
                return res.json({message,liste : a})
            })
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réessayer plsu tard"
            return res.status(500).json({message,error})
        }
    })
}