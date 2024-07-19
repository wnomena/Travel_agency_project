const { default: mongoose, Schema } = require("mongoose");

const parent_road_model = mongoose.model("parent_road",new Schema({
    identifiant : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    about_all_road : {
        type : String,
        required : true
    },
    presentation_image : {
 je_ne_sais_plus_la_modification_faite
        type : String,
        required : true
        },
    price : {
        type : String,
        required : true
    },
    period : {
        type : String,
        required : true
=======
            type : String,
            require : true
        },

    price : {
        type : String,
        require : true
    },
    difficulty : {
        type : String,
        require : true
    },
    period : {
        type : String,
        require : true
travel-agency
    }
}))
module.exports = parent_road_model