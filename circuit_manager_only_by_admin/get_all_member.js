const member_model = require("../bd/schema/member_schema")
module.exports = (req,res) => {
    member_model.find().then((a) => {
        let decrypted = []
        for(let i of a) {
            decrypted.push({
                mail : atob(i.mail),
                mot_de_passe :i.mot_de_passe,
                nom_complet : atob(i.nom_complet)
            })
        }
        res.json({message : 0, data : decrypted})
    }).catch((err) => {
        return res.status(500).json({message : "ko"})
    })
}
//  = {
//     getAllMember : getAllMember
// }