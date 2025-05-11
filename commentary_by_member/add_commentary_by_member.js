const commentary = require("../bd/mysql/commentaryModel/commentaryModel")
const like = require("../bd/mysql/like/likeroad")
module.exports = (req,res) => {
    try {
        const Commentary = new commentary()
        const Like = new like()

        const data = {
            mail : req.body.mail,
            string : req.body.string,
            road_id : req.body.id
        }
        Commentary.insert(data,function (err,resp) {
            if(resp) {
                Like.insert(data,function (erro,resu) {
                    if(resu) {
                        return res.json({message : "Action done"})
                    } else if(erro) {
                        return res.status(400).json({message : "Bad request"})
                    }
                })
            } else if(err) {
                return res.status(400).json({message : "Bad request"})
            }
        })
    } catch (error) {
        return res.status(500).json({message : "Server crached"})
    }
   
}