const child = require("../bd/mysql/childRoad/childModel")
const split_join = require("../function_reutiliser/convertsppit")
const unlink_function = require("../unlink_function")
module.exports = async (req,res) => {
        const body = req.body
        const arr = [{name : "id",value : body.id},{name : "name",value : body.name},{name : "about_all_road",value : body.desc},{name : "presentation_image",value : req.file ? req.file.filename : undefined},{name : "prix", value : body.price},{name : "period", value : `${body.period_B} ${body.period_E}`},{name : "dificulter",value : body.difficulty},{name : "distance", value : body.distance},{name : "sejours_delay", value : `${body.sejours_delay_B} ${body.sejours_delay_E}`}, {name : "confort", value : body.confort},{name : "parent_id",value : body.parent_id}]
        try {
            let Parent = new child()
            for(let i of arr){
               if(i.value == "" || i.value == undefined){
                   const message = `Required field ${i.name}`
                   return res.status(400).json({message})
               } else if(i.name == "about_all_road" && i.value.length < 300) {
                   return res.status(400).json({message : "Put more Description"})
               }
           }
            Parent.getById(arr[0].value,async function (error,result) {
                if(error) {
                   return res.status(400).json({message : "Bad request"})
                } else {
                   for(let i of result) {
                        unlink_function(i.presentation_image)
                    }
                    const data = {
                        id : arr[0].value,
                        name : arr[1].value,
                        description : arr[2].value,
                        presentation_image : arr[3].value,
                        price : arr[4].value,
                        period : arr[5].value,
                        difficulty : arr[6].value,
                        distance : arr[7].value,
                        sejours_delay : arr[8].value,
                        confort  : arr[9].value,
                        parent_id : arr[10].value
                    }
                    Parent.update(data,function (error) {
                        if(error) {
                            const message = "Bad request"
                            return res.status(400).json(message)
                        } else {
                            const message = "Action done"
                            return res.json({message})
                        }
                    })

                }
            })
        } catch (error) {
            console.log(error)
            const message = "Server crached 1"
            return res.status(500).json({message,error})
        }
    }
    //-------------------
    // const data = {
    //     id : arr[0].value,
    //     name : arr[1].value,
    //     description : arr[2].value,
    //     presentation_image : split_join(arr[3].value),
    //     price : arr[4].value,
    //     period : arr[5].value,
    //     difficulty : arr[6].value,
    //     distance : arr[7].value,
    //     sejours_delay : arr[8].value,
    //     confort  : arr[9].value,
    //     parent_id : arr[10].value
    // }

    // const arr = [{name : "id",value : body.id},{name : "name",value : body.name},{name : "about_all_road",value : body.desc},{name : "presentation_image",value : req.file ? req.file.filename : undefined},{name : "prix", value : body.price},{name : "period", value : `${body.period_B} ${body.period_E}`},{name : "dificulter",value : body.difficulty},{name : "distance", value : body.distance},{name : "sejours_delay", value : `${body.sejours_delay_B} ${body.sejours_delay_E}`}, {name : "confort", value : body.confort},{name : "parent_id",value : body.parent_id}]