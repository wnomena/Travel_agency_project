const { unlink } = require("fs")
module.exports = async (name) => {
    try {
        await unlink(`${_dirname}/file/${name}`,() => {
            console.log("file deleted")
            return true
        })
    } catch (error) {
        return false
    }
}