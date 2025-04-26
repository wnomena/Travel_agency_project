const jwt = require("jsonwebtoken")
const randomToken = require("./private")

function AddCookies(req) {
    try {
        console.log(req.body)
        const create = jwt.sign({mail : "req.body.mail"},randomToken.toString(),{expiresIn : "1h"})
    } catch (error) {
        console.log(error)
        throw new Error("try again");
    }
}
module.exports = AddCookies