const Parent = require("../bd/mysql/parentRoad/modelParentRoad")
const AddCookies = require("../cookies/addToken")
module.exports = (req,res) => {
        try {
            let test = new Parent()
            AddCookies(req,res)
            let decrypted_value = []
            test.getAll((error,result) => {
                result.forEach(element => {
                    decrypted_value.push({
                        id : element.id,
                        name : element.name,
                        description : element.description,
                        presentation_image : element.presentation_image,
                        price : element.price,
                        period : element.period,
                        difficulty : element.difficulty
                    })
                });
                console.log(decrypted_value)
                const message = "Les résultats de votre recherches"
                return res.json({message,data : decrypted_value})
            })  
        } catch (error) {
            const message = "Le serveur ne répon pas, veuillez réessayer  ultérieurement"
            return res.status(500).json({message,error})
}}