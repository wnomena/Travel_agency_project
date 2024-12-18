import { unlink } from "fs"
export default (name) => {
    try {
        unlink(`${_dirname}/../file/${name}`,() => {
            console.log("file deleted")
            return true
        })
    } catch (error) {
        return false
    }
}