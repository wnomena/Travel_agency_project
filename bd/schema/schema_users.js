const {mongoose,Schema} = require("mongoose")
const schema = mongoose.model("utilisateur", new Schema({
    mail : {
        type : String,
        required : true
    },
    mot_de_passe : {
        type : String,
        required : true
    },
    nom_complet : {
        type : String,
        required : true
    }
}))
module.exports = schema