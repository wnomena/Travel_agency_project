const webp = require("webp-converter")
const Unlink = require("./unlink_function")

const converter = function ({input,output}) {
    try {
        
    const result = webp.cwebp(input,output,"-q 80")
    result.then((_) => {
        Unlink(input)
        return 1
    })
    } catch (error) {
        console.log(error)
        return 0
    }
}
module.exports = converter