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
    presentation_image : [{
        image : {
            type : String,
            require : true
        },
        file_name : {
            type: String,
            require : true
        },
        extention_file_name : {
            type : String,
            require : true
        }
    }]
}))
module.exports = parent_road_model