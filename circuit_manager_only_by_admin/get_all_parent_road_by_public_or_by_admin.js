const { forceInt } = require("../bd/mysql/fonctionType")
const Parent = require("../bd/mysql/parentRoad/modelParentRoad")
const { getCookies } = require("../cookies/private")
const url = require("../url")
module.exports = (req,res) => {
        try {
            console.log(req.header.url)
            let test = new Parent()
            let decrypted_value = []
            test.getAll((error,result) => {
                console.log(result)
                if(result) {
                    result.forEach(element => {
                        decrypted_value.push({
                            id : element.id,
                            name : element.name,
                            description : element.description,
                            presentation_image : url + element.presentation_image,
                            price : element.price,
                            period : element.period,
                            difficulty : element.difficulty
                        })
                    });
                    console.log(decrypted_value)
                    const message = "Les résultats de votre recherches"
                    return res.json({message,data : decrypted_value})
                } else {
                    console.log(decrypted_value)
                    const message = "Les résultats de votre recherches"
                    return res.json({message,data : decrypted_value})
                }
            })  
        } catch (error) {
            console.log(error)
            const message = "Le serveur ne répon pas, veuillez réessayer  ultérieurement"
            return res.status(500).json({message,error})
}}