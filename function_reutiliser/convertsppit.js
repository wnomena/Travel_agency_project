const { PassThrough } = require("nodemailer/lib/xoauth2")
const url = require("../url")
module.exports = (name) => {
    try {
        return `${url}/${ name.toString().split(" ").join("_")}`
    } catch (error) {
        console.log(error)
        throw Error("Try later")
    }
}