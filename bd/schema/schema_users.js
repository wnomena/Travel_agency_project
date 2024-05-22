const {mongoose,Schema} = require("mongoose")
const schema = mongoose.model("utilisateur", new Schema({
    mail : {
        type : String,
        require : true
    },
    mot_de_passe : {
        type : String,
        require : true
    },
    nom_complet : {
        type : String,
        require : true
    }
}))
module.exports = schema