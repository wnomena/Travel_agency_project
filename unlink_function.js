const { unlink } = require("fs")
module.exports = (name) => {
    try {
        unlink(`${_dirname}/../file/${name}`,() => {
            console.log("file deleted")
            return true
        })
    } catch (error) {
        return false
    }
}