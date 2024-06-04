const { default: mongoose, Schema } = require("mongoose");

const parent_road_model = mongoose.model("parent_road",new Schema({
    ident_for_child_road : {
        type : String,
        require : true
    },
    name : {
        type : String,
        require : true
    },
    choice_length : {
        type : Number,
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
    duration_detail : [{
        begining_date : {
            type : String,
            require : true
        },
        duration_number : {
            type : Number,
            require : true
        }
    }]
}))
module.exports = parent_road_model