const { default: mongoose, Schema } = require("mongoose");

const parent_road_model = mongoose.model("parent_road",new Schema({
    identifiant : {
        type : String,
        require : true
    },
    name : {
        type : String,
        require : true
    },
    about_all_road : {
        type : String,
        require : true
    },
    presentation_image : {
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
    }
}))
module.exports = parent_road_model