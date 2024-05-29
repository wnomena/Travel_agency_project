const {mongoose ,Schema} = require("mongoose")
const member_schema = mongoose.model("member_bd",new Schema({
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
    },
    forget_pass: {
        type : Number,
        require : true
    }
}))
module.exports = member_schema