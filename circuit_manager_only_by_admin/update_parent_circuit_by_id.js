const child = require("../bd/mysql/parentRoad/modelParentRoad")
module.exports = (req,res) => {
        const body = req.body
         const arr = [{name : "id",value : body.id},{name : "name",value : body.name},{name : "about_all_road",value : body.description},{name : "presentation_image",value : req.file ? req.file.filename : undefined},{name : "prix", value : body.price},{name : "period", value : `${body.period_B} ${body.period_E}`},{name : "dificulty",value : body.difficulty}]
        const data = {
            id : arr[0].value,
            name : arr[1].value,
            description : arr[2].value,
            presentation_image : arr[3].value,
            price : arr[4].value,
            period : arr[5].value,
            difficulty : arr[6].value,
        }
        try {
            let Parent = new child()
            for( let i of arr) {
                if(!i.value) {
                    const message = "Require field"
                    return res.status(400).json(message)
                }
            }
            Parent.getById(data.id,async function (error,result) {
                if(error) {
                   return res.status(400).json({message : "Bad request"})
                } else {
                   for(let i of result) {
                        unlink_function(i.presentation_image.split("/")[i.presentation_image.split("/").length - 1])
                    }
                }
            })
            Parent.update(data,function (error) {
                if(error) {
                    const message = "Bad request"
                    return res.status(400).json(message)
                } else {
                    const message = "Action done"
                    return res.json({message})
                }
            })
        } catch (error) {
            const message = "Server crached"
            return res.status(500).json({message,error})
        }
    }