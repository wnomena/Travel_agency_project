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
    description : {
        type : String,
        required : true
    },
    presentation_image : {
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