const { default: mongoose ,Schema} = require("mongoose");

const child_road_model = mongoose.model("child_road",new Schema({
    parent_ident_equal_to_child : {
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
    distance : {
        type : String,
        required : true
    },
    presentation_image :  {
            type : String,
            required : true
        },
    sejour_delay : {
        type : String,
        required : true
    }
    ,
    like_by_members : [{mail : {
        type : String,
        required : true
    }}],
    price : {
        type : String,
        required : true
    },
    difficulty : {
        type : String,
        required : true
    },
    confort : {
        type : String,
        required : true
    }
}))
module.exports = child_road_model