const jwt = require("jsonwebtoken")
const { config } = require("../bd/mysql/fonctionType")

function AddCookies(req) {
    try {
        const create = jwt.sign({mail : req.body.mail},config.KEY.toString())
        return create
    } catch (error) {
        console.log(error)
        throw new Error("try again");
    }
}
module.exports = AddCookies