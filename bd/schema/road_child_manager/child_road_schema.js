const { default: mongoose } = require("mongoose");

const child_road_model = mongoose.model("child_road",new Schema({
    parent_ident_equal_to_child : {
        type : String,
        require : true
    },
    description : {
        type : String,
        require : true
    },
    distance : {
        type : Number,
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