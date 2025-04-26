const commentary = require("../bd/mysql/commentaryModel/commentaryModel")
module.exports = function (req,res) {
    try {
        const Commentary = new commentary()
        Commentary.getById(req.params.id,function (err,result) {
            const data = []
            result.forEach(element => {
                data.push({
                    id : element.id,
                    mail : element.mail,
                    string : element.string
                })
            });
            return res.json({data : data})
        })
    } catch (error) {
        return res.status(500).json({message : "Server crached"})
    }
}