const {mongoose,Schema} = require("mongoose")
const contact_model = mongoose.model("contact",new Schema({
    name : {
        type : String,
        required : true
    }
    ,mail : { 
        type : String,
        required : true
    },
    object : {
        type : String,
        required : true
    },
    corps : {
        type : String,
        required : true
    },
    seen : {
        type : Boolean,
        required : true
    }
}))

module.exports = {
    contact_model : contact_model
}