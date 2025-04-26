const url = require("../url")
module.exports = async (name) => {
    return`${url}/${await name.split(" ").join("_")}`
}