const like = require("../bd/mysql/like/likeroad")
module.exports = function (req,res) {
    try {
        const Like = new like()
        const data = {
            mail : req.body.mail,
            road_id : req.body.road_id
        }
        Like.insert(data,function (error,result) {
            if(!error) {
                return res.json({message : "Action done"})
            } else {
                return res.status(400).json({message : "Bad request"})
            }
        })
    } catch (error) {
        return res.status(500).json({message : "Server crached"})
    }
}