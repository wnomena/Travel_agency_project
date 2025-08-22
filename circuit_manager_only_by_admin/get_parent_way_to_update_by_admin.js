const Parent = require("../bd/mysql/parentRoad/modelParentRoad")
const url = require("../url")
const AddCookies = require("../cookies/addToken")
module.exports = (req,res) => {
        try {
            AddCookies(req,res)
            let test = new Parent()
            let decrypted_value = []
            test.getById(req.params.id,(error,result) => {
                if(result) {
                    result.forEach(element => {
                        decrypted_value.push({
                            id : element.id,
                            name : element.name,
                            description : element.description,
                            presentation_image : url + element.presentation_image,
                            price : element.price,
                            period : element.period
                        })
                    });
                    return res.json({data : decrypted_value})
                }
            })  
        } catch (error) {
            return res.status(500).json({message : "Server crached"})
}}