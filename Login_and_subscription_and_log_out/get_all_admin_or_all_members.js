module.exports = (app,model_member,model) =>{
    app.get("/get_admin_or_member/:id",(req,res) => {
        if(req.params.id == 0) {
            model_member.find({}).then((a) => {
                return res.json({data : decrypting_value(a)})
            })
        }
        else {
            model.find({}).then((z) => {
                return res.json({data : decrypting_value(z)})
            })
        }
    })
}
function decrypting_value(ze) {
    let decrypted = []
    for(let i of Array.from(ze)) {
        decrypted.push({
            mail : atob(i.mail),
            nom_complet : atob(i.nom_complet),
            mot_de_passe : i.mot_de_passe
        })
    }
    return decrypted
}