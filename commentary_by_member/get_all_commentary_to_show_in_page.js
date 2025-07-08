const commentary = require("../bd/mysql/commentaryModel/commentaryModel")
const { forceInt } = require("../bd/mysql/fonctionType")
module.exports = function (req,res) {
    try {
        const Commentary = new commentary()
        Commentary.GetAll(function (err,result) {
            if(forceInt(result.length)) {
                const data = []
                result.forEach(element => {
                    data.push({
                        id : element.id,
                        mail : element.mail,
                        string : element.string
                    })
                });
                return res.json({data : data})
            } else return res.json({data : []})
        })
    } catch (error) {
        return res.status(500).json({message : "Server crached"})
    }
}