const {mongoose,Schema, model} = require("mongoose")
const commentary_model = mongoose.model("commentary_af_all_memeber",new Schema({
    mail : {
        type : String,
        require : true
    },
    created : {
        type : String,
        require : true
    },
    string_commentary : {
        type : String,
        require : true
    }
}))
module.exports = commentary_model